<template>
	<div class="page page-wrapped flex items-center justify-center">
		<n-result
			:status="`${status}` || '404'"
			:title="error.statusMessage || '404 Not Found'"
			size="huge"
			v-if="ready"
		>
			<div class="flex justify-center">
				<n-button @click="redirect()">Go to home</n-button>
			</div>
		</n-result>
	</div>
</template>

<script lang="ts" setup>
import { NResult, NButton } from "naive-ui"
import { ref, toRefs } from "vue"

type Status = "500" | "error" | "info" | "success" | "warning" | "404" | "403" | "418"

const props = defineProps(["error"])
const { error } = toRefs(props)

const ready = ref(false)
const status: Status = ref(error?.value.statusCode)

function redirect() {
	clearError({ redirect: "/" })
}

onMounted(() => {
	ready.value = true
})
</script>

<style lang="scss" scoped>
.page {
	font-size: 300px;
	height: 100vh;
	height: 100svh;
}
</style>
