
export interface GetDynamoRowsProps {
    table: string, 
    keys: Array<number>
}

export interface GetDynamoColsProps {
    table: string, 
    cols: Array<string>
}

export interface PostToolProps {
    table: string;
    id: string;
    title: string;
    toolLink?: string;
    developers: string;
    creationDate: string;
    category: string;
    keywords: string;
    host: string;
    description: string,
    source?: string;
    sourceLink?: string;
    authors?: string;
    publisher?: string;
    publishDate?: string;
}


export interface ResponseRow {
    [key:string]: {
        [key:string]: string|Array<string>
    }
}

export interface ResultRow {
    [key:string]:number|string|string[]
}

export interface RowsResponse {
    "Responses": {
        [key:string]: Array<ResponseRow>
    },
    "UnprocessedKeys": {}
}

export interface ColsResponse {
    "Items": Array<ResponseRow>
}

