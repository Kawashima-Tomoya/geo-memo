// app/map/page.tsx
"use client";

import Sidebar from "~/components/layout/Sidebar";
import MapWithPins from "~/components/map/MapWithPins";
import PinForm from "~/components/pin/PinForm";
import { usePins } from "~/hooks/usePins";

export default function MapPage() {
	const {
		pins,
		showPinForm,
		handleMapClick,
		addPin,
		deletePin,
		cancelPinCreation,
	} = usePins();

	return (
		<div className="h-screen flex">
			<Sidebar pins={pins} onDeletePin={deletePin} />

			<div className="flex-1 relative">
				<div className="absolute inset-0">
					<MapWithPins pins={pins} onMapClick={handleMapClick} />
				</div>

				{showPinForm && (
					<div className="absolute top-4 right-4 z-10">
						<PinForm onSubmit={addPin} onCancel={cancelPinCreation} />
					</div>
				)}
			</div>
		</div>
	);
}
