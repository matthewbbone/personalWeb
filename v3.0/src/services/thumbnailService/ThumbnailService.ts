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

export const getThumbnails = async (keys: number[]) => {

    let data: any

    try {
        data = await client.send(new ListObjectsCommand({
            Bucket: "ivory-tab",
            Prefix: "thumbnails/"
        }));
    } catch (err) {
        console.log("Error", err);
    }

    const href = "https://s3.us-east-1.amazonaws.com/ivory-tab/";
    const urls: any = {}

    data.Contents.forEach((file: any) => {
        let id = file.Key.replace('thumbnails/', '').replace('.png', '')
        if (keys.some(key => key == parseInt(id))) {
            const url = href + encodeURIComponent(file.Key)
            urls[id] = url
        }
    })

    return urls
};

export const postThumbnail = async (id: string, file: any) => {

    const fileType = file.name.split('.').at(-1)
    
    const params = {
        Bucket: "ivory-tab",
        Key: `thumbnails/${id}.${fileType}`,
        Body: file
    }

    try {
        const data = await client.send(new PutObjectCommand(params));
        return data; // For unit tests.
      } catch (err) {
        console.log("Error", err);
      }

}