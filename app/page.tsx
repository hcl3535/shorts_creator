'use client'
import Image from 'next/image'
import InputForm from './inputForm/page'
import YoutubeUploader from './youtubeUploader/page'

export default function Home() {
  return(
    <>
      <InputForm/>
      <YoutubeUploader/>
    </>
  )
}
