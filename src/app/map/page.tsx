"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MapViewer from "~/components/MapViewer";
import { usePins } from "~/hooks/usePins";
import { supabase } from "~/libs/supabaseClient";
import type { Pin } from "~/types/pin";

export default function MapPage() {
	const router = useRouter();
	// const [user, setUser] = useState<Pin["user"] | null>(null);
	const { pins, fetchPins } = usePins();

	useEffect(() => {
		const getSession = async () => {
			const { data, error } = await supabase.auth.getSession();
			const sessionUser = data?.session?.user ?? null;
			// setUser(sessionUser);
			if (!sessionUser) {
				router.push("/auth/signin");
			} else {
				fetchPins();
			}
		};
		getSession();
	}, [router, fetchPins]);

	return (
		<div className="w-full h-screen">
			<MapViewer pins={pins} />
		</div>
	);
}
