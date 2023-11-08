import { oAuth2Client } from "@/app/utils/youtube";
import { google } from "googleapis";
import * as fs from 'fs'



export async function GET(request:Request){
    


    return new Response(JSON.stringify({hello:"hello"}))   
}

export async function POST(req: Request){

    const body = await req.json();
    const {title, description, tags, categoryId, videos} = body
    
    const youtube = google.youtube({
        version:'v3',
        auth: oAuth2Client
    })

    console.log('here',videos)

    // youtube.videos.insert(
    //     {
    //         resource:{
    //             snippet:{
    //                 title:title,
    //                 description:description,
    //                 tags:tags,
    //                 categoryId:categoryId
    //             },
    //             status: {
    //                 privacyStatus: 'private'
    //             },

    //         },
    //         media:{
    //             body: fs.createReadStream()
    //         }
    //     }
    // )

    return new Response()
}
