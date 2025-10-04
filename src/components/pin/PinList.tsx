import type { Pin } from "~/types";
import PinCard from "./PinCard";

interface PinListProps {
	pins: Pin[];
	onDeletePin?: (id: string) => void;
}

export default function PinList({ pins, onDeletePin }: PinListProps) {
	if (pins.length === 0) {
		return (
			<p className="text-gray-500 text-sm">
				まだピンがありません。
				<br />
				地図をクリックして最初のピンを作成しましょう！
			</p>
		);
	}

	return (
		<div className="space-y-3">
			{pins.map((pin) => (
				<PinCard key={pin.id} pin={pin} onDelete={onDeletePin} />
			))}
		</div>
	);
}
