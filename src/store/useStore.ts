// src/store/useStore.ts
import { create } from "zustand";
import { Pin, User, ViewState } from "~/types";
import { createClient } from "~/lib/supabase/client";

interface AppState {
	// User state
	user: User | null;
	isLoading: boolean;

	// Map state
	viewState: ViewState;
	pins: Pin[];
	selectedPin: Pin | null;

	// UI state
	isAddingPin: boolean;
	newPinLocation: { lat: number; lng: number } | null;

	// Actions
	setUser: (user: User | null) => void;
	setViewState: (viewState: ViewState) => void;
	setPins: (pins: Pin[]) => void;
	setSelectedPin: (pin: Pin | null) => void;
	setIsAddingPin: (isAdding: boolean) => void;
	setNewPinLocation: (location: { lat: number; lng: number } | null) => void;

	// Async actions
	fetchPins: () => Promise<void>;
	addPin: (
		pinData: Omit<Pin, "id" | "user_id" | "created_at" | "updated_at">,
	) => Promise<void>;
	updatePin: (id: string, updates: Partial<Pin>) => Promise<void>;
	deletePin: (id: string) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
	// Initial state
	user: null,
	isLoading: false,
	viewState: {
		latitude: 35.6762,
		longitude: 139.6503,
		zoom: 10,
	},
	pins: [],
	selectedPin: null,
	isAddingPin: false,
	newPinLocation: null,

	// Sync actions
	setUser: (user) => set({ user }),
	setViewState: (viewState) => set({ viewState }),
	setPins: (pins) => set({ pins }),
	setSelectedPin: (pin) => set({ selectedPin: pin }),
	setIsAddingPin: (isAdding) => set({ isAddingPin: isAdding }),
	setNewPinLocation: (location) => set({ newPinLocation: location }),

	// Async actions
	fetchPins: async () => {
		const supabase = createClient();
		const { data, error } = await supabase
			.from("pins")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) {
			console.error("Error fetching pins:", error);
			return;
		}

		set({ pins: data || [] });
	},

	addPin: async (pinData) => {
		const { user } = get();
		if (!user) return;

		const supabase = createClient();
		const { data, error } = await supabase
			.from("pins")
			.insert([{ ...pinData, user_id: user.id }])
			.select()
			.single();

		if (error) {
			console.error("Error adding pin:", error);
			return;
		}

		const { pins } = get();
		set({ pins: [data, ...pins] });
	},

	updatePin: async (id, updates) => {
		const supabase = createClient();
		const { data, error } = await supabase
			.from("pins")
			.update(updates)
			.eq("id", id)
			.select()
			.single();

		if (error) {
			console.error("Error updating pin:", error);
			return;
		}

		const { pins } = get();
		const updatedPins = pins.map((pin) =>
			pin.id === id ? { ...pin, ...data } : pin,
		);
		set({ pins: updatedPins });
	},

	deletePin: async (id) => {
		const supabase = createClient();
		const { error } = await supabase.from("pins").delete().eq("id", id);

		if (error) {
			console.error("Error deleting pin:", error);
			return;
		}

		const { pins, selectedPin } = get();
		const filteredPins = pins.filter((pin) => pin.id !== id);
		set({
			pins: filteredPins,
			selectedPin: selectedPin?.id === id ? null : selectedPin,
		});
	},
}));
