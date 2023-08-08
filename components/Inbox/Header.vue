<template>
    <nav
        class="fixed top-0 left-0  z-20 flex items-center justify-between w-[80%] max-w-screen-2xl mx-auto py-3 md:ml-64 bg-white ">
        <div class="flex gap-2 items-center md:w-4/12 ml-3.5 ">
            <div class="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 ">
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
            </div>
            <button ref="buttonRef" type="button" data-modal-target="DeleteDailog" :disabled="isDeleteAvaible"
                data-modal-toggle="DeleteDailog">
                <TrashIcon class="w-6 h-6 text-red-500" />
            </button>
            <ArchiveBoxIcon class="w-6 h-6 text-blue-500" />

            <ExclamationCircleIcon class="w-6 h-6 text-red-500" />
            <EllipsisVerticalIcon class="w-6 h-6 text-gray-800" />
            <NuxtLink to="/inbox/new" type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 flex items-center cursor-pointer">
                <PlusIcon class="w-5 h-5 mr-2" />
                Compose
            </NuxtLink>
            <button type='button' class="p-2 duration-200 rounded-full hover:bg-slate-300" @click="refresh">
                <ArrowPathIcon class="w-5 h-5" />
            </button>
        </div>
    </nav>
</template>

<script setup>
import { TrashIcon, ArchiveBoxIcon } from '@heroicons/vue/24/solid';
import { ExclamationCircleIcon, EllipsisVerticalIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';

const { refresh } = defineProps(['refresh'])

const deletingIndexes = useState('deleteIndex')
const buttonRef = ref(null)
const isDeleteAvaible = computed(() => deletingIndexes?.value?.length === 0)

onMounted(() => {
    buttonRef.value.disabled = true
})
</script>

<style lang="scss" scoped></style>