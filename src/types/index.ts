export interface Pin {
	id: string;
	title: string;
	description: string;
	lng: number;
	lat: number;
	category: PinCategory;
	createdAt: Date;
	userId?: string;
}

export interface User {
	id: string;
	email: string;
	created_at: string;
}

export interface ViewState {
	latitude: number;
	longitude: number;
	zoom: number;
}

export interface PinFormData {
	title: string;
	description: string;
	category: string;
	color: string;
}

export type PinCategory = "restaurant" | "sightseeing" | "shopping" | "other";

// カテゴリの設定
export const PIN_CATEGORIES = {
	restaurant: {
		label: "食事",
		color: "#EF4444", // 赤
		icon: "🍴",
	},
	sightseeing: {
		label: "観光",
		color: "#3B82F6", // 青
		icon: "📸",
	},
	shopping: {
		label: "買い物",
		color: "#F59E0B", // オレンジ
		icon: "🛍️",
	},
	other: {
		label: "その他",
		color: "#6B7280", // グレー
		icon: "📍",
	},
} as const;
