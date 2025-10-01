"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PinForm() {
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [lat, setLat] = useState("");
	const [lng, setLng] = useState("");
	const [loading, setLoading] = useState(false);

	// フォーム送信時の処理
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!title || !lat || !lng) {
			alert("すべての項目を入力してください");
			return;
		}

		setLoading(true);

		const { error } = await supabase.from("pins").insert([
			{
				title,
				lat: parseFloat(lat),
				lng: parseFloat(lng),
			},
		]);

		setLoading(false);

		if (error) {
			console.error(error);
			alert("ピンの保存に失敗しました");
			return;
		}

		// 保存後にページを更新してピンを再取得
		router.refresh();

		// 入力欄をリセット
		setTitle("");
		setLat("");
		setLng("");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-2 bg-white p-4 rounded shadow-md"
		>
			<input
				type="text"
				placeholder="タイトル"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className="border p-2 w-full"
			/>
			<input
				type="text"
				placeholder="緯度"
				value={lat}
				onChange={(e) => setLat(e.target.value)}
				className="border p-2 w-full"
			/>
			<input
				type="text"
				placeholder="経度"
				value={lng}
				onChange={(e) => setLng(e.target.value)}
				className="border p-2 w-full"
			/>
			<button
				type="submit"
				disabled={loading}
				className="bg-blue-500 text-white p-2 rounded w-full disabled:opacity-50"
			>
				{loading ? "保存中..." : "ピンを追加"}
			</button>
		</form>
	);
}
