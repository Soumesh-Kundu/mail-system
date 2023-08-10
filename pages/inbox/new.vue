<template>
    <div class="flex flex-col h-full">
        <section class='flex items-center justify-between pt-3 pb-4 border-b'>
            <div class='flex items-center px-2 md:px-5'>
                <NuxtLink to='/inbox' class='mr-5'>
                    <ArrowLeftIcon class="w-6 h-6" />
                </NuxtLink>
                <p class='text-lg text-gray-600'>New Message</p>
            </div>
            <div class='flex items-center px-2 md:px-5'>
                <button data-modal-target="DraftDailog" data-modal-toggle="DraftDailog">
                    <TrashIcon class="w-6 h-6 mr-3 text-red-500" />
                </button>
                <ChevronLeftIcon class="w-6 h-6 mr-2" />
                <ChevronRightIcon class="w-6 h-6" />
            </div>
        </section>
        <section class='px-2 mt-8 md:px-5 grow'>
            <input type="email" id="email" v-model="inputs.to" @blur="onBlurEmail" :class="{ '!border-red-500': !valid }"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5  outline-none "
                placeholder="To" required />
            <span class="text-sm font-medium text-red-500" :class="{ 'visible': !valid, 'invisible': valid }">Email is
                not
                valid</span>
            <input type="text" id="subject" v-model="inputs.subject"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5  mb-5 outline-none"
                placeholder="Subject" required />
            <textarea rows="8" id="body" v-model="inputs.body"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5  mb-8 outline-none"
                placeholder="Write your text..." required> </textarea>
            <input type="file" multiple id="attachents-compose" hidden @change="onFileChange">
            <h4 v-if="inputs.attachments.length !== 0" class="text-lg font-semibold">Attachments: </h4>
            <div class="flex flex-wrap gap-3 mt-5">
                <div class="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-full"
                    v-for="(file, index) in inputs.attachments" :key="index">
                    <component :is="iconMap.get(typeFinder(file.type))" class="w-5 h-5" /> {{ file.name }}
                    <button class="p-1.5 rounded-full hover:bg-slate-300 duration-200" @click="cancelFile(index)">
                        <XMarkIcon class="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
        <div class='flex items-center px-2 mt-2 text-gray-700 md:px-5'>
            <button type="button" @click="sendMail"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  flex items-center gap-2 mr-5">Send
                <PaperAirplaneIcon class="w-5 h-5" />
            </button>
            <FaceSmileIcon class="w-8 h-8 p-1 mr-2 rounded-full cursor-pointer hover:bg-gray-300" />
            <label for="attachents-compose">
                <PaperClipIcon class="w-8 h-8 p-1 mr-2 rounded-full cursor-pointer hover:bg-gray-300" />
            </label>
            <PrinterIcon class="w-8 h-8 p-1 rounded-full cursor-pointer hover:bg-gray-300" />
        </div>
        <Dailog modalId="DraftDailog" yesMessage="Yes, Delete" noMessage="No, Cancel"
            modalMessage="Do you Really want to delete the current draft?" @onYes="clearInputs" />
    </div>
</template>

<script setup>
import { ArrowLeftIcon, PaperClipIcon, ChevronLeftIcon, ChevronRightIcon,  XMarkIcon } from '@heroicons/vue/24/outline';
import { PaperAirplaneIcon, FaceSmileIcon, PrinterIcon, TrashIcon } from '@heroicons/vue/24/solid';
import { nanoid } from 'nanoid'
// import {useToast} from 'vue-toastification'
import {toast} from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const valid = ref(true)
const MailSended=useState('mailSended',()=>false)
const { sentInbox } = useDummyData()
const emptyInputs = {
    to: "",
    subject: "",
    body: "",
}
const inputs = ref({ ...emptyInputs, attachments: [] })
function onFileChange(e) {
    const attachments = e.target.files || e.dataTrasfer.files
    if (!attachments.length) return
    for (const file of attachments){
        inputs.value.attachments.push(file)
    }
    return
}

async function sendMail() {
    if(!valid.value) return
    sentInbox.value.push({
        ...inputs.value, from: 'test@gmail.com', name: "Test user", id:nanoid(),
        date: new Date().toISOString(), image: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg', replyAndForwards: []
    })
    const formData=new FormData()
    formData.append('to',inputs.value.to)
    formData.append('subject',inputs.value.subject)
    formData.append('body',inputs.value.body)
    if(inputs.value.attachments.length>0)
    {
        for (const file of inputs.value.attachments){
            formData.append('file',file,file.filename)
        }
    }
    const res=await useFetch('/api/messages/send',{
        method:'POST',
        body:formData,
        onRequest(){
            if(inputs.value.attachments.length>0){
                MailSended.value=true
            }
            navigateTo('/inbox')
            clearInputs()
            navigateTo('/inbox')
        },
        onResponse(){
            toast.success('Mail send!')
        }
    })
}
function cancelFile(index) {
    inputs.value.attachments.splice(index, 1)
}
function clearInputs() {
    inputs.value = { ...emptyInputs, attachments: [] }
}
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
</script>
