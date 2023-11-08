'use client'

import { FormEvent, useState } from "react";

export default function YoutubeUploader(){
    
    const tagList:{dates:string[], 'D&D':string[]} = {
        dates:['dates','cute','romatic','night'],
        'D&D':['dungeons','dragons','fantasy', 'fighting','roleplaying'],
    }

    const categoryIds = {
        'People&Blogs':22,
        "family":37,
        'shorts': 42
    }

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState<string[]>(tagList.dates)
    const [notification, setNotification] = useState('')
    const [categoryId, setCategoryId] = useState(categoryIds["People&Blogs"])
    const [videos, setVideos] = useState<File[]>()

    async function postVideos(e:FormEvent) {
        e.preventDefault()

        if(!title || !description || !tags){
            setNotification("you must fill out title, description, and select a tag set")
            return
        }

        const res = await fetch('http://localhost:3000/api/youtubeApi',{
            method: 'POST',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: title, description: description, tags:tags, categoryId: categoryId, videos: videos}),
            cache: 'default'
        })
        
    }

    function handleTagSet(e:any){
        if(e.target.value === 'dates'){
            setTags(tagList.dates)
            setCategoryId(categoryIds['People&Blogs'])
        }
        if(e.target.value === 'D&D'){
            setTags(tagList["D&D"])
            setCategoryId(categoryIds['shorts'])
        }
    }

    async function collectVideos(){
        const fileHandles = await window.showOpenFilePicker({multiple:true});

        const allContent = await Promise.all(
            fileHandles.map(async (fileHandle) => {
              const file = await fileHandle.getFile();
              return(file);
            })
          );
        
          setVideos(allContent);
    }

    return(
        <>
            <button type='button' onClick={collectVideos}>Collect videos</button>
            <form className="flex flex-col">
                <label>title:</label>
                <input type="text" name="title:" onChange={(e)=>{setTitle(e.target.value)}} value={title} className='text-black'></input>
                <label>description:</label>
                <input type="text" name="description:" onChange={(e)=>{setDescription(e.target.value)}} value={description} className='text-black'></input>
                <label>choose a tag set:</label>
                <select name='tags' id="tags" onChange={handleTagSet} className="text-black">
                    <option value='dates'>dates</option>
                    <option value='D&D'>D&D</option>
                </select>
                {tags}
                <button type="submit" onClick={postVideos}>Post Videos</button>
            </form>
            {notification}
        </>
    )
}