<script setup lang="ts">
import services from '@/services'
import { validateEmptyAndEmail, validateEmptyAndLength3 } from '@/utils/validators'
import { useField } from 'vee-validate'
import { useToast } from 'vue-toastification'
import { reactive, ref } from 'vue'
import router from '@/router'

const { value: emailValue, errorMessage: emailErrorMessage } = useField(
  'email',
  validateEmptyAndEmail
)

const { value: passwordValue, errorMessage: passwordErrorMessage } = useField(
  'password',
  validateEmptyAndLength3
)

const email = reactive({ value: emailValue, errorMessage: emailErrorMessage })
const password = reactive({ value: passwordValue, errorMessage: passwordErrorMessage })
const toast = useToast()
const loading = ref<boolean>(false)

async function handleSubmit() {
  loading.value = true
  try {
    const { data, errors } = await services.auth.login({
      email: email.value,
      password: password.value
    })
    if (!errors) {
      window.localStorage.setItem('token', data.access_token)
      router.push({ name: 'home' })
      return
    }

    if (errors!.status === 404) {
      toast.error('E-mail não encontrado')
    }
    if (errors!.status === 401) {
      toast.error('E-mail/senha inválidos')
    }
    if (errors!.status === 400) {
      toast.error('Ocorreu um erro ao fazer o login')
    }

    loading.value = false
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <main class="flex flex-col gap-10">
    <h1 class="font-bold text-2xl">Login</h1>
    <div class="form-control">
      <label class="input-group">
        <span>E-mail</span>
        <input
          data-cy="email-input"
          type="text"
          placeholder="email@provedor.com"
          class="input input-bordered"
          :class="{
            'input-error': !!email.errorMessage
          }"
          v-model.trim="email.value"
        />
      </label>
      <label class="label" v-if="!!email.errorMessage">
        <span data-cy="email-error-msg" class="label-text-alt text-primary">{{
          email.errorMessage
        }}</span>
      </label>
    </div>

    <label class="input-group">
      <span>Senha</span>
      <input
        data-cy="password-input"
        type="password"
        placeholder="SenhaMuitoForte88@"
        class="input input-bordered"
        v-model.trim="password.value"
        @keyup.enter="handleSubmit"
      />
    </label>
    <button class="btn w-fit px-10 btn-primary font-extrabold" @click="handleSubmit">
      <span v-if="loading" class="loading loading-infinity loading-md" />
      <span v-else>LOGIN</span>
    </button>
  </main>
</template>
