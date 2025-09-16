// app/page.tsx
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'; // Import cookies
import { createClient } from '@/utils/supabase/server'; 
import LogoutButton from '@/app/components/LogoutButton';
import ClaimRewardButton from './components/ClaimRewardButton';
import { revalidatePath } from 'next/cache';

export default async function Home() {
  const cookieStore = cookies(); // Panggil cookies() di sini
  const supabase = createClient(cookieStore); // Berikan ke createClient

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  const claimReward = async () => {
    'use server';

    if (!profile) return;

    const newBalance = (profile.balance ?? 0) + 10;

    // Kita perlu memanggil ulang cookieStore dan supabase di dalam Server Action
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    await supabase
      .from('profiles')
      .update({ balance: newBalance })
      .eq('user_id', user.id);

    revalidatePath('/');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-white bg-gray-900">
      <div className="absolute top-4 right-4">
        <LogoutButton />
      </div>
      <div className="text-center bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">Selamat Datang!</h1>
        <p className="mt-2 text-gray-400">Email: {user.email}</p>

        <div className="mt-8">
          <p className="text-lg text-gray-300">Saldo Koin Anda:</p>
          <p className="text-5xl font-bold text-yellow-400 my-2">
            {profile?.balance ?? 'Memuat...'}
          </p>
        </div>

        <div className="mt-8">
            <form action={claimReward}>
                <ClaimRewardButton />
            </form>
        </div>
      </div>
    </main>
  );
}
