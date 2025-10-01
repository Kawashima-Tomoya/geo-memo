import type * as React from "react";
import { cn } from "~/lib/utils";

type ButtonProps = {
	variant?: "default" | "outline" | "ghost" | "destructive";
	size?: "default" | "sm" | "lg";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const baseClasses = [
	"inline-flex",
	"items-center",
	"justify-center",
	"rounded-md",
	"font-medium",
	"transition-colors", // 色の変化アニメーション
	"focus-visible:outline-none",
	"focus-visible:ring-2",
	"focus-visible:ring-blue-500",
	"disabled:opacity-50",
	"disabled:pointer-events-none", // 無効時はクリック無効
].join(" ");

const variants = {
	default: "bg-blue-600 text-white hover:bg-blue-700",
	outline: "border border-gray-300 bg-white text-gray-600 hover:bg-gray-50",
	ghost: "hover:bg-gray-100",
	destructive: "bg-red-600 text-white hover:bg-red-700",
};

const sizes = {
	default: "h-10 px-4 py-2 ",
	sm: "h-9 px-3 text-sm",
	lg: "h-11 px-8 py-4",
};

export function Button({
	className,
	variant = "default",
	size = "default",
	...props
}: ButtonProps) {
	return (
		<button
			type="button"
			className={cn(baseClasses, variants[variant], sizes[size], className)}
			{...props}
		/>
	);
}

Button.displayName = "Button";
