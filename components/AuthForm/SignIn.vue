<template>
	<n-form ref="formRef" :model="model" :rules="rules">
		<n-form-item path="username" label="Email">
			<n-input
				v-model:value="model.username"
				@keydown.enter="signIn"
				placeholder="Example@email.com"
				size="large"
				autocomplete="on"
			/>
		</n-form-item>
		<n-form-item path="password" label="Password">
			<n-input
				v-model:value="model.password"
				type="password"
				show-password-on="click"
				placeholder="At least 8 characters"
				@keydown.enter="signIn"
				autocomplete="on"
				size="large"
			/>
		</n-form-item>
		<div class="flex flex-col items-end gap-6">
			<div class="flex justify-between w-full">
				<!-- <n-checkbox size="large">Remember me</n-checkbox> -->
				<!-- <n-button text type="primary" @click="emit('forgot-password')">Forgot Password?</n-button> -->
			</div>
			<div class="w-full">
				<n-button type="primary" @click="signIn" class="!w-full" size="large">Sign in</n-button>
			</div>
		</div>
	</n-form>
</template>

<script lang="ts" setup>
import { ref } from "vue"

import {
	type FormInst,
	type FormValidationError,
	useMessage,
	type FormRules,
	NForm,
	NFormItem,
	NInput,
	NButton,
	NCheckbox
} from "naive-ui"
import { useAuthStore } from "@/stores/auth"
import { useRouter } from "vue-router"

interface ModelType {
	username: string | null
	password: string | null
}

const router = useRouter()
const formRef = ref<FormInst | null>(null)
const message = useMessage()
const model = ref<ModelType>({
	username: "",
	password: ""
})

const emit = defineEmits<{
	(e: "forgot-password"): void
}>()

const rules: FormRules = {
	username: [
		{
			required: true,
			trigger: ["blur"],
			message: "Email is required"
		}
	],
	password: [
		{
			required: true,
			trigger: ["blur"],
			message: "Password is required"
		}
	]
}

async function signIn(e: Event) {
	e.preventDefault()
 formRef.value?.validate(async(errors: Array<FormValidationError> | undefined) => {
		console.log("error===>", errors);
		
		if (!errors) {
			if (model.value.username  && model.value.password ) {
				const response = await useAuthStore().setLogged(model.value)
				console.log("response===>", response);
				
				if (response) {
					router.push({ path: "/companylist/companylist", replace: true })
				}
			} else {
				message.error("Invalid credentials")
			}
		} else {
			message.error("Invalid credentials")
		}
	})
}
</script>
