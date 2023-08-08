import { deleteThread } from "../../gmail"

export default defineEventHandler(async (event) => {
    try {
        const threadId = event.context.params.id
        await deleteThread(threadId)
        return { message:"deleted" }
    } catch (error) {
        console.log(error)
        setResponseStatus(event, 500)
        return {
            error: "Server Error"
        }
    }
})