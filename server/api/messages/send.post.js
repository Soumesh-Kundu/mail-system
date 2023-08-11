import { sendMail } from "../../gmail"
import { useRealm } from "../../realm"
import {ObjectID} from 'bson'

export default defineEventHandler(async (event) => {
    try {
        const id=event.context.user
        const {mongo}=useRealm()
        const userCollection=mongo
        const body=await readMultipartFormData(event)
        const requestObj=body.reduce((acc,item)=>{
            if(item.name!=='file'){
                acc[item.name]=new Buffer.from(item.data).toString()
            }
            return acc
        },{})
        requestObj.files=body.filter(item=>item.name==='file')
        requestObj.files=requestObj.files.map(item=>{
            return {
                filename:item.filename,
                encoding:'base64',
                content:new Buffer.from(item.data).toString('base64url')
            }
        })
        const {client_id,client_secret,refresh_token,name,email}=await userCollection.findOne({_id:ObjectID(id)})
        requestObj.from={
            name,
            email
        }
        const creds={client_id,client_secret,refresh_token}
        await sendMail(requestObj,creds)
        return {
            message:'sent'
        }
    } catch (error) {
        console.log(error)
        setResponseStatus(event, 500)
        return {
            error: "Server Error"
        }
    }
})