<template>
    <div class="flex flex-col justify-center w-full bg-white ">
        <div
            class="flex items-center gap-1 md:gap-2  md:mx-5 px-5 mt-2 py-0.5 mb-2 border border-gray-200 rounded-lg bg-gray-50 md:px-5 ">
            to <input v-model="inputs.to" :disabled="replyOn" ref="emailRef"
                class=" bg-inherit text-gray-900 text-sm  focus:outline-transparent   block w-full p-2.5 outline-none font-semibold"
                placeholder="john.doe@company.com" />
        </div>
        <div class="px-2 mb-2 md:px-5">
            <textarea rows="13" v-model="inputs.body" ref="TextRef"
                class="  text-gray-900 text-sm  focus:outline-0 rounded-lg block w-full p-2.5 "
                placeholder="body ..." />

        </div>
        <div class="px-2 my-2 md:px-5">
            <input type="file" class="hidden" id="attachments" @change="addFile" multiple />
        </div>
        <h4 v-if="inputs.attachments.length !== 0" class="px-2 text-lg font-semibold md:px-5">Attachments: </h4>
        <div v-if="inputs.attachments.length!==0" class="flex flex-wrap gap-3 px-2 my-5 md:px-5">
            <div class="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-full" v-for="(file, index) in inputs.attachments"
                :key="index">
                <component :is="iconMap.get(typeFinder(file.type))" class="w-5 h-5" /> {{ file.name }}
                <button class="p-1.5 rounded-full hover:bg-slate-300 duration-200" @click="cancelFile(index)">
                    <XMarkIcon class="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { CodeBracketIcon, DocumentIcon, DocumentTextIcon, PhotoIcon,XMarkIcon } from '@heroicons/vue/24/outline';
const {replyOn,forwardOn}=defineProps(['replyOn','forwardOn'])
const inputs = useState('replyData')
const TextRef=ref(null)
const emailRef=ref(null)
onMounted(()=>{
    if(replyOn){
        TextRef.value.focus()
        TextRef.value.setSelectionRange(0,0)
        TextRef.value.classList.add('h-48')
    }
    if(forwardOn){
        emailRef.value.focus()
        TextRef.value.classList.add('h-64')
    }
})

function addFile(e) {
    const attachments = e.target.files || e.dataTransfer.files
    if (!attachments.length) return
    for (const file of attachments){
        inputs.value.attachments.push(file)
    }
}
function typeFinder(type){
    const docRegex=/docx|xlsx|pdf|ashx|txt|ppt|pptx|xls|doc|odt|ods/
    const codeRegex=/c|cpp|js|ts|py|java|json|xml/
    const imageRegex=/jpg|jpeg|png|svg|gif|raw|ai|webp/
    if(docRegex.test(type)){
        return 'docs'
    }
    if(imageRegex.test(type)){
        return 'image'
    }
    if(codeRegex.test(type)){
        return 'code'
    }
    return 'doc'
}
function cancelFile(index){
    inputs.value.attachments.splice(index,1)
}
const iconMap=new Map([
    ['docs',DocumentTextIcon],
    ['doc',DocumentIcon],
    ['code',CodeBracketIcon],
    ['image',PhotoIcon],
])
</script>

<style lang="scss" scoped></style>