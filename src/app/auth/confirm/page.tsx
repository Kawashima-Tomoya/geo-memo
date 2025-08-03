"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "~/lib/supabaseClient";

export default function ConfirmPage() {
	const router = useRouter();

	useEffect(() => {
		const confirm = async () => {
			const { data, error } = await supabase.auth.getSession();
			if (!error && data.session) {
				router.push("/map");
			} else {
				router.push("/auth/signin");
			}
		};

		confirm();
	}, [router]);

	return (
		<div className="text-center mt-20">
			<h2 className="text-xl">確認中です...</h2>
		</div>
	);
}
