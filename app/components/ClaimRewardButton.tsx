// app/components/ClaimRewardButton.tsx
'use client'

// useFormStatus adalah hook dari React untuk mengetahui status form
import { useFormStatus } from 'react-dom'

export default function ClaimRewardButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending} // Tombol dinonaktifkan saat proses berjalan
      className="px-6 py-3 font-semibold text-black bg-yellow-400 rounded-md hover:bg-yellow-500 transition disabled:bg-gray-500 disabled:cursor-not-allowed"
    >
      {pending ? 'Memproses...' : 'Klaim 10 Koin!'}
    </button>
  )
}

