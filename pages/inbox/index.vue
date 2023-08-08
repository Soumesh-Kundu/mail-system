<script setup>
import { StarIcon } from '@heroicons/vue/24/outline'
const { inboxData } = useDummyData()
const pageToken = useState('pageInboxToken', () => "")
const deletingIndexes = useState('deleteIndex')
deletingIndexes.value = []
const isLoading=ref(false)
async function fetchmails() {
    isLoading.value=true
    const {data,refresh} = await useFetch('/api/messages?type=INBOX');
    inboxData.value = data.value.mails
    pageToken.value = data.value.pageToken
    isLoading.value=false
    return {refresh,pending}
}
fetchmails()  

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

<template>
    <InboxHeader />
    <h2 class="fixed top-0 left-0 z-40 w-full px-5 py-1.5 md:ml-64 text-2xl font-bold bg-white mt-14 border-b border-b-gray-200">Inbox</h2>
    <div v-if="inboxData.length > 0 && !isLoading" class="relative mt-24 overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-left ">
            <tbody>
                <td v-for="(item, index) in inboxData" :key="item.threadId"
                    class='flex items-center justify-between px-2 py-5 border-b cursor-pointer md:px-5 hover:bg-gray-100'>
                    <div class='flex items-center gap-2'>
                        <input id="default-checkbox" type="checkbox" :checked="deletingIndexes.includes(item.id)"
                            @change="addIndexToModify(item.id)"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                        <StarIcon class="w-5 h-5" />
                        <NuxtLink :to="`/inbox/${item.threadId}`" class="flex items-center justify-between w-full gap-3">
                            <h3 class='flex text-base font-bold text-black '><span class="truncate w-28">{{
                                item?.from?.split(/<|>/)[0]
                            }}</span></h3>
                            <p class='flex items-center ml-5 text-base font-bold text-gray-800 truncate'>{{ item.subject }}
                            </p>
                        </NuxtLink>
                    </div>
                    <p class='flex font-semibold whitespace-nowrap'>{{ `${FormatDate(item.date)}` }}</p>
                </td>

            </tbody>
        </table>
    </div>
    <div v-if="!isLoading && inboxData.length<1" class="max-w-sm mx-auto my-10 mt-24 text-3xl font-semibold text-gray-500">
        <h3>No mail yet</h3>
    </div>
    <div v-if="isLoading" class="mt-24">
        <SkeletonList />
    </div>
    <Dailog modalId="DeleteDailog" yesMessage="Yes, Delete" noMessage="No, Cancel"
        modalMessage="Do you Really want to delete this mails?" @onYes="deleteMails" />
</template>