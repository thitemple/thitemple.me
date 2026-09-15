import { dev } from "$app/environment";

export const title = "Thiago Temple — Mr. Food Programmer";
export const author = "Thiago Temple";
export const description =
	"Practical family recipes, meal prep and kitchen notes from a software engineer's home kitchen. Also a staff developer shipping software on the web.";
export const url = dev ? "http://localhost:5173" : "https://thitemple.me";

// The other properties this page routes to — reused for rel="me" identity
// links and the Person schema's sameAs so both stay in sync with the UI.
export const socialLinks = [
	"https://mrfoodprogrammer.com",
	"https://www.youtube.com/@Mr.FoodProgrammer",
	"https://www.instagram.com/mr.foodprogrammer/",
	"https://foodprogrammerlog.substack.com",
	"https://github.com/thitemple",
	"https://www.linkedin.com/in/thitemple/",
	"https://bsky.app/profile/thitemple.me"
] as const;
