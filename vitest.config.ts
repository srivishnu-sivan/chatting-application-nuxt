import { fileURLToPath } from "node:url"
import { defineVitestConfig } from "nuxt-vitest/config"

export default defineVitestConfig({
	test: {
		environment: "jsdom",
		root: fileURLToPath(new URL("./", import.meta.url))
	}
})
