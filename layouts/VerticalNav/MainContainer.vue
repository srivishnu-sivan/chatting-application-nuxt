<template>
	<div id="main" class="main" :class="{ 'sidebar-collapsed': sidebarCollapsed, 'sidebar-opened': !sidebarCollapsed }">
		<n-scrollbar ref="scrollbar">
			<Toolbar :boxed="toolbarBoxed" />
			<div class="view" :class="[{ boxed }, `route-${routeName}`]">
				<slot></slot>
			</div>
			<FooterEL :boxed="boxed" v-if="footerShown" />
		</n-scrollbar>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, watch } from "vue"
import { NScrollbar } from "naive-ui"
import { useRoute, useRouter } from "vue-router"
import Toolbar from "@/layouts/common/Toolbar/index.vue"
import FooterEL from "@/layouts/common/FooterEL.vue"
import { useThemeStore } from "@/stores/theme"
import { toggleSidebarClass } from "@/utils/theme"

defineOptions({
	name: "MainContainer"
})

const router = useRouter()
const route = useRoute()
const routeName = computed<string>(() => route.name?.toString() || "")
const sidebarCollapsed = computed(() => useThemeStore().sidebar.collapsed)
const boxed = computed(() => useThemeStore().isBoxed)
const footerShown = computed(() => useThemeStore().isFooterShown)
const toolbarBoxed = computed(() => useThemeStore().isToolbarBoxed)
const scrollbar = ref()

onMounted(() => {
	router.afterEach(() => {
		if (scrollbar?.value?.scrollTo) {
			scrollbar?.value.scrollTo({ top: 0 })
		}
	})

	watch(
		sidebarCollapsed,
		val => {
			toggleSidebarClass(val, "main", "sidebar-opened", "sidebar-collapsed")
		},
		{
			immediate: true
		}
	)
})
</script>

<style lang="scss" scoped>
@import "./variables";

.main {
	width: 100%;
	padding-left: var(--sidebar-open-width);
	position: relative;
	transition: padding var(--sidebar-anim-ease) var(--sidebar-anim-duration);
	background-color: var(--bg-body);
	transition: all var(--sidebar-anim-ease) var(--sidebar-anim-duration);
	:deep() {
		& > .n-scrollbar {
			& > .n-scrollbar-rail {
				top: calc(var(--toolbar-height) + 2px);
			}
		}
	}
	&.sidebar-collapsed {
		padding-left: var(--sidebar-close-width);
	}

	.view {
		padding: var(--view-padding);
		padding-top: calc(var(--view-padding) / 2);

		&.boxed {
			max-width: var(--boxed-width);
			margin: 0 auto;
		}
	}

	@media (max-width: $sidebar-bp) {
		padding-left: 0px;
		&.sidebar-collapsed {
			padding-left: 0px;
		}

		

		&.sidebar-opened {
			//transform: scale(0.8) translateX(100%) rotateY(35deg);
			//transform: scale(0.8) translateX(100%);
			transform-origin: center left;
			border-radius: 16px;
			overflow: hidden;
			opacity: 0.5;
		}
	}

	@media (min-width: ($sidebar-bp + 1px)) {
		:deep() {
			header.toolbar {
				.logo {
					display: none;
				}
			}
		}
	}
}
</style>
