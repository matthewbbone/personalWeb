import { Parameters } from './types'

export const parseParams = (paramString:string) => {
        
    const params:Parameters = {}

    paramString
        .replace('?', '')
        .split('&')
        .forEach((param:string) => {
            const paramList = param.split('=')
            params[paramList[0]] = paramList[1]
        })

    return params
}