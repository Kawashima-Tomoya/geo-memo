// Pin データの型定義
export type Pin = {
	id: string; // UUID
	user_id: string; // 外部キー
	title: string; // ピンのタイトル
	description?: string; // 任意の説明
	latitude: number; // 緯度
	longitude: number; // 経度
	created_at: string; // 生成日時（文字列）
};
