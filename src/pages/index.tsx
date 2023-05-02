import Image from 'next/image'
import { Inter } from 'next/font/google'
import ReCaptcha from '@/components/ReCaptcha'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [respStatus, setRespStatus] = useState<null | number>(null)
  const [jsScriptSuccess, setJsScriptSuccess] = useState<boolean>(false)
  const [jsScriptError, setJsScriptError] = useState<any>()
  const [calledMyFunc, setIsCalledMyFunc] = useState<boolean>(false)

  const myCallbackFunction = () => {
    setIsCalledMyFunc(true)
  }

  useEffect(()=> {
    (async()=>{
      const resp = await fetch("https://www.google.com/recaptcha/api.js", {mode: "no-cors"})
      if(resp.status === 0) setRespStatus(resp.status)
    })()
  },[])

  useEffect(()=>{

    (window as any).myCallbackFunction = myCallbackFunction

    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?onload=myCallbackFunction&render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => setJsScriptSuccess(true);
    script.onerror = (err) => setJsScriptError(err);
    document.head.appendChild(script);
  },[])


  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <div>fetch response status: {respStatus} (0 is success)</div>
      <div>js script load success: {String(jsScriptSuccess)}</div>
      <div>js script load err: {String(jsScriptError)}</div>
      <div>called api callback: {String(calledMyFunc)}</div>
      <ReCaptcha />
    </main>
  )
}
