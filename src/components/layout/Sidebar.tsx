import PinList from "~/components/pin/PinList";
import type { Pin } from "~/types";

interface SidebarProps {
	pins: Pin[];
	onDeletePin?: (id: string) => void;
}

export default function Sideber({ pins, onDeletePin }: SidebarProps) {
	return (
		<div className="text-black z-10 absolute top-0 left-0 w-80 h-full border-r bg-white/2.5 border-white/50 backdrop-blur-sm shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)]  antialiased">
			<div className="p-4 border-b border-gray-200 ">
				<h1 className="text-2xl font-bold ">MapMemo</h1>
				<p className="text-sm mt-1">地図をクリックしてピンを追加</p>
			</div>

			<div className="flex-1 overflow-y-auto p-4">
				<h2 className="font-semibold mb-3">保存されたピン ({pins.length})</h2>
				<PinList pins={pins} onDeletePin={onDeletePin} />
			</div>
		</div>
	);
}
