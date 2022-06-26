import { Button, Layout, Row, Col, Card } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, {useState, useEffect, useMemo} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createMessage, getDateStringFromTimestamp } from '../util'
import { CONVOS } from '../util/constants'
import { getConversationClient } from '../util/xmtp'

const { Header, Footer, Sider, Content } = Layout;

export const createCompoundMessage = (address, text) => {
    return `${address.substr(0, 6)}** (${getDateStringFromTimestamp(new Date(), true)}): ${text}`
}

export default function ConversationList({provider, account}) {
    const {address} = useParams()
    const [messages, setMessages] = useState([])
    const [client ,setClient] = useState()
    const [conversations, setConversations] = useState(CONVOS)
    const [conversation, setConversation] = useState()
    const [loading ,setLoading] = useState(false)
    const [current, setCurrent] = useState()
    const navigate = useNavigate()

    async function initClient() {
        setClient(await getConversationClient(provider))
    }

    useEffect(() => {
        setMessages([])
    }, [address])

    useEffect(() => {
        initClient()
    }, [provider])

    async function getMessages() {
        console.log('get messages', address)
        const c = await client.newConversation(
            address
        )

        setConversation(c)

        // Load all messages in the conversation
        try {
            const ms = await c.messages()
            for await (const message of await conversation.streamMessages()) {
                const text = `[${message.senderAddress}]: ${message.text}`
                const type = message.senderAddress !== account ? 1 : 0;
                const message = createMessage(type, text)
                ms.push(message)
            }
            setMessages([])
        } catch (e) {

        }
    }

    async function sendMessage(m) {
        // if (!conversation) {
        //     return
        // }
        setLoading(true)
        const msg = createCompoundMessage(account, m)
        try {
            // m is message string.
            setCurrent(undefined)
            await conversation.send(msg)
        } catch (e) {
            console.error(e) 
        } finally {
            setLoading(false)
            setMessages([createMessage(0, msg), ...messages])
        }
    }

    async function getConversationList() {
        if (client) {
            setConversations(await client.list())
        }
    }

    // useEffect(() => {
    //    getConversationList()
    // }, [client])

    useEffect(() => {
        if (client) {
            getMessages()
        }
    }, [address, client])


    if (!provider) {
        return <p className='error-text'>
            You must be logged in to access conversations.
        </p>
    }


    if (!address) {
        return <div>
           {(conversations || []).map((c, i) => {
                return <a href="" onClick={(e) => {
                    e.preventDefault()
                    navigate('/conversations/' + c.peerAddress)
                }}>{c.peerAddress}</a>
           }
           )} 
        </div>
    }
    

  return (
    <div className='container white'>
        <Row className='small-padding'>
        <Col span={10} className='small-padding'>
            <div className='boxed'>
                <br/>
            <h3>Your conversations</h3>
            {conversations && conversations.map((c, i) => {
                return <div className={`cbox ${address == c ? 'gray': ''}`} onClick={() => navigate('/conversations/' + c)} key={i}>{c}</div>

            })}

</div>
</Col>
<Col span={14} className='small-padding'>
    <div className='boxed'>
        <Card title={`Conversation with ${address}`}>

        {(messages || []).map((m, i) => {
            return <p key={i}>{m.text}</p>
        })}
</Card>
        {/* <ChatBubble messages={messages} /> */}

        <TextArea
            value={current}
            onChange={e => setCurrent(e.target.value)}
            rows={4}
            ></TextArea>

        <Button disabled={!current} type="primary" onClick={() => sendMessage(current)}>Send message</Button>

        <div>
            <br/>
            <img src="https://i.imgur.com/Ih9lfmq.png" width={24}/>&nbsp;
            Powered by <a href="https://github.com/xmtp/xmtp-js" target="_blank">XMTP</a><br/>
        </div>
</div>
</Col>
</Row>

    </div>
  )
}
