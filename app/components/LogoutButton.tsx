// app/components/LogoutButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client'; // Import client utility

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
}
