<template>
    <aside id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen py-10 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 "
        aria-label="Sidebar">
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white ">
            <ul class="space-y-2">
                <li>
                    <NuxtLink data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar"
                        aria-controls="logo-sidebar" type="button" to="/"
                        class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ">
                        <UserIcon class="w-6 h-6 text-gray-600"/>
                        <span class="ml-3">Authorize</span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar"
                        aria-controls="logo-sidebar" type="button" to="/inbox" @click="handleIndex"
                        class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ">
                        <svg aria-hidden="true"
                            class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 "
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z">
                            </path>
                            <path
                                d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z">
                            </path>
                        </svg>
                        <span class="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/sent" @click="handleIndex('sent')"
                        class="flex items-center w-full gap-3 p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 "
                        aria-controls="dropdown-example1" data-collapse-toggle="dropdown-example1">
                        <ArrowUpTrayIcon class="w-6 h-6 text-gray-500" />
                        Sent Box
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script setup>
import { ArrowUpTrayIcon,UserIcon } from '@heroicons/vue/24/solid'
let inboxIndex 
let sentIndex
onMounted(() => {
    inboxIndex = useState('inboxPageIndex')
    sentIndex = useState('sentPageIndex')
})
function handleIndex(to){
    if(to==='sent'){
        sentIndex._object.$ssentPageIndex=0
        return
    }
    inboxIndex._object.$sinboxPageIndex=0
}
</script>