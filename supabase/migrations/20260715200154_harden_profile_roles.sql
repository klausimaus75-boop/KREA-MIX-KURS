alter table public.profiles
add column is_admin boolean not null default false;

drop policy profiles_select_own_or_admin on public.profiles;

create policy profiles_select_own
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

revoke all on public.profiles from authenticated;
grant select on public.profiles to authenticated;
grant insert (id, display_name, avatar_url) on public.profiles to authenticated;
grant update (display_name, avatar_url) on public.profiles to authenticated;

drop function public.is_admin();

drop trigger user_roles_set_updated_at on private.user_roles;
drop table private.user_roles;
