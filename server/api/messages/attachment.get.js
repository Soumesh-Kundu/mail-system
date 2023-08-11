
import { fetchAttachments } from "../../gmail"
import { useRealm } from "../../realm"
import {ObjectID} from 'bson'

export default defineEventHandler(async (event) => {
    try {
        const id=event.context.user
        const {mongo}=useRealm()
        const userCollection=mongo
        const {attachmentId,messageId}=getQuery(event)
        const {client_id,client_secret,refresh_token}=await userCollection.findOne({_id:ObjectID(id)})
        const creds={client_id,client_secret,refresh_token}
        const res=await fetchAttachments(attachmentId,messageId,creds)
        return res
    } catch (error) {
        console.log(error)
        setResponseStatus(event,500)
        return{
            error:"Server Error"
        }
    }
})