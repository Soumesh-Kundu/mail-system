import google from '@googleapis/gmail'
import Credentials from './credentials.json' assert {type: "json"}
import token from './token.json' assert {type: "json"}
import MailComposer from 'nodemailer/lib/mail-composer'

const { refresh_token } = token

const { client_id, client_secret, redirect_uris } = Credentials.web
const OAUTH2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
OAUTH2Client.setCredentials({ refresh_token })
const gmail = google.gmail({
    version: 'v1',
    auth: OAUTH2Client
})


async function makebody(message) {
    const obj = {
        to: message.to,
        from: `${message.from.name}<${message.from.email}>`,
        subject: message.subject,
        text: message.body,
        html: `<p>${message.body.replace(/\n/g,'<br>')}</p>`,
        textEncoding: 'base64',
    }
    obj.inReplyTo = message.messageId
    if (message.references !== undefined) {
        obj.references=message.messageId
    }
    if (message.files.length > 0) {
        obj.attachments = message.files
    }
    const body = new MailComposer(obj)
    const msg = await body.compile().build()
    const raw = new Buffer.from(msg)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    return raw
}

export async function sendMail(message) {
    const raw = await makebody(message)
    const { data: { id } } = await gmail.users.messages.send({
        userId: 'me',
        resource: {
            raw
        }
    })
    console.log(id)
}
export async function replyMail(message, threadId) {
    const raw = await makebody(message)
    const { data: { id } } = await gmail.users.messages.send({
        userId: 'me',
        resource: {
            raw, threadId
        },
        threadId
    })
    console.log(id)
}

export async function deleteThread(threadId) {
    const data = await gmail.users.threads.delete({
        userId: 'me',
        id: threadId
    })
    console.log(data.data)
}
export async function fetchMails(options) {
    const data = await gmail.users.messages.list(options)
    const messagesIds = data.data.messages
    const uniqueThreadIDs = Array.from(new Set(messagesIds.map(item => item.threadId)))
    const mailsPromises = uniqueThreadIDs.map(async (thread) => {
        const res = await gmail.users.threads.get({
            userId: 'me',
            id: thread,
            format: 'full'
        })
        const messages = res.data.messages.map((message) => {
            const headers = message.payload.headers
            const res = {
                id: message.id,
                to: headers.find(item => /To|to/.test(item.name))?.value ?? "",
                from: headers.find(item => /from|From/.test(item.name))?.value ?? "",
                subject: headers.find(item => /Subject|subject/.test(item.name))?.value ?? "",
                messageId: headers.find(item => /Message-ID|Message-Id/i.test(item.name))?.value ?? "",
                references: headers.find(item => /References|references/i.test(item.name))?.value ?? "",
                date: headers.find(item => item.name === 'Date')?.value ?? "",
            }
            return res
        })
        const initialMessage = messages[0]
        return { ...initialMessage, replyAndForwards: messages.slice(1), threadId: thread }
    })
    const mails = await Promise.all(mailsPromises)
    return {mails,pageToken:data.data.nextPageToken}
}


export async function fetchMailById(id){
    const res = await gmail.users.threads.get({
        userId: 'me',
        id,
        format: 'full'
    })
    const messages = res.data.messages.map((message) => {
        const headers = message.payload.headers
        const parts = message.payload.parts?.flatMap((item) => {
            if (/multipart\/alternative|multipart\/mixed/.test(item.mimeType)) {
                return item.parts
            }
            return item
        })
        const hasAttachments =parts?.find(item=>item.filename.length>0)?true:false
        const res = {
            id: message.id,
            to: headers.find(item => /To|to/.test(item.name))?.value ?? "",
            from: headers.find(item => /from|From/.test(item.name))?.value ?? "",
            subject: headers.find(item => /Subject|subject/.test(item.name))?.value ?? "",
            messageId: headers.find(item => /Message-ID|Message-Id/i.test(item.name))?.value ?? "",
            references: headers.find(item => /References|references/i.test(item.name))?.value ?? "",
            date: headers.find(item => item.name === 'Date')?.value ?? "",
        }
        if (parts === undefined && message.payload.body.size > 0) {
            res.body = { html:`<p>${base64urlToSring(message.payload.body.data).replace(/\n/g,'<br>')}</p>` }
            return res
        }
        if (hasAttachments) {
            const attachments = parts.filter(item=>!/text\/plain|text\/html/.test(item.mimeType))
            res.body = {
                text:base64urlToSring(parts?.find(item => item.mimeType === 'text/plain')?.body.data),
                html:base64urlToSring(parts?.find(item => item.mimeType === 'text/html')?.body.data)
            }
            res.attachments = attachments.map(item => {
                return {
                    filename: item.filename,
                    type: item.mimeType,
                    attachmentId: item.body.attachmentId
                }
            })
            return res
        }
        res.body = {
            text: base64urlToSring(parts?.find(item => item.mimeType === 'text/plain')?.body.data),
            html: base64urlToSring(parts?.find(item => item.mimeType === 'text/html')?.body.data)
        }
        return res
    })
    const initialMessage = messages[0]
    return { ...initialMessage, replyAndForwards: messages.slice(1), threadId: id }
}
export async function fetchAttachments(attachmentId, messageId) {
    const res = await gmail.users.messages.attachments.get({
        id: attachmentId, messageId, userId: 'me'
    })
    return res.data
}

function base64urlToSring(str){
    if(str===undefined){
        return str
    }
    return new Buffer.from(str,'base64url').toString('ascii')
}