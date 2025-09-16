// app/auth/page.tsx
'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client'; // Import dari file baru kita

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const router = useRouter();

  const supabase = createClient(); // Inisialisasi client baru

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      alert(`Error signing up: ${error.message}`);
    } else {
      setIsSigningUp(true); 
    }
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(`Error signing in: ${error.message}`);
    } else {
      router.push('/'); 
      router.refresh(); 
    }
  };

  // ... (Bagian JSX untuk UI tetap SAMA PERSIS seperti sebelumnya) ...
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-sm p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        {isSigningUp ? (
            <div className="text-center">
                <h2 className="text-2xl font-bold">Konfirmasi Email Anda</h2>
                <p className="mt-2 text-gray-400">Kami telah mengirim link konfirmasi ke email Anda. Silakan periksa kotak masuk.</p>
            </div>
        ) : (
            <>
            <h1 className="text-3xl font-bold text-center">Selamat Datang</h1>
            <div className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
                <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
                />
            </div>
            <div>
                <label htmlFor="password"className="block text-sm font-medium text-gray-400">Password</label>
                <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
                />
            </div>
            </div>
            <div className="space-y-4">
            <button onClick={handleSignIn} className="w-full py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition">
                Masuk
            </button>
            <button onClick={handleSignUp} className="w-full py-2 font-semibold text-indigo-400 bg-transparent border border-indigo-500 rounded-md hover:bg-indigo-900 transition">
                Daftar
            </button>
            </div>
            </>
        )}
      </div>
    </div>
  );
}
