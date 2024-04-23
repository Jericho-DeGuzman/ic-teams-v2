import CryptoJS from "crypto-js"
import { createHash } from 'crypto';

export function token() {

}

export async function encryptToken(plainToken, userIp) {
    //create object to encrypt.
    const data = { token: plainToken, ip: userIp };
    // encrypt object
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.TOKEN_PASS_PHRASE).toString();
    return ciphertext
}

export function decryptToken(ciphertext) {
    // let bytes = CryptoJS.AES.decrypt(ciphertext, process.env.TOKEN_PASS_PHRASE);
    // let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    let decryptedData = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(ciphertext, process.env.TOKEN_PASS_PHRASE)));
    return decryptedData;
}

export function convertHashed(text) {
    const hash = createHash('sha256');
    hash.update(text);
    return hash.digest('hex');
}