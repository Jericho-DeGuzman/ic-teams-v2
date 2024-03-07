import https from 'https';
import axios from "axios";

const agent = new https.Agent({  
  rejectUnauthorized: false
});

const microserviceCaller = (token) => {
    return axios.create({
        baseURL: process.env.MICROSERVICE_BASE_URL,
        headers: {
            "accessToken": token, // Assuming it's a Bearer token
            "Content-Type": 'application/json'
        },
        httpsAgent: agent
    });
};

export default microserviceCaller;
