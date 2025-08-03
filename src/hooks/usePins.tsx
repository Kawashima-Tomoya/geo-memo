"use client";
import { useState } from "react";
import { supabase } from "~/lib/supabaseClient";
import type { Pin } from "~/types/pin";

export const usePins = () => {
	const [pins, setPins] = useState<Pin[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// データ取得
	const fetchPins = async () => {
		setLoading(true);
		const { data, error } = await supabase
			.from("pins")
			.select("*")
			.order("created_at", { ascending: false });
		setLoading(false);
		if (error) setError(error.message);
		else setPins(data ?? []);
	};

	// 新規作成
	const createPin = async (newPin: Omit<Pin, "id" | "created_at">) => {
		setLoading(true);
		const { data, error } = await supabase
			.from("pins")
			.insert(newPin)
			.select()
			.single();
		setLoading(false);
		if (error) throw new Error(error.message);
		setPins((prev) => [data!, ...prev]);
		return data;
	};

	return { pins, loading, error, fetchPins, createPin };
};
