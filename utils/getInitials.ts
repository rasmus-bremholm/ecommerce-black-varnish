export default function getInitials(firstName: string, lastName: string) {
	const first = firstName?.trim()?.[0]?.toUpperCase() || "";
	const last = lastName?.trim()?.[0]?.toUpperCase() || "";

	if (first && last) {
		return `${first}${last}`;
	}

	if (first) return first;
	if (last) return last;

	return "?";
}
