import { useState } from 'react';
import Link from 'next/link';
import { Instagram, Twitch, Twitter } from 'lucide-react';

export default function Footer() {
 const [email, setEmail] = useState('');
 const [status, setStatus] = useState({ type: '', message: '' });
 const [loading, setLoading] = useState(false);

 const handleNewsletterSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);
   setStatus({ type: '', message: '' });

   try {
     const res = await fetch('/api/newsletter', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ email }),
     });

     const data = await res.json();

     if (res.ok) {
       setStatus({
         type: 'success',
         message: 'Vielen Dank für deine Anmeldung!'
       });
       setEmail('');
     } else {
       throw new Error(data.message || 'Ein Fehler ist aufgetreten');
     }
   } catch (error) {
     setStatus({
       type: 'error',
       message: error.message
     });
   } finally {
     setLoading(false);
   }
 };

 return (
   <footer className="bg-black text-white border-[#d0b48f]">
     <div className="container mx-auto px-4 py-12">
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
         {/* Newsletter Signup */}
         <div className="sm:col-span-2 lg:col-span-1">
           <h3 className="text-xl font-bold text-[#e3cbaa] mb-4">Newsletter</h3>
           <form onSubmit={handleNewsletterSubmit}>
             <div className="space-y-2">
               <div className="flex flex-col sm:flex-row gap-2">
                 <input
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="Deine E-Mail Adresse"
                   className="w-full px-4 py-2 bg-black border border-[#d0b48f] rounded text-white"
                   required
                   disabled={loading}
                 />
                 <button
                   type="submit"
                   disabled={loading}
                   className="w-full sm:w-auto px-4 py-2 bg-[#d0b48f] text-black rounded hover:bg-[#e3cbaa] transition-colors disabled:opacity-50 whitespace-nowrap"
                 >
                   {loading ? 'Wird gesendet...' : 'Anmelden'}
                 </button>
               </div>
               {status.message && (
                 <div className={`text-sm ${
                   status.type === 'success' ? 'text-green-400' : 'text-red-400'
                 }`}>
                   {status.message}
                 </div>
               )}
             </div>
           </form>
         </div>

         {/* Meliax Links */}
         <div className="lg:pl-8">
           <h3 className="text-xl font-bold text-[#e3cbaa] mb-4">Meliax Content</h3>
           <div className="space-y-2">
             <Link href="/meliax-cam" className="block text-[#d0b48f] hover:text-[#e3cbaa]">
               Meliax Cam
             </Link>
             <Link href="/meliax-onlyfans" className="block text-[#d0b48f] hover:text-[#e3cbaa]">
               Meliax OnlyFans
             </Link>
             <Link href="/meliax-stripchat" className="block text-[#d0b48f] hover:text-[#e3cbaa]">
               Meliax Stripchat
             </Link>
             <Link href="/meliax-nude" className="block text-[#d0b48f] hover:text-[#e3cbaa]">
               Meliax Nude
             </Link>
             <Link href="/meliax-leak" className="block text-[#d0b48f] hover:text-[#e3cbaa]">
               Meliax Leak
             </Link>
             <Link href="/meliax-porn" className="block text-[#d0b48f] hover:text-[#e3cbaa]">
               Meliax Porn
             </Link>
           </div>
         </div>

         {/* Social Media Links */}
         <div className="lg:pl-4">
           <h3 className="text-xl font-bold text-[#e3cbaa] mb-4">Social Media</h3>
           <div className="flex space-x-4">
             <a href="https://www.instagram.com/me.lia.x/" target="_blank" rel="noopener noreferrer" className="text-[#d0b48f] hover:text-[#e3cbaa]"><Instagram size={24} /></a>
             <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer" className="text-[#d0b48f] hover:text-[#e3cbaa]"><Twitch size={24} /></a>
             <a href="https://x.com/me_lia_x" target="_blank" rel="noopener noreferrer" className="text-[#d0b48f] hover:text-[#e3cbaa]"><Twitter size={24} /></a>
           </div>
         </div>

         {/* Legal Links */}
         <div className="lg:pl-4">
           <h3 className="text-xl font-bold text-[#e3cbaa] mb-4">Rechtliches</h3>
           <div className="space-y-2">
             <Link href="/impressum" className="block font-playfair text-[#d0b48f] hover:text-[#e3cbaa]">
               Impressum
             </Link>
             <Link href="/datenschutz" className="block text-[#d0b48f] hover:text-[#e3cbaa]">
               Datenschutz
             </Link>
             <Link href="/agb" className="block text-[#d0b48f] hover:text-[#e3cbaa]">
               AGB
             </Link>
             <Link href="/kontakt" className="block text-[#d0b48f] hover:text-[#e3cbaa]">
               Kontakt
             </Link>
           </div>
         </div>
       </div>

       <div className="mt-8 pt-8 border-t border-gray-800 text-center font-playfair text-[#d0b48f]">
         © {new Date().getFullYear()} Meliax. Alle Rechte vorbehalten.
       </div>
     </div>
   </footer>
 );
}