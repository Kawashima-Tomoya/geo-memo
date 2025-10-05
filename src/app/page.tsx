import Link from "next/link";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<div className="container mx-auto px-4 py-16">
				<div className="text-center">
					<h1 className="text-5xl font-bold text-gray-900 mb-6">Map Memo</h1>
					<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
						地図上にピンを立ててメモを残そう。
						<br />
						あなたの思い出や発見を位置情報と一緒に記録できます。
					</p>
					<div className="mt-8">
						<Link
							href="/map"
							className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-lg text-lg font-semibold transition-colors"
						>
							アプリを開く
						</Link>
						<div className="mt-10 space-x-4">
							<Link
								href="/signin"
								className="inline-block bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg font-semibold border border-gray-300 transition-colors"
							>
								ログイン
							</Link>
							<Link
								href="/signup"
								className="inline-block bg-gray-800  hover:bg-gray-700 text-gray-100  px-8 py-3 rounded-lg font-semibold transition-colors"
							>
								アカウント作成
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
