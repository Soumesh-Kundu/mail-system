import { fetchMailById } from "../../gmail"
import { useRealm } from "../../realm"
import {ObjectID} from 'bson'

export default defineEventHandler(async (event)=>{
    try {
        const {mongo}=useRealm()
        const userCollection=mongo
        const threadId=event.context.params.id
        const id=event.context.user
        const {client_id,client_secret,refresh_token}=await userCollection.findOne({_id:ObjectID(id)})
        const creds={client_id,client_secret,refresh_token}
        const res=await fetchMailById(threadId,creds)
        return res

    } catch (error) {
        console.log(error)
        setResponseStatus(event,500)
        return{
            error:"Server Error"
        }
    }
})