// content_delivery_module.js

/**
 * This module handles decentralized content delivery for GGG.
 * It uses IPFS for storing and retrieving data in a distributed manner.
 */

const { create } = require('ipfs-http-client');

// Configure IPFS client
const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' }); // Update with actual IPFS node configuration

/**
 * Upload content to IPFS.
 * @param {string|Buffer} content - The content to upload.
 * @returns {Promise<string>} The CID (Content Identifier) of the uploaded content.
 */
async function uploadContent(content) {
    try {
        const { cid } = await ipfs.add(content);
        console.log("Content uploaded to IPFS with CID:", cid.toString());
        return cid.toString();
    } catch (error) {
        console.error("Error uploading content to IPFS:", error);
        throw error;
    }
}

/**
 * Retrieve content from IPFS.
 * @param {string} cid - The CID of the content to retrieve.
 * @returns {Promise<Buffer>} The retrieved content.
 */
async function retrieveContent(cid) {
    try {
        const chunks = [];
        for await (const chunk of ipfs.cat(cid)) {
            chunks.push(chunk);
        }
        const content = Buffer.concat(chunks);
        console.log("Content retrieved from IPFS:", content.toString());
        return content;
    } catch (error) {
        console.error("Error retrieving content from IPFS:", error);
        throw error;
    }
}

// Example usage
(async () => {
    const sampleContent = "Hello, decentralized world!";

    // Upload content to IPFS
    const cid = await uploadContent(sampleContent);

    // Retrieve content from IPFS
    const retrievedContent = await retrieveContent(cid);
    console.log("Retrieved Content:", retrievedContent.toString());
})();

module.exports = {
    uploadContent,
    retrieveContent
};
