"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "~/libs/supabaseClient";

type FormErrors = {
	email?: string;
	password?: string;
};

export default function SignUpPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [formErrors, setFormErrors] = useState<FormErrors>({});

	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const validatePassword = (password: string): boolean => {
		return password.length >= 6;
	};

	const validateForm = (): boolean => {
		const errors: FormErrors = {};

		if (!email) {
			errors.email = "メールアドレスを入力してください";
		} else if (!validateEmail(email)) {
			errors.email = "有効なメールアドレスを入力してください";
		}

		if (!password) {
			errors.password = "パスワードを入力してください";
		} else if (!validatePassword(password)) {
			errors.password = "パスワードは6文字以上で入力してください";
		} else if (password !== confirmPassword) {
			errors.password = "パスワードが一致しません";
		}

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		if (!validateForm()) return;

		setLoading(true);
		try {
			const { error } = await supabase.auth.signUp({ email, password });
			if (error) {
				setError(error.message);
			} else {
				setSuccess("確認メールを送信しました。メールをご確認ください。");
				setTimeout(() => {
					router.push("/auth/signin");
				}, 5000);
			}
		} catch (err) {
			setError("予期しないエラーが発生しました");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (error || success) {
			const timer = setTimeout(() => {
				setError(null);
				setSuccess(null);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [error, success]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
			<div className="max-w-md w-full">
				<div className="bg-white rounded-2xl shadow-xl p-8">
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-gray-900 mb-2">
							アカウント新規作成
						</h1>
						<p className="text-gray-600">Geo Memoへようこそ</p>
					</div>

					{error && (
						<div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<svg
										className="h-5 w-5 text-red-400"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<title>red</title>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<div className="ml-3">
									<p className="text-sm text-red-700">{error}</p>
								</div>
							</div>
						</div>
					)}

					{success && (
						<div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<svg
										className="h-5 w-5 text-green-400"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<title>green</title>

										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<div className="ml-3">
									<p className="text-sm text-green-700">{success}</p>
								</div>
							</div>
						</div>
					)}

					<form onSubmit={handleSignUp} className="space-y-6">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								メールアドレス
							</label>
							<input
								id="email"
								type="email"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									if (formErrors.email) {
										setFormErrors((prev) => ({ ...prev, email: undefined }));
									}
								}}
								className={`text-neutral-700 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
									formErrors.email
										? "border-red-300 bg-red-50"
										: "border-gray-300"
								}`}
								placeholder="your@email.com"
								required
								aria-describedby={formErrors.email ? "email-error" : undefined}
							/>
							{formErrors.email && (
								<p id="email-error" className="mt-1 text-sm text-red-600">
									{formErrors.email}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								パスワード
							</label>
							<input
								id="password"
								type="password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
									if (formErrors.password) {
										setFormErrors((prev) => ({ ...prev, password: undefined }));
									}
								}}
								className={`text-neutral-700 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
									formErrors.password
										? "border-red-300 bg-red-50"
										: "border-gray-300"
								}`}
								placeholder="6文字以上のパスワード"
								required
								aria-describedby={
									formErrors.password ? "password-error" : undefined
								}
							/>
						</div>

						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								パスワード確認
							</label>
							<input
								id="confirmPassword"
								type="password"
								value={confirmPassword}
								onChange={(e) => {
									setConfirmPassword(e.target.value);
									if (formErrors.password) {
										setFormErrors((prev) => ({ ...prev, password: undefined }));
									}
								}}
								className={`text-neutral-700 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
									formErrors.password
										? "border-red-300 bg-red-50"
										: "border-gray-300"
								}`}
								placeholder="パスワードを再入力"
								required
							/>
							{formErrors.password && (
								<p id="password-error" className="mt-1 text-sm text-red-600">
									{formErrors.password}
								</p>
							)}
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? (
								<span className="flex items-center justify-center">
									<svg
										className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<title>circle</title>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									アカウント作成中...
								</span>
							) : (
								"アカウント作成"
							)}
						</button>

						<div className="text-center">
							<p className="text-sm text-gray-600">
								すでにアカウントをお持ちですか？{" "}
								<button
									type="button"
									onClick={() => router.push("/auth/signin")}
									className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
								>
									ログイン
								</button>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
