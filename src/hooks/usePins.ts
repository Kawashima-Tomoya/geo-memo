import { useCallback, useState } from "react";

export interface Pin {
	id: string;
	title: string;
	description: string;
	lng: number;
	lat: number;
	createdAt: Date;
}

export function usePins() {
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

	const addPin = useCallback(
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

	const deletePin = useCallback((id: string) => {
		setPins((prev) => prev.filter((pin) => pin.id !== id));
	}, []);

	const cancelPinCreation = useCallback(() => {
		setShowPinForm(false);
		setSelectedLocation(null);
	}, []);

	return {
		pins,
		selectedLocation,
		showPinForm,
		handleMapClick,
		addPin,
		deletePin,
		cancelPinCreation,
	};
}
