import EpnsSDK from "@epnsproject/backend-sdk-staging" 

// the private key of the address which you used to create a channel
const  CHANNEL_PK = '0x0000000000000000000000000000000000000000000000000000000000000fff';

// Initialise the SDK
const sdk = new EpnsSDK(CHANNEL_PK);

export const sendNotification = async ({
    recipientAddress,
    title,
    message,
    cta,
    image
}) => {
    const tx = await sdk.sendNotification(
        recipientAddress,
        title, // push
        message,
        title, // regular notification (note these can differ).
        message,
        3, //this is the notificationType
        cta, // a url for users to be redirected to
        image || '',// an image url, or an empty string
        null, //this can be left as null
      );
}