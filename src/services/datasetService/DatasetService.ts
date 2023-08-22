import { csvParse, csv } from 'd3'
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import {
    fromCognitoIdentityPool,
} from "@aws-sdk/credential-provider-cognito-identity";
import {
    S3Client,
    ListObjectsCommand,
    PutObjectCommand
} from "@aws-sdk/client-s3";

const client = new S3Client({
    region: "us-east-1",
    credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: "us-east-1" }),
        identityPoolId: "us-east-1:59ce2eb2-65c1-48f6-ba3b-662670f31541" // IDENTITY_POOL_ID
    }),
});

export const postDataset = async (id: string, file: any) => {

    const fileType = file.name.split('.').at(-1)

    console.log(file)
    
    const params = {
        Bucket: "ivory-tab",
        Key: `datasets/${id}.${fileType}`,
        Body: file
    }

    console.log(params)

    try {
        const data = await client.send(new PutObjectCommand(params));
        return data; // For unit tests.
      } catch (err) {
        console.log("Error", err);
      }

}

export function getDataset(id: string): Promise<any> {

    const url = `https://ivory-tab.s3.amazonaws.com/processed-datasets/${id}-small.csv`

    return csv(url)

}

export function getMetaData(id: string): Promise<any> {

    const url = new URL(`https://ivory-tab.s3.amazonaws.com/processed-datasets/${id}.json`)

    return fetch(url,
        {
            method: 'GET',
            headers: {
                'Accept': '*/*'
            }
        })
        .then((res) => {
            return res.json();
        })

}