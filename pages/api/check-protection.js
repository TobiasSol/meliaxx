// pages/api/check-protection.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { data: settings, error } = await supabase
      .from('settings')
      .select('passwordprotectionenabled')
      .single();

    if (error) throw error;

    res.status(200).json({ 
      passwordProtectionEnabled: settings?.passwordprotectionenabled || false 
    });
  } catch (error) {
    console.error('Error checking protection status:', error);
    res.status(200).json({ passwordProtectionEnabled: false });
  }
}