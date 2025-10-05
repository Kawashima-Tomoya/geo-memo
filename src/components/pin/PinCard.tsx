import type { Pin } from "~/types";

interface PinCardProps {
	pin: Pin;
	onDelete?: (id: string) => void;
}

export default function PinCard({ pin, onDelete }: PinCardProps) {
	return (
		<div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
			<div className="flex justify-between items-start">
				<div className="flex-1">
					<h3 className="font-bold text-gray-900">{pin.title}</h3>
					{pin.description && (
						<p className="text-gray-600 text-sm mt-1">{pin.description}</p>
					)}
					<p className="text-xs text-gray-500 mt-2">
						{pin.createdAt.toLocaleString("ja-JP")}
					</p>
				</div>
				{onDelete && (
					<button
						type="button"
						onClick={() => onDelete(pin.id)}
						className="text-gray-400 hover:text-red-600 transition-colors ml-2"
						aria-label="削除"
					>
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currenstColor"
							viewBox="0 0 24 24"
						>
							<title>pin</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				)}
			</div>
		</div>
	);
}
