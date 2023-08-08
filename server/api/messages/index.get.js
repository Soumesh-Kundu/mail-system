import { fetchMails } from "../../gmail"

export default defineEventHandler(async (event)=>{
    try {
        console.log('hited')
        const {pageToken,type}=getQuery(event)
        const options={
            userId:'me',
            labelIds:[type],
            maxResults:15,
        }
        if(type==='INBOX'){
           options.q='category:primary'
        }
        if(pageToken){
            options.pageToken=pageToken
        }
        const res=await fetchMails(options)
        return res
        
    } catch (error) {
        console.log(error)
        setResponseStatus(event,500)
        return{
            error:"Server Error"
        }
    }
})