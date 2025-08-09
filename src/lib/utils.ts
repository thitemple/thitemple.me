import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type DateStyle = Intl.DateTimeFormatOptions["dateStyle"];

export function formatDate(date: string, dateStyle: DateStyle = "medium", locales = "en") {
	try {
		// Safari is mad about dashes in the date
		const dateToFormat = new Date(date.replaceAll("-", "/"));
		if (isNaN(dateToFormat.getTime())) {
			return "Invalid Date";
		}
		const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
		return dateFormatter.format(dateToFormat);
	} catch {
		return "Invalid Date";
	}
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
