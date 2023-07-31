<template>
    <div class="flex items-center justify-between gap-2 px-2.5 mt-5 md:mt-0">
        <div class="flex gap-2 items-center md:w-4/12 ml-3.5">
            <div class="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 ">
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
            </div>
            <button ref="buttonRef" type="button" data-modal-target="DeleteDailog" :disabled="isDeleteAvaible" data-modal-toggle="DeleteDailog">
                <TrashIcon  class="w-6 h-6 text-red-500"/>
            </button>
            <ArchiveBoxIcon class="w-6 h-6 text-blue-500"/>

           <ExclamationCircleIcon class="w-6 h-6 text-red-500"/>
            <EllipsisVerticalIcon class="w-6 h-6 text-gray-800"/> 
            <NuxtLink to="/inbox/new" type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 flex items-center cursor-pointer">
                <PlusIcon class="w-5 h-5 mr-2"/>
                Compose
            </NuxtLink>
        </div>
        <div class="hidden md:flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6 text-gray-600">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            <ChevronLeftIcon class="w-6 h-6 text-gray-600"/>
            <ChevronRightIcon class="w-6 h-6 text-gray-600"/>
            <p class="flex whitespace-nowrap">Show 1-10 of 2290</p>
        </div>
    </div>
</template>

<script setup>
import { TrashIcon,ArchiveBoxIcon } from '@heroicons/vue/24/solid';
import { ExclamationCircleIcon,EllipsisVerticalIcon,PlusIcon,ChevronLeftIcon,ChevronRightIcon } from '@heroicons/vue/24/outline';

const deletingIndexes=useState('deleteIndex')
const buttonRef=ref(null)
const isDeleteAvaible=computed(()=>deletingIndexes?.value?.length===0)

onMounted(()=>{
    buttonRef.value.disabled=true
})
</script>

<style lang="scss" scoped>

</style>