import { useEffect, useState } from "react";

export const useDebounce = <T,>(value: T, delay: number): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);
	useEffect(
		() => {
			// Update debounced value after delay
			const handler = setTimeout(() => {
				setDebouncedValue(value);
			}, delay);
			return () => {
				clearTimeout(handler);
			};
		},
		[value, delay] // Only re-call effect if value or delay changes
	);
	return debouncedValue;
};
