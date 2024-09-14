
import { AnyObject } from 'yup/lib/types'
import {
    RowsResponse,
    ColsResponse,
    ResponseRow,
    ResultRow,
    PostToolProps,
    GetDynamoRowsProps,
    GetDynamoColsProps
} from './types'

const dynamoEndpoint = 'https://fi7gtq2twj.execute-api.us-east-1.amazonaws.com/default/dynamo-access'

export function getDynamoRows({ table, keys }: GetDynamoRowsProps): Promise<any> {

    const url = new URL(dynamoEndpoint)
    url.searchParams.append('TableName', table)
    url.searchParams.append('Key', keys.join(','))

    console.log(keys)

    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': '*/*'
        }
    })
        .then((res) => {
            return res.json();
        })
        .then((res: RowsResponse) => {
            return formatRows(res)
        })
}

export function getDynamoCols({ table, cols }: GetDynamoColsProps): Promise<any> {

    const url = new URL(dynamoEndpoint)
    url.searchParams.append('TableName', table)
    url.searchParams.append('Columns', cols.join(','))

    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': '*/*'
        }
    })
        .then((res) => {
            return res.json();
        })
        .then((res: ColsResponse) => {
            return formatCols(res)
        })

}

export function postTool(props: PostToolProps): Promise<any> {

    const url = new URL(dynamoEndpoint)

    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': '*/*'
        },
        body: JSON.stringify(props)
    })

}

let L = (x: any) => {
    let newList: string[] = []
    Object.values(x).forEach((val: any) => newList.push(val.S))
    return newList
}
let N = (x: any) => parseInt(x)
let S = (x: any) => x

function processResponseRow(row: ResponseRow) {

    let newRow: ResultRow = {}

        const keypairs = Object.entries(row).forEach((keyval) => {

            let val: string | number | string[]

            let keys = Object.keys(keyval[1])

            if (keys.indexOf('L') > -1) {
                val = L(keyval[1].L)
            } else if (keys.indexOf('N') > -1) {
                val = N(keyval[1].N)
            } else if (keys.indexOf('S') > -1) {
                val = S(keyval[1].S)
            }

            newRow[keyval[0]] = val
        })

        return newRow
}

function formatRows(res: RowsResponse): Array<ResultRow> {
    return res.Responses['ivory-tab-tools'].map((row: ResponseRow) => {
        return processResponseRow(row)
    })
}

function formatCols(res: ColsResponse): Array<ResultRow> {
    return res.Items.map((row: ResponseRow) => {
        return processResponseRow(row)
    })
}