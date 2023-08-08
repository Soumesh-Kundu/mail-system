import {DocumentIcon,DocumentTextIcon,PhotoIcon,CodeBracketIcon} from '@heroicons/vue/24/outline'
import { Buffer } from 'buffer'

export function FormatDate(date){
    const newDate=new Date(date)
    const currentDate=new Date()
    if(currentDate.toLocaleDateString()===newDate.toLocaleDateString()){
        return `Today, ${newDate.toLocaleTimeString('en-us',{timeStyle:'short'})}`
    }
    if((currentDate.getDate()===newDate.getDate() +1) && currentDate.getMonth()===newDate.getMonth() && newDate.getFullYear()==currentDate.getFullYear()){
        return `Yesterday, ${newDate.toLocaleTimeString('en-us',{timeStyle:'short'})}`
    }
    return `${newDate.getDate()} ${newDate.toLocaleString('en-us',{month:'short'})}, ${newDate.getFullYear() } ${newDate.toLocaleTimeString('en-us',{timeStyle:'short'})}`
}

export const iconMap = new Map([
    ['docs', DocumentTextIcon],
    ['doc', DocumentIcon],
    ['code', CodeBracketIcon],
    ['image', PhotoIcon],
])
export async function getFileUrl(fileObj){
    // console.log(fileObj)
    const {data}=await useFetch(`/api/messages/attachment?attachmentId=${fileObj.attachmentId}&messageId=${fileObj.messageId}`)
    const uin8Data=new Uint8Array(Buffer.from(data?.value.data,'base64'))
    const file=new File(uin8Data,fileObj.filename,{type:fileObj.type})
    return URL.createObjectURL(file)
}
export function typeFinder(type) {
    const docRegex = /docx|xlsx|pdf|ashx|txt|ppt|pptx|xls|doc|odt|ods/
    const codeRegex = /c|cpp|js|ts|py|java|json|xml/
    const imageRegex = /jpg|jpeg|png|svg|gif|raw|ai|webp/
    if (docRegex.test(type)) {
        return 'docs'
    }
    if (imageRegex.test(type)) {
        return 'image'
    }
    if (codeRegex.test(type)) {
        return 'code'
    }
    return 'doc'
}

export function base64urlToSring(str){
    console.log(str)
    return new Buffer.from(str,'base64url').toString()
}