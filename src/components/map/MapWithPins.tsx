"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Pin } from "~/types";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

interface MapWithPinsProps {
	pins: Pin[];
	onMapClick: (lng: number, lat: number) => void;
}

function createPinElement(color: string = "#3B82F6"): HTMLDivElement {
	const el = document.createElement("div");
	el.className = "custom-marker";
	el.style.cursor = "pointer";

	el.innerHTML = `
    <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="16" cy="40" rx="8" ry="2" fill="rgba(0,0,0,0.2)"/>
      <path 
        d="M16 0C9.4 0 4 5.4 4 12c0 10.5 12 28 12 28s12-17.5 12-28c0-6.6-5.4-12-12-12z" 
        fill="${color}" 
        stroke="#fff" 
        stroke-width="2"
      />
      <circle cx="16" cy="12" r="4" fill="#fff"/>
    </svg>
  `;

	return el;
}

export default function MapWithPins({ pins, onMapClick }: MapWithPinsProps) {
	const mapContainer = useRef<HTMLDivElement>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const markersMap = useRef<Map<string, mapboxgl.Marker>>(new Map());

	// 地図の初期化（1回だけ）
	useEffect(() => {
		if (map.current) return;

		if (mapContainer.current) {
			map.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: "mapbox://styles/mapbox/streets-v12",
				center: [139.6917, 35.6895],
				zoom: 12,
			});

			map.current.on("click", (e) => {
				const { lng, lat } = e.lngLat;
				onMapClick(lng, lat);
			});

			map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
		}

		return () => {
			if (map.current) {
				map.current.remove();
			}
		};
	}, [onMapClick]);

	// ピンマーカーの差分更新
	useEffect(() => {
		if (!map.current) return;

		// 現在のpinのIDセット
		const currentPinIds = new Set(pins.map((p) => p.id));

		// 削除されたマーカーを除去
		markersMap.current.forEach((marker, id) => {
			if (!currentPinIds.has(id)) {
				marker.remove();
				markersMap.current.delete(id);
			}
		});

		// 新しいマーカーを追加
		pins.forEach((pin) => {
			// 既に存在するマーカーはスキップ
			if (markersMap.current.has(pin.id)) {
				return;
			}

			const markerElement = createPinElement("#3B82F6");

			const marker = new mapboxgl.Marker(markerElement)
				.setLngLat([pin.lng, pin.lat])
				.setPopup(
					new mapboxgl.Popup({
						offset: 30,
						closeButton: false,
					}).setHTML(`
              <div style="padding: 12px; min-width: 200px;">
                <h3 style="font-weight: 600; font-size: 16px; margin: 0 0 8px 0; color: #111;">
                  ${pin.title}
                </h3>
                ${
									pin.description
										? `<p style="font-size: 14px; color: #666; margin: 0; line-height: 1.5;">
                    ${pin.description}
                  </p>`
										: ""
								}
              </div>
            `),
				)
				.addTo(map.current!);

			// ホバーエフェクト（transformの代わりにfilterを使用）
			markerElement.addEventListener("mouseenter", () => {
				markerElement.style.filter =
					"drop-shadow(0 4px 8px rgba(0,0,0,0.3)) brightness(1.1)";
				markerElement.style.transition = "filter 0.2s";
			});

			markerElement.addEventListener("mouseleave", () => {
				markerElement.style.filter = "none";
			});

			markersMap.current.set(pin.id, marker);
		});
	}, [pins]);

	return <div ref={mapContainer} className="w-full h-full" />;
}
