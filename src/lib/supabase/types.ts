export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			pins: {
				Row: {
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
				};
				Insert: {
					id?: string;
					user_id: string;
					title: string;
					description?: string | null;
					latitude: number;
					longitude: number;
					category?: string;
					color?: string;
					is_favorite?: boolean;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					title?: string;
					description?: string | null;
					latitude?: number;
					longitude?: number;
					category?: string;
					color?: string;
					is_favorite?: boolean;
					created_at?: string;
					updated_at?: string;
				};
			};
		};
	};
}
