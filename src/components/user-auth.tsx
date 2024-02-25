import { createClient } from '../utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function UserAuthentication({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log(data, error);

  return <>{children}</>;
}
