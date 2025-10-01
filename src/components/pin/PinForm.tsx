"use client";

import { FormEvent, useState } from "react";

interface PinFormProps {
	onSubmit: (title: string, description: string) => void;
	onCancel: () => void;
}

export default function PinForm({ onSubmit, onCancel }: PinFormProps) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (title.trim()) {
			onSubmit(title.trim(), description.trim());
			setTitle("");
			setDescription("");
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-xl p-4 w-80">
			<h3 className="font-semibold text-gray-900 mb-3">新しいピンを作成</h3>
			<form onSubmit={handleSubmit} className="space-y-3">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						タイトル
					</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="例：美味しいラーメン屋"
						required
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						説明（任意）
					</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="詳細な情報を入力..."
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
				</div>
			</form>
		</div>
	);
}
