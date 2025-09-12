import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["your-supabase-project.supabase.co"],
	},
	env: {
		MAPBOX_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
	},
};

export default nextConfig;
