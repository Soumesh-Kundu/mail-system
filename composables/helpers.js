import {DocumentIcon,DocumentTextIcon,PhotoIcon,CodeBracketIcon} from '@heroicons/vue/24/outline'
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
export function getFileUrl(file){
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