import Link from "next/link";
import { Button } from "~/components/ui/Button";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<div className="container mx-auto px-4 py-16">
				<div className="text-center">
					<h1 className="text-5xl font-bold text-gray-900 mb-6">MapMemo</h1>
					<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
						地図上にピンを立ててメモを残そう。
						<br />
						あなたの思い出や発見を位置情報と一緒に記録できます。
					</p>
					<Link href="/map">
						<Button variant="default" size="lg">
							アプリを開く
						</Button>
					</Link>
					<div className="space-x-4 mt-6">
						<Link href="/signin">
							<Button variant="outline" size="lg" className="">
								ログイン
							</Button>
						</Link>
						<Link href="/signup">
							<Button
								variant="outline"
								size="lg"
								className="bg-gray-50 hover:bg-white"
							>
								アカウント作成
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
