'use client'

import { FormEvent, useState } from "react"
import openai from "../utils/openai";
import { Parser } from '@json2csv/plainjs';

export default function InputForm(props: any){

    const [topic, SetTopic] = useState('')
    const [numberOfVideos, setNumberOfVideos] = useState(0);
    const [notification, setNotification] = useState('')
    // const [csvData, setCsvData] = useState<any>();

    const opts = {};
    const parser = new Parser(opts);

    // const btnDownloadCsv = document.getElementById('btnDownloadCsv')

    function downloadCsv(filename: any, csvData :any){
        console.log('here')
        const element = document.createElement("a");
        element.setAttribute("href", `data:text/csv;charset=utf-8, ${csvData}`);
        element.setAttribute("download", filename);

        document.body.appendChild(element);
        element.click();
    }

    async function sendToChatGPT(e:FormEvent){
        e.preventDefault()

        if(topic === '' || numberOfVideos === 0){
            setNotification("must set Topic or number of videos")
            return
        }

        const res = await fetch('http://localhost:3000/api/openAIApi',{
            method: 'POST',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({topic: topic, numberOfVideos: numberOfVideos}),
            cache: 'default'
        })

        const response = await res.json()
        const message = response.message

        const asObject = JSON.parse(message) 
        const csv = parser.parse(asObject)
       
        // setCsvData(csv)
        downloadCsv('videoInfo.csv',csv)
        

        if(typeof message === 'string'){
            setNotification(message)
        } else {
            setNotification('we dont know what to do with this captain')
        }
    }

    return (
        <>
            <form className="flex flex-col">
                <label>Topic:</label>
                <input type="text" name="Topic:" onChange={(e)=>{SetTopic(e.target.value)}} value={topic} className='text-black'></input>
                <label>Number of Videos:</label>
                <input type="number" name="Number of Videos:" onChange={(e)=>{setNumberOfVideos(e.target.valueAsNumber)}} value={numberOfVideos} className='text-black'></input>
                <button type="submit" onClick={sendToChatGPT}>Create Posts</button>
            </form>
            <h1>{notification}</h1>
        </>
    )
}