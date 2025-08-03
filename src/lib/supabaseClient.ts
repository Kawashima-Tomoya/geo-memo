import { createClient } from "@supabase/supabase-js";

// process.env から値を取得し、フォールバックで空文字を設定
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error(
		"Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
	);
}

// Supabase クライアントを生成
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
