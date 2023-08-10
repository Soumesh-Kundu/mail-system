<script setup>

const data=ref({
  name:"Soumesh Kundu",
  email:"iamsoumo26@gmail.com",
  client_id:"1004406759218-6mdclca7g97eigbm0cb8kjoj6m7j5pvr.apps.googleusercontent.com",
  client_secret:"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",
})
async function auth() {
  sessionStorage.setItem('email',data.value.email)
  const { data:res } = await useFetch('/api/auth', {
    method: "POST",
    body: {
      ...data.value
    }
  })
  window.location.href = res.value
}
</script>
<template>
  <section class="flex flex-col items-center justify-center w-full h-full gap-2 bg-white">
    <form class="w-full max-w-md" @submit.prevent="auth">
      <div class="mb-6">
        <div class="mb-6">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
          <input type="text" id="password" v-model="data.name"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
        </div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 "> Email</label>
        <input type="email" id="email" v-model="data.email"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="name@flowbite.com" >
      </div>
      <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Client Id</label>
        <input type="text" id="password" v-model="data.client_id"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
      </div>
      <div class="mb-6">
        <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 ">Client secret</label>
        <input type="password" id="repeat-password" v-model="data.client_secret"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
      </div>
      <!-- <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
          <input id="terms" type="checkbox" value=""
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 " >
        </div>
        <label for="terms" class="ml-2 text-sm font-medium text-gray-900 ">I agree with the <a href="#"
            class="text-blue-600 hover:underline ">terms and conditions</a></label>
      </div> -->
      <button type="submit"
        class="text-white bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-cente">Authorize</button>
    </form>
  </section>
</template>
