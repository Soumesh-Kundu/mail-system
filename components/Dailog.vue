<template>
    <div :id="`${modalId}`" tabindex="-1"
        class="fixed top-0 left-0 right-0 z-50 hidden max-h-full p-4 overflow-x-hidden overflow-y-auto bg-gray-500 bg-opacity-50 md:inset-0 ">
        <div class="relative w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow">
                <button type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center "
                    :data-modal-hide="`${modalId}`">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="p-6 text-center">
                    <h3 class="my-5 text-lg font-normal text-gray-500 ">{{ modalMessage }}</h3>
                    <button :data-modal-hide="`${modalId}`" type="button" @click="()=>{
                        emit('onYes')
                    }"
                        class="text-white bg-blue-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                        {{ yesMessage }}
                    </button>
                    <button :data-modal-hide="`${modalId}`" type="button"
                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 ">{{ noMessage }}</button>
            </div>
        </div>
    </div>
</div></template>

<script setup>
import { initModals } from 'flowbite';

const {yesMessage,noMessage,modalId,modalMessage}=defineProps(['yesMessage','noMessage','modalId','modalMessage'])

const emit=defineEmits(['onYes'])
onMounted(()=>{
    initModals()
})
</script>