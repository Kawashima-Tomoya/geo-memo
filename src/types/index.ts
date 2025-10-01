// src/types/index.ts
export interface Pin {
	id: string;
	user_id: string;
	title: string;
	description: string | null;
	latitude: number;
	longitude: number;
	category: string;
	color: string;
	is_favorite: boolean;
	created_at: string;
	updated_at: string;
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
