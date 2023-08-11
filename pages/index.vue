<script setup>
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const isLoading = ref(false)
const valid = ref(true)
const url = ref("")
function onBlurEmail(e) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if (!e.target.value.length) {
    valid.value = true
    return
  }
  if (!emailRegex.test(e.target.value)) {
    valid.value = false
    return
  }
  valid.value = true
  return
}
onMounted(() => {
  url.value = `${window.location.protocol}//${window.location.hostname}`
  const error = useRoute().query.error
  if (error && error === '401') {
    toast.error('Unauthorized')
  }
})
const data = ref({
  name: "",
  email: "",
  client_id: "",
  client_secret: "",
})
const someEmpty = ref(false)
function isObjEmpty(obj) {
  for (const value of Object.values(obj)) {
    if (value.length < 1) {
      someEmpty.value = true
      return
    }
  }
}
function clearEmpty() {
  someEmpty.value = false
}
async function auth() {
  if (!valid.value) {
    return
  }
  isObjEmpty(data.value)
  if (someEmpty.value) {
    return
  }
  isLoading.value = true
  sessionStorage.setItem('email', data.value.email)
  const { data: res } = await useFetch('/api/auth', {
    method: "POST",
    body: {
      ...data.value
    }
  })
  isLoading.value = false
  window.location.href = res.value
}
</script>
<template>
  <section class="flex flex-col items-center justify-center w-full h-full gap-2 bg-white">
    <h2 class="text-2xl font-semibold">Authorize Yourself</h2>
    <form class="w-full max-w-md" @submit.prevent="auth">
      <div class="mb-3">
        <div class="mb-6">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
          <input type="text" id="password" v-model="data.name" @change="clearEmpty"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        </div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 "> Email</label>
        <input type="email" id="email" v-model="data.email" @blur="onBlurEmail" :class="{ '!border-red-500': !valid }"
          @change="clearEmpty"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="name@company.com">
        <span class="text-sm font-medium text-red-500" :class="{ 'visible': !valid, 'invisible': valid }">Email is
          not
          valid</span>
      </div>
      <div class="mt-3 mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Client Id</label>
        <input type="text" id="password" v-model="data.client_id" @change="clearEmpty"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
      </div>
      <div class="mb-2">
        <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 ">Client secret</label>
        <input type="password" id="repeat-password" v-model="data.client_secret" @change="clearEmpty"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
      </div>
      <span class="text-sm font-medium text-red-500 " :class="{ 'visible': someEmpty, 'invisible': !someEmpty }">Every
        field needs to be filled</span>
      <div class="flex items-center gap-3 mt-2">
        <button type="submit" :disabled="isLoading"
          class="text-white bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Authorize</button>
        <div v-if="isLoading" role="status">
          <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor" />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <h3 :class="{ 'invisible': url.length === 0 }" class="mt-4 text-lg font-semibold">Note:</h3>
      <p :class="{ 'invisible': url.length === 0 }">
        put this <span class="font-bold">{{ url }}</span> and <span class="font-bold">{{ `${url}/callback` }}</span> in
        OAuth Credentials <span class="font-semibold">Origin</span> and <span class="font-semibold">Redirect URI</span>
        respectivly
      </p>
    </form>
  </section>
</template>
