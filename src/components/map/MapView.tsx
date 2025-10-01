"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

// Mapboxのアクセストークンを設定
// biome-ignore lint/style/noNonNullAssertion: using non-null assertion for env variable
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

interface MapViewProps {
	onMapClick?: (lng: number, lat: number) => void;
}

export default function MapView({ onMapClick }: MapViewProps) {
	const mapContainer = useRef<HTMLDivElement>(null);
	const map = useRef<mapboxgl.Map | null>(null);

	useEffect(() => {
		if (map.current) return; // すでに地図が初期化されている場合は何もしない

		if (mapContainer.current) {
			map.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: "mapbox://styles/mapbox/streets-v12",
				center: [139.6917, 35.6895], // 東京駅の座標
				zoom: 12,
			});

			// 地図クリック時のイベントハンドラー
			if (onMapClick) {
				map.current.on("click", (e) => {
					const { lng, lat } = e.lngLat;
					onMapClick(lng, lat);
				});
			}

			// ナビゲーションコントロールを追加（ズームボタンなど）
			map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
		}

		// クリーンアップ
		return () => {
			if (map.current) {
				map.current.remove();
			}
		};
	}, [onMapClick]);

	return (
		<div
			ref={mapContainer}
			className="w-full h-full rounded-lg overflow-hidden"
		/>
	);
}
