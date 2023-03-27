import styles from '@/styles/Home.module.css'
import { useState } from 'react'

export default function Home() {

  const [textRequest,setTextRequest] = useState("")
  const [result,setResult] = useState()

  async function onSubmitButtonClick(event){
    const response = await fetch("api/openai_service",{
      method : "POST",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({question : textRequest})
    })

    const responseData = await response.json();

    if(responseData.error && responseData.error !== ""){
      setResult(responseData.error)
    }else{
      setResult(responseData.answer)
    }

  }

  return (
    <div>
      <main className={styles.main}>
        <h3>Haydi Sor</h3>
        <form>
          <textarea
            name="text-request"
            rows="4"
            cols="50"
            placeholder='Sorunuzu giriniz'
            value={textRequest}
            onChange={(e) => setTextRequest(e.target.value)}          
          />
          <input type="button" value="Gönder" onClick={onSubmitButtonClick}/>
          <div className={styles.result}>
            <h2>Cevabım : </h2>
            <span>{result}</span>
          </div>
        </form>
      </main>
    </div>
  )
}
