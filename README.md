<p align='center'>
    <img src='./img/logo_3_2.png' width=400/>
</p>

Worldfund
###

Create identity-enforced fundraise pages hosted on web3, with assets and resources managed on IPFS. 

Payments facilitated on smart contracts.

This app is served completely by decentralized networks.
---

<!-- Try it out <a href="worldfund.surge.sh" target="_blank">here</a>! (requires Metamask connected to Polygon testnet). -->

### Benefits

- Worldfund enables anyone to create and collect funds via Polygon without a vendor agreement. A polygon smart contract is deployed for each request.
- When a donation is completed, an NFT is generated that links both the signer's signature and the documents being agreed on.
- Hosted documents and the request are immutable.
- Smart contract deployed on Polygon which marks the progress/fulfillment of the fundraise request. 
- When done the contract can be marked inactive by the owner.
- View history of requests and completed fundraises using the covalent chain history API directly from the app.

### Technologies used
Walletconnect:
Boba network - best web2 api connection to web3.
Tatum: Dapp platform / API (first 5 teams to submit get 500)
Filecoin/IPFS: Storage of worlfund page assets.
Worldcoin: Identity
Polygon: Low cost ethereum (smart contracts)
Livepeer: Video apps
EPNS: Pocket network (RPC provider) 
NFTPort: NFT creation when you donate at a certain threshold.
Covalent: Blockchain data api (get history of donations for certain contracts, viewable in-app)
XMTP: Messaging on the listing page.
Unlock: Gating access to certain content
- Covalent: Enables in-app history queries of past fundraise requests and fulfillment for a given polygon address.
- NFTPort: Generation of the fundraise record / proof. Attaches the final fundraise/agreement to an NFT and saves a link to it in the smart contract.
- Polygon: In-app deployment of the request smart contract and marked completed upon completion of the each request based on receival of signer's signature. A new Polygon contract is deployed for each new fundraise request.
- Worldcoin: Identity

<!--
Demo flow:
1. Context
Kickstarter
New solutions coming out all the timehttps://www.tiptopjar.com/?ref=producthunt
2. App
Create new fundraise page flow
Upload image
Worldcoin enforses that a person only creates a page once, and that there aren't fraudulent users attempting to raise money for their projects or impersonating the creator.
Donate
Add messages to pages (stored on the contract or in a web3 storage mechanism)
Smart-contract managed
Free, no fees
Can embed your url in your social media profile. 
URL hosted on surge
3. Conclusion

-->

<!-- <b>This project is a hackathon prototype and would require additional work / deployment to be production ready. -->

---

To run/demo the project locally, Worldfund requires the following environment variables.

<pre>
    REACT_APP_COVALENT_KEY={YOUR_COVALENT_API_KEY} # Covalent key for the history page.
    REACT_APP_NFT_PORT_KEY={YOUR_NFT_PORT_API_KEY} # NFT port api key for receipt creation.
    REACT_APP_STORAGE_KEY={YOUR_WEB3_STORAGE_KEY} # web3.storage key for file hosting.
</pre>

---

After declaring the above environment variables, use the below command to start the project:
`yarn; yarn start`

Recompiling Worldfund contract:
`cd contracts; npx hardhat compile`

### Screenshots

#### Home page

<img src="./img/worldfund.png" width=800 />

### Useful links
* Sponsors: https://showcase.ethglobal.com/ethnewyork2022/prizes
* https://www.npmjs.com/package/@usedapp/core