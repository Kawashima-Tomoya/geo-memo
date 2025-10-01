"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "~/lib/supabase/client";

export default function SignInPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSignIn = async () => {
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		setLoading(false);
		if (error) setError(error.message);
		else router.push("/map");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
			<div className="max-w-md w-full">
				<div className="bg-white rounded-2xl shadow-xl p-8">
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-gray-900 mb-2">ログイン</h1>
						<p className="text-gray-600">Geo Memoへようこそ</p>
					</div>
					{error && <p className="text-red-500">{error}</p>}
					<form onSubmit={handleSignIn} className="space-y-6">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								メールアドレス
							</label>
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="border-gray-300 text-neutral-700  w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
								disabled={loading}
							/>
						</div>
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								パスワード
							</label>
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="border-gray-300 text-neutral-700 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
								disabled={loading}
							/>
						</div>
						<button
							type="submit"
							disabled={loading}
							className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white  py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? "ログイン中..." : "ログイン"}
						</button>

						<div className="text-center">
							<button
								type="button"
								onClick={() => router.push("/auth/signup")}
								className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline"
							>
								新しいアカウントを作成
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
