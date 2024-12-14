// data_storage.js

/**
 * This module handles interactions with the decentralized storage system.
 * It provides functionality to store and retrieve data using IPFS.
 */

const { create } = require('ipfs-http-client');

// Connect to the IPFS network
const ipfs = create({
    host: 'localhost', // Change to the desired IPFS node
    port: 5001,
    protocol: 'http'
});

/**
 * Store data in IPFS.
 * @param {string|Buffer} data - The data to store in IPFS.
 * @returns {Promise<string>} The CID (Content Identifier) of the stored data.
 */
async function storeData(data) {
    const { cid } = await ipfs.add(data);
    return cid.toString();
}

/**
 * Retrieve data from IPFS.
 * @param {string} cid - The CID of the data to retrieve.
 * @returns {Promise<Buffer>} The retrieved data.
 */
async function retrieveData(cid) {
    const stream = ipfs.cat(cid);
    let data = Buffer.from([]);

    for await (const chunk of stream) {
        data = Buffer.concat([data, chunk]);
    }

    return data;
}

// Example usage
(async () => {
    const dataToStore = "Hello, GGG!";
    const cid = await storeData(dataToStore);
    console.log("Stored data CID:", cid);

    const retrievedData = await retrieveData(cid);
    console.log("Retrieved data:", retrievedData.toString());
})();

module.exports = {
    storeData,
    retrieveData
};
