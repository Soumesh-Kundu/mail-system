import { writeFileSync } from "fs"
import { fetchAttachments } from "../../gmail"

export default defineEventHandler(async (event) => {
    try {
        const {attachmentId,messageId,filename}=getQuery(event)
        const res=await fetchAttachments(attachmentId,messageId)
        return res
    } catch (error) {
        console.log(error)
        setResponseStatus(event,500)
        return{
            error:"Server Error"
        }
    }
})