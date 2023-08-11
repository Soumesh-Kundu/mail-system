import { getAuthUrl } from "../../gmail"
import { useRealm,getServerUser } from "../../realm"

export default defineEventHandler( async (event)=>{
    try {
        const {app}=useRealm()
        let user=app.currentUser
        if(!user){
            user=await getServerUser()
        }
        const mongo=user.mongoClient('mongodb-atlas').db(useRuntimeConfig().db).collection(useRuntimeConfig().collection);
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