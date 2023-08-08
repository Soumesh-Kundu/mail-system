import { fetchMailById } from "../../gmail"

export default defineEventHandler(async (event)=>{
    try {
        const id=event.context.params.id
        const res=await fetchMailById(id)
        return res
        
    } catch (error) {
        console.log(error)
        setResponseStatus(event,500)
        return{
            error:"Server Error"
        }
    }
})