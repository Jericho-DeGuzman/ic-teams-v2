import { cookies, headers } from 'next/headers'
import { decryptToken } from './cryptoJs';

export default function authenticate() {
    const cookie = cookies();
    const accessToken = cookie.get('at')
    
    // get user ip
    const header = headers()
    const userIp = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
    
    if(!accessToken) return false;

    // decrypted access token
    const decryptedData = decryptToken(accessToken.value);
    const {token, ip} = decryptedData;
    if (!token || token == '') return false;

    // check if user device has the same ip with token.
    if (userIp !== ip) return false;

    return true;
}