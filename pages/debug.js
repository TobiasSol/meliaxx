// pages/debug.js
export default function Debug() {
    return (
      <div className="min-h-screen bg-black p-8">
        <h1 className="text-[#e3cbaa] text-2xl mb-4">Environment Variables Debug</h1>
        <pre className="bg-gray-900 p-4 rounded-lg text-white">
          {JSON.stringify({
            NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Not Set',
            NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not Set',
          }, null, 2)}
        </pre>
      </div>
    );
  }