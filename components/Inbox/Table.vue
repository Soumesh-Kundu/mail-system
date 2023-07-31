<template>
    <div v-if="inboxData.length > 0" class="relative mt-2 overflow-x-auto shadow-md sm:rounded-lg">
        <table  class="w-full text-left ">

            <tbody>
                <td v-for="(item, index) in inboxData" :key="item.id"
                    class='flex items-center justify-between px-2 py-2 border-b cursor-pointer md:px-5 hover:bg-gray-100'>
                    <div class='flex items-center gap-2'>
                        <input id="default-checkbox" type="checkbox" :checked="deletingIndexes.includes(item.id)"
                            @change="addIndexToModify(item.id)"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                        <StarIcon class="w-5 h-5" />
                        <NuxtLink :to="`/inbox/${item.id}`" class="flex items-center justify-between gap-3">
                            <img class="w-10 h-10 rounded-full" :src="item.image" alt="Rounded avatar" />
                            <h3 class='flex text-base font-bold text-black '><span class="w-20 truncate">{{ item.name
                            }}</span></h3>
                            <p class='flex ml-5 text-sm font-bold text-gray-500 truncate'>{{ item.subject }}</p>
                        </NuxtLink>
                    </div>
                    <p class='flex font-semibold whitespace-nowrap'>{{ `${FormatDate(item.date)}` }}</p>
                </td>

            </tbody>
        </table>
    </div>
    <div v-else class="max-w-sm mx-auto my-10 text-3xl font-semibold text-gray-500">
        <h3>No mail yet</h3>
    </div>
    <Dailog modalId="DeleteDailog" yesMessage="Yes, Delete" noMessage="No, Cancel"
        modalMessage="Do you Really want to delete this mails?" @onYes="deleteMails" />
</template>

<script setup>
import { StarIcon } from '@heroicons/vue/24/outline'
const { inboxData } = useDummyData()
const deletingIndexes = useState('deleteIndex')
deletingIndexes.value = []

function addIndexToModify(index) {
    if (deletingIndexes.value.includes(index)) {
        deletingIndexes.value = deletingIndexes.value.filter(item => item !== index)
        return
    }
    deletingIndexes.value.push(index)
}
function deleteMails() {
    for (const id of deletingIndexes.value) {
        const index = inboxData.value.findIndex(item => item.id === id)
        inboxData.value.splice(index, 1)
    }
    deletingIndexes.value = []
}
</script>
