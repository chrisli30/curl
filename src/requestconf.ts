import * as core from '@actions/core'
import { AxiosRequestConfig, Method, AxiosBasicCredentials} from 'axios'
const HttpsProxyAgent = require('https-proxy-agent');

// builder for request config

const builder = {
    basicAuth: (): AxiosBasicCredentials => {
        let authArr: string[] = core.getInput('basic-auth').trim().split(':');
        if(authArr.length !== 2){
            throw new Error('basic-auth format is invalid. The valid format should be username:password.');
        }
        return { 
            username: authArr[0], 
            password: authArr[1]
        }
    },
    bearerToken: (): string => {
        return `Bearer ${core.getInput('bearer-token')}`;
    },
    httpsAgent: () =>{
        const proxyUrlArr: string[] = core.getInput('proxy-url').replace('//', '').trim().split(':');
        
        if(proxyUrlArr.length !== 3){
            throw new Error('proxy-url format is invalid. The valid format should be host:port.');
        }

        const url = {
            protocol: proxyUrlArr[0],
            host: proxyUrlArr[1],
            port: Number(proxyUrlArr[2])
        }
            const proxyAuthArr: string[] = core.getInput('proxy-auth').trim().split(':');
            if(proxyAuthArr.length !== 2){
                throw new Error('proxy-auth format is invalid. The valid format should be username:password.');
            }

            const auth = {
                username: proxyAuthArr[0],
                password: proxyAuthArr[1]
            }

        return new HttpsProxyAgent(`${url.protocol}://${auth.username}:${auth.password}@${url.host}:${url.port}`)
    }
}


// Request config  

const config: AxiosRequestConfig = {
    url: core.getInput('url'),
    method: core.getInput('method') as Method,
    timeout: Number(core.getInput('timeout'))
}

if(core.getInput('basic-auth')){
    config.auth = builder.basicAuth()
}

if(core.getInput('headers')){
    config.headers = JSON.parse(core.getInput('headers'))
}

if(core.getInput('params')){
    config.params = JSON.parse(core.getInput('params'))
}

if(core.getInput('body')){
    config.data = core.getInput('body')
}

if(core.getInput('bearer-token')){
    config.headers = { ...config.headers, Authorization: builder.bearerToken() }
}

if(core.getInput('proxy-url')&&core.getInput('proxy-auth')){
    config.httpsAgent = builder.httpsAgent()
}


export default config