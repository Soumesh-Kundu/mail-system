<template>
    <div class='flex flex-col h-full'>
        <div
            class='fixed top-0 left-0 flex justify-between w-full px-2 py-4 bg-white border-b md:ml-64 -translate-y-0 md:px-5'>
            <section class='flex items-center gap-3 text-gray-600'>
                <NuxtLink to='/inbox'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke="currentColor" class="w-6 h-6 mr-3">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                    </svg>
                </NuxtLink>
                <ClockIcon class="w-6 h-6 cursor-pointer" />
                <ExclamationCircleIcon class="w-6 h-6 text-red-600 cursor-pointer" />
                <ArchiveBoxIcon class="w-6 h-6 text-blue-400 cursor-pointer" />
                <TagIcon class="w-6 h-6 cursor-pointer" />
                <p class='font-bold' v-if="!isLoading">{{ FormatDate(detailData?.date) }}</p>
            </section>
        </div>
        <div v-if="!isLoading" class='pb-5 mt-12 grow'>
            <div class="bg-gray-100">
                <section class='flex items-center gap-2 pt-3 mx-2 md:mx-5'>
                    <div>
                        <p class='font-bold text-black'>{{ detailData?.from?.split(/<|>/)[0] }} <span
                                    class="text-sm text-gray-600">&lt;{{ detailData?.from?.split(/<|>/)[1] }}&gt;</span></p>
                    </div>
                </section>
                <a ref="downloadRef" hidden></a>
                <section class='px-2 pb-3 md:px-5'>
                    <h2 class='py-5 text-lg font-bold md:text-2xl'>{{ detailData?.subject }}</h2>
                    <p v-html="detailData?.body?.html"></p>
                    <br v-if="detailData?.attachments?.length > 0">
                    <span v-if="detailData?.attachments?.length > 0" class="pt-5 font-semibold">attachments:</span>
                    <div v-if="detailData?.attachments?.length > 0" class="flex flex-wrap gap-3 mt-5">
                        <div class="flex items-center gap-2 px-2 py-1 bg-gray-300 rounded-full"
                            v-for="(file, index) in detailData?.attachments" :key="index">
                            <component :is="iconMap.get(typeFinder(file.type))" class="w-5 h-5" /> {{ file.filename }}
                            <button @click="downloadFIle({ ...file, messageId: detailData.messageId })"
                                class="p-1.5 rounded-full hover:bg-white duration-200">
                                <ArrowDownTrayIcon class="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </section>
            </div>
            <div v-for="(item, index) in detailData?.replyAndForwards" :key="index" class="py-5"
                :class="{ 'bg-gray-100': (index + 1) % 2 === 0, 'bg-white': (index + 1) % 2 !== 0 }">
                <section class='flex items-center gap-2 pt-3 mx-2 md:mx-5'>
                    <div>
                        <p class='font-bold'>{{ item.from.split(/<|>/)[0] }} <span class="text-sm text-gray-600">&lt;{{
                            item.from.split(/<|>/)[1] }}&gt;</span></p>
                    </div>
                </section>
                <section class='px-2 py-3 md:px-5'>
                    <p v-html="item.body.html"></p>
                    <br v-if="item?.attachments?.length > 0">
                    <span v-if="item?.attachments?.length > 0" class="font-semibold">attachments:</span>
                    <div v-if="item?.attachments?.length > 0" class="flex flex-wrap gap-3 mt-5">
                        <div class="flex items-center gap-2 px-2 py-1 bg-gray-300 rounded-full"
                            v-for="(file, index) in item.attachments" :key="index">
                            <component :is="iconMap.get(typeFinder(file?.type))" class="w-5 h-5" /> {{ file.name }}

                            <button @click="downloadFIle({ ...file, messageId: detailData.messageId })"
                                class="p-1.5 rounded-full hover:bg-white duration-200">
                                <ArrowDownTrayIcon class="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <div v-else class="mt-12 grow">
            <SkeletonContent />
        </div>
        <div class="sticky bottom-0 left-0 w-full bg-white">
            <Reply v-if="replyOn || forwardOn" :replyOn="replyOn" :forwardOn="forwardOn"
                class="absolute top-0 left-0 -translate-y-full" />
            <div class='flex items-center w-full px-2 py-3 border-y md:px-5'>
                <button v-if="replyOn || forwardOn" type="button" @click="() => {
                    const replyOrForward = {
                        ...data, name: 'Test user', from: 'test@gmail.com', id: nanoid(), image: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                    }
                    detailData.replyAndForwards.push(replyOrForward)
                    data = { ...emptyData }
                    data.attachments = []
                    if (replyOn) replyOn = false
                    if (forwardOn) forwardOn = false
                    return
                }"
                    class="text-white items-center  bg-blue-700 hover:bg-blue-800 focus:ring-0 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-3  focus:outline-none flex ">
                    <div class="flex items-center gap-2">
                        <PaperAirplaneIcon class="w-4 h-4" />
                        Send
                    </div>
                </button>
                <button v-else type="button" @click="() => {
                    if (!replyOn) {
                        data.to = detailData.from
                        replyOn = true
                        replyText(detailData)
                        return
                    };
                }"
                    class="text-white items-center  bg-blue-700 hover:bg-blue-800 focus:ring-0 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-3  focus:outline-none flex ">

                    <div class="flex items-center gap-2">
                        <ArrowUturnLeftIcon class="w-4 h-4" />
                        Reply
                    </div>
                </button>
                <button type="button"
                    class="flex items-center px-5 py-2 mr-6 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                    @click="() => {
                        if (replyOn || forwardOn) {
                            data = { ...emptyData }
                            data.attachments = []
                        }
                        if (replyOn) return replyOn = false
                        if (forwardOn) return forwardOn = false
                        forwardText(detailData)
                        forwardOn = true
                    }">
                    <div v-if="replyOn || forwardOn" class="flex items-center gap-2">
                        Cancel
                    </div>
                    <div v-else class="flex items-center gap-2">
                        <ArrowRightIcon class="w-4 h-4" />
                        Forward
                    </div>
                </button>
                <div v-if="replyOn || forwardOn" class="flex items-center gap-3 text-gray-500">
                    <FaceSmileIcon class="w-6 h-6 cursor-pointer" />
                    <label for="attachments">
                        <PaperClipIcon class="w-6 h-6 cursor-pointer" />
                    </label>
                    <PrinterIcon class="w-6 h-6 cursor-pointer" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ClockIcon, TagIcon, ExclamationCircleIcon, ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon, ArrowUturnLeftIcon, PaperClipIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline'
import { ArchiveBoxIcon, PaperAirplaneIcon, TrashIcon, FaceSmileIcon, PrinterIcon } from '@heroicons/vue/24/solid'
import { nanoid } from 'nanoid'
import {Buffer} from 'buffer'

const downloadRef = ref(null)
const id = useRoute().params.id
const detailData = ref()
const isLoading = ref(true)
onMounted(async () => {
    const res = await fetch(`/api/messages/${id}`)
    detailData.value = await res.json()
    isLoading.value = false
})
const replyOn = ref(false)
const forwardOn = ref(false)
const emptyData = {
    to: "",
    body: "",
    attachments: []
}
async function sendReplyOrForward(sendingObj){
    const formData=new FormData()
    formData.append('to',data.value.to)
    formData.append('subject',detailData.value.subject)
    formData.append('body',`<div>${data.value.body}</div>`)
    formData.append('messageId',detailData.value.messageId)
    for(const file of data.value.attachments){
        formData.append('file',file,file.filename)
    }
    await useFetch(`/api/messages/reply?threadId=${id}`,{
        method:"POST",
        body:formData
    })
}
function replyText(object) {
    data.value.body = `\n\n\n\n\nOn ${FormatDate(object.date)} ${object.from.split(/<|>/)[0]} <${object.from.split(/<|>/)[1]}> wrote:\n    ${object.body.text.slice(0, 150)}${object.body.text.length < 150 ? "" : "..."}`
    return
}
async function downloadFIle(fileObj) {
    const {data} = await useFetch(`/api/messages/attachment?attachmentId=${fileObj.attachmentId}&messageId=${fileObj.messageId}&filename=${fileObj.filename}`)

    const Filedata= new Uint8Array(new Buffer.from(data.value.data,'base64'))
    const file=new File([Filedata],fileObj.filename,{type:fileObj.type})
    const url=URL.createObjectURL(file)
    downloadRef.value.href = url
    downloadRef.value.download =fileObj.filename
    downloadRef.value.click()
}
function forwardText(object) {
    data.value.body = `write here...\n\n\n\n-------Forwarded Message-------\nFrom: ${object.from.split(/<|>/)[0]} <${object.from.split(/<|>/)[1]}>\nDate: ${FormatDate(object.date)}\nSubject: ${object.subject}\nTo: ${object.to}\n\n
    ${object.body.text}`
    return
}
const data = useState('replyData', () => ({ ...emptyData }))


</script>

<style lang="scss" scoped></style>