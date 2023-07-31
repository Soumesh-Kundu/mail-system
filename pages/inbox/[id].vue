<script setup>
import { ClockIcon, TagIcon, ExclamationCircleIcon, ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon, ArrowUturnLeftIcon, PaperClipIcon } from '@heroicons/vue/24/outline'
import { ArchiveBoxIcon, PaperAirplaneIcon, TrashIcon, FaceSmileIcon, PrinterIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/solid'
import {nanoid} from 'nanoid'

const id = useRoute().params.id
const { inboxData, sentInbox } = useDummyData()
const detailData = inboxData.value.find(item => item.id === id)
const replyOn = ref(false)
const forwardOn = ref(false)
const emptyData = {
    to: "",
    body: "",
    attachments: []
}
const data = useState('replyData', () => ({ ...emptyData }))

function replyText(object) {
    data.value.body = `\n\n\n\n\nOn ${FormatDate(object.date)} ${object.name} <${object.from}> wrote:\n    ${object.body.slice(0, 150)}...`
    return
}
function forwardText(object) {
    data.value.body = `write here...\n\n\n\n-------Forwarded Message-------\nFrom: ${object.name} <${object.from}\nDate: ${FormatDate(object.date)}\nSubject: ${object.subject}\nTo: ${object.to}\n\n
    ${object.body}`
    return
}
</script>

<template>
    <div class='flex flex-col h-full'>
        <div class='sticky top-0 right-0 flex justify-between px-2 py-4 bg-white border-b -translate-y-0 md:px-5'>
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
                <p class='font-bold'>{{ FormatDate(detailData.date) }}</p>
            </section>
            <section class='items-center hidden gap-2 text-gray-600 md:flex'>
                <ArrowUturnLeftIcon class="w-6 h-6" />
                <TrashIcon class="w-6 h-6 text-red-500" />
                <ChevronLeftIcon class="w-6 h-6" />
                <ChevronRightIcon class="w-6 h-6" />
            </section>
        </div>
        <div class='pb-5 grow'>
            <div class="bg-gray-100">
                <section class='flex items-center gap-2 pt-3 mx-2 md:mx-5'>
                    <img class="w-8 h-8 mr-1 rounded-full" :src="detailData.image" alt="Rounded avatar" />
                    <div>
                        <p class='font-bold'>{{ detailData.name }}</p>
                        <p class='text-gray-600'>{{ detailData.from }}</p>
                    </div>
                </section>
                <section class='px-2 pb-3 md:px-5'>
                    <h2 class='py-5 text-lg font-bold md:text-2xl'>{{ detailData.subject }}</h2>
                    <p class='mb-3 text-gray-800' v-for="(para, index) in detailData.body.split('\n')" :key="index">{{ para
                    }}</p>
                    <br v-if="detailData?.attachments?.length>0">
                    <span  v-if="detailData?.attachments?.length>0" class="font-semibold">attachments:</span>
                    <div v-if="detailData?.attachments?.length>0" class="flex flex-wrap gap-3 mt-5">
                        <div class="flex items-center gap-2 px-2 py-1 bg-gray-300 rounded-full"
                            v-for="(file, index) in detailData.attachments" :key="index">
                            <component :is="iconMap.get(typeFinder(file.type))" class="w-5 h-5" /> {{ file.name }}
                            <a :href="getFileUrl(file)" :download="file.name" class="p-1.5 rounded-full hover:bg-white duration-200" >
                                <ArrowDownTrayIcon class="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                    <p class='mt-5 font-medium'>Best Regards,</p>
                    <p class='font-medium '>{{ detailData.name }}, CEO Themesberg LLC</p>
                </section>
            </div>
            <div v-for="(item, index) in detailData.replyAndForwards" :key="index"
                :class="{ 'bg-gray-100': (index + 1) % 2 === 0, 'bg-white': (index + 1) % 2 !== 0 }">
                <section class='flex items-center gap-2 pt-3 mx-2 md:mx-5'>
                    <img class="w-8 h-8 mr-1 rounded-full" :src="item.image" alt="Rounded avatar" />
                    <div>
                        <p class='font-bold'>{{ item.name }}</p>
                        <p class='text-gray-600'>{{ item.from }}</p>
                    </div>
                </section>
                <section class='px-2 py-3 md:px-5'>
                    <p class='text-gray-800 ' v-for="(para, index) in item.body.split('\n')" :key="index">
                        <span v-if="para.length">{{ para }}</span>
                        <span v-else>
                            <br>
                        </span>
                    </p>
                    <br v-if="item?.attachments?.length>0">
                    <span v-if="item?.attachments?.length>0" class="font-semibold">attachments:</span>
                    <div v-if="item?.attachments?.length>0" class="flex flex-wrap gap-3 mt-5">
                        <div class="flex items-center gap-2 px-2 py-1 bg-gray-300 rounded-full"
                            v-for="(file, index) in item.attachments" :key="index">
                            <component :is="iconMap.get(typeFinder(file.type))" class="w-5 h-5" /> {{ file.name }}
                            <a :href="getFileUrl(file)" :download="file.name" class="p-1.5 rounded-full hover:bg-white duration-200" >
                                <ArrowDownTrayIcon class="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                    <p class='mt-5 font-medium'>Best Regards,</p>
                    <p class='font-medium '>{{ item.name }}, CEO Themesberg LLC</p>
                </section>
            </div>
        </div>
        <div class="sticky bottom-0 left-0 w-full bg-white">
            <Reply v-if="replyOn || forwardOn" :replyOn="replyOn" :forwardOn="forwardOn"
                class="absolute top-0 left-0 -translate-y-full" />
            <div class='flex items-center w-full px-2 py-3 border-y md:px-5'>
                <button v-if="replyOn || forwardOn" type="button" @click="() => {
                    const replyOrForward = {
                        ...data, name: 'Test user', from: 'test@gmail.com', id:nanoid(), date: new Date().toISOString(), image: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',subject:detailData.subject
                    }
                    detailData.replyAndForwards.push(replyOrForward)
                    sentInbox.push(detailData)
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