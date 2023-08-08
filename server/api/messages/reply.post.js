import { replyMail } from "../../gmail"

export default defineEventHandler(async (event) => {
    try {
        const body=await readMultipartFormData(event)
        const {threadId}=getQuery(event)
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
        requestObj.from={
            name:"Soumesh Kundu",
            email:"iamsoumo26@gmail.com"
        }
        await replyMail(requestObj,threadId)
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