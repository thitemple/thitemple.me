// Builds a serialized <script type="application/ld+json"> tag as a string,
// for injection via {@html}. Kept in a plain .ts file — not inline in a
// .svelte file's markup — because Svelte's own tooling scans a component's
// raw text for "<script" / "</script>" tag boundaries ahead of JS parsing,
// and trips over the literal substring even inside a string literal.
export function buildJsonLdScriptTag(data: unknown): string {
	return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}
