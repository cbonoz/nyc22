import { Client } from '@xmtp/xmtp-js'
import { providers, Wallet } from 'ethers'

// Create the client with your wallet. This will connect to the XMTP development network by default
export const getConversationClient = async (provider) => {
    if (!provider) {
        return null
    }
    const signer = await provider.getSigner()
    const xmtp = await Client.create(signer)
    const conversationClient = xmtp.conversations
    return conversationClient
}
