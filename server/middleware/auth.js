import JWT from 'jsonwebtoken'

export default defineEventHandler((event) => {
    if(/api\/messages/.test(getRequestURL(event))){
        const token=getCookie(event,'authToken')
        if(token===undefined){
            setResponseStatus(401)
            return {
                error:"Unauthorized"
            }
        }
        const user=JWT.verify(token,useRuntimeConfig().jwtSecret)
        event.context.user=user.id
    }
})