// identity_management.js

/**
 * This module handles decentralized identity management (DID) functionality.
 * It provides functionality to create, manage, and verify user identities.
 */

const crypto = require('crypto');

/**
 * Generate a Decentralized Identifier (DID).
 * @param {string} userName - A unique name or alias for the user.
 * @returns {string} The generated DID.
 */
function generateDID(userName) {
    const timestamp = Date.now();
    const hash = crypto.createHash('sha256')
        .update(`${userName}-${timestamp}`)
        .digest('hex');
    return `did:ggg:${hash}`;
}

/**
 * Validate a DID.
 * @param {string} did - The DID to validate.
 * @returns {boolean} True if the DID is valid, false otherwise.
 */
function validateDID(did) {
    const regex = /^did:ggg:[a-f0-9]{64}$/;
    return regex.test(did);
}

// Example usage
const newDID = generateDID("Alice");
console.log("Generated DID:", newDID);
console.log("Is the DID valid?", validateDID(newDID));

module.exports = {
    generateDID,
    validateDID
};
