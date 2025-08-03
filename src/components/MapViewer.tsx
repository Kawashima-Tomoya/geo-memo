"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import type { Pin } from "~/types/pin";

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
if (!mapboxToken) {
	throw new Error("NEXT_PUBLIC_MAPBOX_TOKEN is not defined.");
}
mapboxgl.accessToken = mapboxToken;

interface MapViewerProps {
	pins: Pin[];
}

const MapViewer = ({ pins }: MapViewerProps) => {
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<mapboxgl.Map | null>(null);

	useEffect(() => {
		if (!mapContainerRef.current || mapRef.current) return;

		mapRef.current = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [139.6917, 35.6895], // 東京
			zoom: 10,
		});

		// クリック時にピンを立てる
		mapRef.current.on("click", (e) => {
			new mapboxgl.Marker()
				.setLngLat([e.lngLat.lng, e.lngLat.lat])
				.addTo(mapRef.current!);
		});

		return () => mapRef.current?.remove();
	}, []);

	return <div className="w-full h-screen" ref={mapContainerRef} />;
};

export default MapViewer;
