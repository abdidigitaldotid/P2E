// app/page.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import LogoutButton from '@/app/components/LogoutButton';
import ClaimRewardButton from './components/ClaimRewardButton'; // Komponen baru
import { revalidatePath } from 'next/cache'; // Untuk refresh data

export default async function Home() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth');
  }

  // Ambil data profil dari tabel 'profiles'
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single(); // .single() untuk mengambil satu baris saja

  // Fungsi untuk klaim hadiah (Server Action)
  const claimReward = async () => {
    'use server';

    if (!profile) return; // Pastikan profil ada

    const newBalance = (profile.balance ?? 0) + 10; // Tambah 10 koin

    await supabase
      .from('profiles')
      .update({ balance: newBalance })
      .eq('user_id', user.id);

    revalidatePath('/'); // Beritahu Next.js untuk memuat ulang data di halaman ini
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
            {/* Form yang memanggil Server Action */}
            <form action={claimReward}>
                <ClaimRewardButton />
            </form>
        </div>
      </div>
    </main>
  );
}
