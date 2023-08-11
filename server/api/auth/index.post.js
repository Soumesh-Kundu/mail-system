import { getAuthUrl } from "../../gmail"
import { useRealm,getServerUser } from "../../realm"

export default defineEventHandler( async (event)=>{
    try {
        const {mongo}=useRealm()
        await getServerUser()
        const userCollection=mongo
        const {client_id,client_secret,name,email}=await readBody(event)
        const url=getAuthUrl(client_id,client_secret)
        await userCollection.findOneAndUpdate({email},{$set:{name,email,client_id,client_secret}},{upsert:true})
        return url 
    } catch (error) {
        console.log(error)
        setResponseStatus(event,500)
        return{
            error:"Server Error"
        }
    }
})