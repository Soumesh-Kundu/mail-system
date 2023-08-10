<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const { inboxData } = useDummyData()
const deletingIndexes = useState('deleteIndex')
const currentPageIndex = useState('inboxPageIndex', () => 0)
const pageTokens = useState('inboxToken', () => new Set([null]))
console.log(currentPageIndex)
const MailSended = useState('mailSended')
deletingIndexes.value = []
const isLoading = ref(false)
async function fetchmails(token = undefined) {
    isLoading.value = true
    let data
    if (currentPageIndex.value === 0) {
        data = await useFetch('/api/messages?type=INBOX');
    }
    else {
        const token = Array.from(pageTokens.value)[currentPageIndex.value]
        data = await useFetch(`/api/messages?type=INBOX&pageToken=${token}`);
    }
    inboxData.value = data.data.value.mails
    const pageToken = data.data.value.pageToken
    if (pageToken) {
        pageTokens.value.add(pageToken)
    }
    else {
        pageTokens.value.add(null)
    }
    isLoading.value = false
}
fetchmails()
async function fetchNextOrPrevPage(e, Prev = false) {
    isLoading.value = true
    let data
    if (Prev && currentPageIndex.value < 2) {
        data = await useFetch('/api/messages?type=INBOX');
        if (currentPageIndex.value !== 0) {
            currentPageIndex.value--
        }
    }
    else if (Prev && currentPageIndex.value >= 2) {
        const prevIndex = currentPageIndex.value - 1
        const token = Array.from(pageTokens.value)[prevIndex]
        data = await useFetch(`/api/messages?type=INBOX&pageToken=${token}`);
        currentPageIndex.value--
    }
    else {
        const prevIndex = currentPageIndex.value + 1
        const token = Array.from(pageTokens.value)[prevIndex]
        if (!token) {
            toast('All mails are retrived')
            isLoading.value = false
            return
        }
        data = await useFetch(`/api/messages?type=INBOX&pageToken=${token}`);
        pageTokens.value.add(data.data.value.pageToken)
        currentPageIndex.value++
    }
    inboxData.value = data.data.value.mails
    isLoading.value = false
}
onMounted(() => {
    if (MailSended.value) {
        console.log('hello')
        toast.info("Sending Mail, please wait...")
        MailSended.value = false
    }
})
function addIndexToModify(id) {
    console.log(id)
    if (deletingIndexes.value.includes(id)) {
        deletingIndexes.value = deletingIndexes.value.filter(item => item !== id)
        return
    }
    deletingIndexes.value.push(id)
}
async function deleteMails() {
    const ids = deletingIndexes.value
    const allResolve = await Promise.all(ids.map(async (id) => {
        const res = await fetch(`/api/messages/${id}`, {
            method: "DELETE"
        })
        const data = await res.json()
        return data
    }))
    toast.success("Mails deleted")
    deletingIndexes.value = []
    await fetchmails()
}
</script>

<template>
    <InboxHeader :refresh="fetchmails" :nextOrPrevMail="fetchNextOrPrevPage" :currentPage="currentPageIndex" />
    <h2
        class="fixed top-0 left-0 z-40 w-full px-5 py-1.5 md:ml-64 text-2xl font-bold bg-white mt-14 border-b border-b-gray-200">
        Inbox</h2>
    <div v-if="inboxData.length > 0 && !isLoading" class="relative mt-24 overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-left ">
            <tbody>
                <td v-for="(item, index) in inboxData" :key="item.threadId"
                    class='flex items-center justify-between px-2 py-5 border-b cursor-pointer md:px-5 hover:bg-gray-100'>
                    <div class='flex items-center gap-2'>
                        <input id="default-checkbox" type="checkbox" :checked="deletingIndexes.includes(item.threadId)"
                            @change="addIndexToModify(item.threadId)"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                        <NuxtLink :to="`/inbox/${item.threadId}`" class="flex items-center justify-between w-full gap-3">
                            <h3 class='flex font-bold text-black '><span class="w-44">{{
                                item?.from?.split(/<|>/)[0]
                            }}</span></h3>
                            <p class='flex items-center ml-5 font-semibold text-gray-500 truncate'>{{ item.subject }}
                            </p>
                        </NuxtLink>
                    </div>
                    <p class='flex font-semibold whitespace-nowrap'>{{ `${FormatDate(item.date)}` }}</p>
                </td>

            </tbody>
        </table>
    </div>
    <div v-if="!isLoading && inboxData.length < 1"
        class="max-w-sm mx-auto my-10 mt-24 text-3xl font-semibold text-gray-500">
        <h3>No mail yet</h3>
    </div>
    <div v-if="isLoading" class="mt-24">
        <SkeletonList />
    </div>
    <Dailog modalId="DeleteDailog" yesMessage="Yes, Delete" noMessage="No, Cancel"
        modalMessage="Do you Really want to delete this mails?" @onYes="deleteMails" />
</template>