import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = () => {
  const [isBlocked, setIsBlocked] = useState<boolean>(false)

  const recaptchaRef = React.useRef<ReCAPTCHA | null>(null)

  return (
    <>
      <div>is blocked iframe content: {String(isBlocked)}</div>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={"6LcWTtMlAAAAALLhhFgTWesWEAOa-yHwC8-KUywZ"}
        onChange={() => { }}
        asyncScriptOnLoad={() => {
          setTimeout(() => {
            const recaptchaIframe: HTMLIFrameElement | null  = document.querySelector("iframe[title='reCAPTCHA']")
            if(recaptchaIframe?.contentWindow?.length !== 1) setIsBlocked(true)
          }, 2000)
        }}
      /></>)
}

export default ReCaptcha