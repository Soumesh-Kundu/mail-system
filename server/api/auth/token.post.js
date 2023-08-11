import { getToken,getProfile } from "../../gmail"
import { useRealm } from "../../realm"
import JWT from 'jsonwebtoken'

export default defineEventHandler( async (event)=>{
    try {
        const {mongo}=useRealm()
        const userCollection=mongo
        const {code}=getQuery(event)
        const {email}=await readBody(event)
        const {_id,client_id,client_secret}=await userCollection.findOne({email})
        const refresh_token=await getToken({client_id,client_secret,code})
        await userCollection.findOneAndUpdate({_id},{$set:{refresh_token}})
        const authToken=JWT.sign({
            id:_id.toString()
        },useRuntimeConfig().jwtSecret)
        setCookie(event,'authToken',authToken)
        return 
    } catch (error) {
        console.log(error)
        setResponseStatus(event,500)
        return{
            error:"Server Error"
        }
    }
})