// src/lib/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * 📍 デフォルトカテゴリ: ピンの種類分け用
 */
export const DEFAULT_CATEGORIES = [
	{
		value: "restaurant",
		label: "レストラン",
		color: "#ef4444",
		icon: "🍽️",
		description: "美味しいお店やグルメスポット",
	},
	{
		value: "shopping",
		label: "ショッピング",
		color: "#8b5cf6",
		icon: "🛒",
		description: "お買い物スポットやお店",
	},
	{
		value: "travel",
		label: "観光地",
		color: "#06b6d4",
		icon: "📍",
		description: "観光スポットや名所",
	},
	{
		value: "work",
		label: "仕事",
		color: "#10b981",
		icon: "💼",
		description: "オフィスや仕事関連の場所",
	},
	{
		value: "other",
		label: "その他",
		color: "#6b7280",
		icon: "📝",
		description: "その他のメモ",
	},
] as const;

/**
 * 🔍 カテゴリ検索: IDからカテゴリ情報を取得
 */
export const getCategoryById = (id: string) => {
	return (
		DEFAULT_CATEGORIES.find((cat) => cat.value === id) || DEFAULT_CATEGORIES[4]
	);
};

/**
 * 🎨 カテゴリカラー取得: より安全な色の取得
 */
export const getCategoryColor = (categoryId: string): string => {
	const category = getCategoryById(categoryId);
	return category.color;
};

/**
 * 📅 日付フォーマット: 日本語での相対時間表示
 */
export const formatRelativeTime = (date: string | Date): string => {
	const now = new Date();
	const target = new Date(date);
	const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);

	if (diffInSeconds < 60) return "たった今";
	if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}分前`;
	if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}時間前`;
	if (diffInSeconds < 2592000)
		return `${Math.floor(diffInSeconds / 86400)}日前`;

	return target.toLocaleDateString("ja-JP", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};

/**
 * 📱 レスポンシブ: デバイス判定
 */
export const isMobile = (): boolean => {
	if (typeof window === "undefined") return false;
	return window.innerWidth < 768;
};

/**
 * 🔒 入力値サニタイズ: XSS対策
 */
export const sanitizeInput = (input: string): string => {
	return input
		.replace(/[<>\"']/g, "") // 危険な文字を除去
		.trim()
		.slice(0, 500); // 最大500文字
};

/**
 * 🌍 座標の妥当性チェック
 */
export const isValidCoordinate = (lat: number, lng: number): boolean => {
	return (
		lat >= -90 &&
		lat <= 90 &&
		lng >= -180 &&
		lng <= 180 &&
		!isNaN(lat) &&
		!isNaN(lng)
	);
};

/**
 * 📏 距離計算: 2点間の距離（km）
 */
export const calculateDistance = (
	lat1: number,
	lng1: number,
	lat2: number,
	lng2: number,
): number => {
	const R = 6371; // 地球の半径（km）
	const dLat = ((lat2 - lat1) * Math.PI) / 180;
	const dLng = ((lng2 - lng1) * Math.PI) / 180;
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos((lat1 * Math.PI) / 180) *
			Math.cos((lat2 * Math.PI) / 180) *
			Math.sin(dLng / 2) *
			Math.sin(dLng / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c;
};

/**
 * 🎯 デバウンス: 入力遅延処理
 */
export const debounce = <T extends (...args: any[]) => any>(
	func: T,
	wait: number,
): ((...args: Parameters<T>) => void) => {
	let timeout: NodeJS.Timeout;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
};

/**
 * 📱 クリップボード: 安全なコピー処理
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
	try {
		if (navigator.clipboard) {
			await navigator.clipboard.writeText(text);
			return true;
		}
		// フォールバック処理
		const textArea = document.createElement("textarea");
		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand("copy");
		document.body.removeChild(textArea);
		return true;
	} catch (error) {
		console.error("クリップボードへのコピーに失敗:", error);
		return false;
	}
};

/**
 * 🌈 カスタムカラー生成: カテゴリ用のランダムカラー
 */
export const generateCategoryColor = (): string => {
	const colors = [
		"#ef4444",
		"#f97316",
		"#f59e0b",
		"#eab308",
		"#84cc16",
		"#22c55e",
		"#10b981",
		"#14b8a6",
		"#06b6d4",
		"#0ea5e9",
		"#3b82f6",
		"#6366f1",
		"#8b5cf6",
		"#a855f7",
		"#d946ef",
		"#ec4899",
		"#f43f5e",
	];
	return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * 🔧 型安全なローカルストレージ操作
 */
export const localStorage = {
	get: <T>(key: string, defaultValue: T): T => {
		if (typeof window === "undefined") return defaultValue;
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : defaultValue;
		} catch (error) {
			console.error(`localStorage取得エラー (${key}):`, error);
			return defaultValue;
		}
	},

	set: <T>(key: string, value: T): boolean => {
		if (typeof window === "undefined") return false;
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
			return true;
		} catch (error) {
			console.error(`localStorage保存エラー (${key}):`, error);
			return false;
		}
	},

	remove: (key: string): boolean => {
		if (typeof window === "undefined") return false;
		try {
			window.localStorage.removeItem(key);
			return true;
		} catch (error) {
			console.error(`localStorage削除エラー (${key}):`, error);
			return false;
		}
	},
};
