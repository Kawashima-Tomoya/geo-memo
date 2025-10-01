"use client";

import { useCallback, useState } from "react";
import MapView from "~/components/map/MapView";

interface Pin {
	id: string;
	title: string;
	description: string;
	lng: number;
	lat: number;
	createdAt: Date;
}

export default function AppPage() {
	const [pins, setPins] = useState<Pin[]>([]);
	const [selectedLocation, setSelectedLocation] = useState<{
		lng: number;
		lat: number;
	} | null>(null);
	const [showPinForm, setShowPinForm] = useState(false);

	const handleMapClick = useCallback((lng: number, lat: number) => {
		setSelectedLocation({ lng, lat });
		setShowPinForm(true);
	}, []);

	const handleAddPin = useCallback(
		(title: string, description: string) => {
			if (!selectedLocation) return;

			const newPin: Pin = {
				id: crypto.randomUUID(),
				title,
				description,
				lng: selectedLocation.lng,
				lat: selectedLocation.lat,
				createdAt: new Date(),
			};

			setPins((prev) => [...prev, newPin]);
			setShowPinForm(false);
			setSelectedLocation(null);
		},
		[selectedLocation],
	);

	const handleCancel = useCallback(() => {
		setShowPinForm(false);
		setSelectedLocation(null);
	}, []);

	return (
		<div className="h-screen flex">
			{/* サイドバー */}
			<div className="text-black z-10 absolute top-0 left-0 w-80 h-full border-r bg-white/2.5 border-white/50 backdrop-blur-sm shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/30 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none  antialiased">
				<div className="p-4 border-b border-gray-200 ">
					<h1 className="text-2xl font-bold ">MapMemo</h1>
					<p className="text-sm mt-1">地図をクリックしてピンを追加</p>
				</div>

				<div className="flex-1 overflow-y-auto p-4">
					<h2 className="font-semibold mb-3">保存されたピン ({pins.length})</h2>

					{pins.length === 0 ? (
						<p className="text-sm">
							まだピンがありません。
							<br />
							地図をクリックして最初のピンを作成しましょう！
						</p>
					) : (
						<div className="space-y-3">
							{pins.map((pin) => (
								<div key={pin.id} className="bg-gray-50 rounded-lg p-3">
									<h3 className="font-medium text-gray-900">{pin.title}</h3>
									<p className="text-gray-600 text-sm mt-1">
										{pin.description}
									</p>
									<p className="text-xs text-gray-400 mt-2">
										{pin.createdAt.toLocaleString("ja-JP")}
									</p>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			{/* 地図エリア */}
			<div className="flex-1 relative">
				<div className="absolute inset-0">
					<MapView onMapClick={handleMapClick} />
				</div>

				{/* ピン作成フォーム */}
				{showPinForm && selectedLocation && (
					<div className="z-4 absolute top-4 right-4 bg-white/80 rounded-lg shadow-lg p-4 w-80">
						<h3 className="font-semibold text-gray-900 mb-3">
							新しいピンを作成
						</h3>
						<PinForm onSubmit={handleAddPin} onCancel={handleCancel} />
					</div>
				)}
			</div>
		</div>
	);
}

// ピン作成フォームコンポーネント
function PinForm({
	onSubmit,
	onCancel,
}: {
	onSubmit: (title: string, description: string) => void;
	onCancel: () => void;
}) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (title.trim()) {
			onSubmit(title.trim(), description.trim());
			setTitle("");
			setDescription("");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-3 text-gray-900 antialiased"
		>
			<div>
				<label htmlFor="pin-title" className="block text-sm font-medium mb-1">
					タイトル
				</label>
				<input
					id="pin-title"
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
			</div>

			<div>
				<label
					htmlFor="pin-description"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					説明（任意）
				</label>
				<textarea
					id="pin-description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					rows={3}
				/>
			</div>

			<div className="flex space-x-2">
				<button
					type="submit"
					className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors"
				>
					保存
				</button>
				<button
					type="button"
					onClick={onCancel}
					className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-md font-medium transition-colors"
				>
					キャンセル
				</button>
				{/* <button
					type="button"
					onClick={onCancel}
					className="flex-1 inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center px-4 py-2 text-white text-sm rounded-lg bg-white/2.5 border-white/50 backdrop-blur-sm shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] hover:bg-white/30 transition-all duration-300 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/30 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none antialiased"
				>
					キャンセル
				</button> */}
			</div>
		</form>
	);
}
