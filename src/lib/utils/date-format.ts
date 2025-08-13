export function formatDate(dateString: string): string {
	// Extract just the date part (YYYY-MM-DD) to avoid timezone issues
	const datePart = dateString.split("T")[0];
	// Add local time to ensure it's treated as local date
	const date = new Date(datePart + "T12:00:00");

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric"
	};
	return date.toLocaleDateString("en-US", options);
}
