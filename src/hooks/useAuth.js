import { useCallback, useEffect, useState } from "react";
import { getAuthRedirectUrl, getGoogleProviderStatus, isSupabaseConfigured, supabase } from "../lib/supabaseClient";

function getDisplayName(user) {
  return (
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "KreaMix Mitglied"
  );
}

function getAvatarUrl(user) {
  return user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;
}

function authMessage(error) {
  const message = error?.message || "Die Anmeldung konnte nicht abgeschlossen werden.";
  if (/invalid login credentials/i.test(message)) return "E-Mail-Adresse oder Passwort stimmen nicht.";
  if (/email not confirmed/i.test(message)) return "Bitte bestätige zuerst den Link in deiner E-Mail.";
  if (/provider is not enabled|unsupported provider/i.test(message)) return "Google-Anmeldung ist in Supabase noch nicht aktiviert.";
  if (/user already registered/i.test(message)) return "Für diese E-Mail-Adresse besteht bereits ein Account.";
  return message;
}

async function loadOrCreateProfile(user) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, avatar_url, is_admin, created_at, updated_at")
    .eq("id", user.id)
    .maybeSingle();

  if (error) throw error;
  if (data) return data;

  const profile = {
    id: user.id,
    display_name: getDisplayName(user),
    avatar_url: getAvatarUrl(user),
  };
  const { data: created, error: createError } = await supabase
    .from("profiles")
    .insert(profile)
    .select("id, display_name, avatar_url, is_admin, created_at, updated_at")
    .single();

  if (!createError) return created;
  if (createError.code !== "23505") throw createError;

  const { data: existing, error: reloadError } = await supabase
    .from("profiles")
    .select("id, display_name, avatar_url, is_admin, created_at, updated_at")
    .eq("id", user.id)
    .single();
  if (reloadError) throw reloadError;
  return existing;
}

export function useAuth() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [profileLoading, setProfileLoading] = useState(false);
  const [googleEnabled, setGoogleEnabled] = useState(false);
  const [error, setError] = useState("");
  const user = session?.user || null;

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return undefined;
    }

    let active = true;
    getGoogleProviderStatus().then((enabled) => {
      if (active) setGoogleEnabled(enabled);
    });
    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!active) return;
      if (sessionError) setError(authMessage(sessionError));
      setSession(data.session || null);
      setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession || null);
      setLoading(false);
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user || !supabase) {
      setProfile(null);
      setProfileLoading(false);
      return undefined;
    }

    let active = true;
    setProfileLoading(true);
    setError("");
    loadOrCreateProfile(user)
      .then((nextProfile) => {
        if (active) setProfile(nextProfile);
      })
      .catch((profileError) => {
        if (active) setError(authMessage(profileError));
      })
      .finally(() => {
        if (active) setProfileLoading(false);
      });

    const returnHash = sessionStorage.getItem("kreaAuthReturnHash");
    if (returnHash) {
      sessionStorage.removeItem("kreaAuthReturnHash");
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete("code");
      cleanUrl.searchParams.delete("error");
      cleanUrl.searchParams.delete("error_code");
      cleanUrl.searchParams.delete("error_description");
      cleanUrl.hash = returnHash;
      window.history.replaceState(null, "", `${cleanUrl.pathname}${cleanUrl.search}${cleanUrl.hash}`);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }

    return () => {
      active = false;
    };
  }, [user?.id]);

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) return { error: "Supabase ist noch nicht konfiguriert." };
    if (!googleEnabled) return { error: "Google-Anmeldung ist in Supabase noch nicht freigeschaltet." };
    setError("");
    sessionStorage.setItem("kreaAuthReturnHash", window.location.hash || "#/classroom");
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getAuthRedirectUrl(),
        scopes: "openid email profile",
      },
    });
    const message = signInError ? authMessage(signInError) : "";
    if (message) setError(message);
    return { error: message };
  }, [googleEnabled]);

  const signInWithEmail = useCallback(async ({ email, password }) => {
    if (!supabase) return { error: "Supabase ist noch nicht konfiguriert." };
    setError("");
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    const message = signInError ? authMessage(signInError) : "";
    if (message) setError(message);
    return { error: message };
  }, []);

  const signUpWithEmail = useCallback(async ({ displayName, email, password }) => {
    if (!supabase) return { error: "Supabase ist noch nicht konfiguriert.", needsConfirmation: false };
    setError("");
    sessionStorage.setItem("kreaAuthReturnHash", window.location.hash || "#/classroom");
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getAuthRedirectUrl(),
        data: { display_name: displayName.trim() },
      },
    });
    const message = signUpError ? authMessage(signUpError) : "";
    if (message) setError(message);
    return { error: message, needsConfirmation: Boolean(data.user && !data.session) };
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return { error: "" };
    const { error: signOutError } = await supabase.auth.signOut();
    const message = signOutError ? authMessage(signOutError) : "";
    if (message) setError(message);
    return { error: message };
  }, []);

  const updateProfile = useCallback(async ({ displayName }) => {
    if (!supabase || !user) return { error: "Bitte melde dich zuerst an." };
    const { data, error: updateError } = await supabase
      .from("profiles")
      .update({ display_name: displayName.trim() })
      .eq("id", user.id)
      .select("id, display_name, avatar_url, is_admin, created_at, updated_at")
      .single();
    const message = updateError ? authMessage(updateError) : "";
    if (message) setError(message);
    if (data) setProfile(data);
    return { error: message };
  }, [user?.id]);

  return {
    configured: isSupabaseConfigured,
    googleEnabled,
    session,
    user,
    profile,
    loading,
    profileLoading,
    error,
    clearError: () => setError(""),
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    updateProfile,
  };
}
