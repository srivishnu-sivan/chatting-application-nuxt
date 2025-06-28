import { useThemeStore } from "@/stores/theme"

// Useful to prevent navigation overlapping during page transition

export default defineNuxtRouteMiddleware(() => {
	const store = useThemeStore()
	const routeTime = useLastRouteTime()
	const duration = 1000 * store.routerTransitionDuration
	const gap = 500

	if (new Date().getTime() - routeTime.value < duration + gap) return false

	routeTime.value = new Date().getTime()
})
