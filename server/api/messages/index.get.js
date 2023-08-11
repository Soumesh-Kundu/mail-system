import { fetchMails } from "../../gmail"
import { useRealm } from "../../realm"
import {ObjectID} from 'bson'

export default defineEventHandler(async (event)=>{
    try {
        const id=event.context.user
        const {mongo}=useRealm()
        const userCollection=mongo
        const {pageToken,type}=getQuery(event)
        const options={
            userId:'me',
            labelIds:[type],
            maxResults:25,
        }
        if(type==='INBOX'){
           options.q='category:primary'
        }
        if(pageToken){
            options.pageToken=pageToken
        }
        const {client_id,client_secret,refresh_token}=await userCollection.findOne({_id:ObjectID(id)})
        const creds={client_id,client_secret,refresh_token}
        const res=await fetchMails(options,creds)
        return res
        
    } catch (error) {
        console.log(error)
        setResponseStatus(event,500)
        return{
            error:"Server Error"
        }
    }
})