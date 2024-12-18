import { useRef, useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState("")
  const imageContainerRef = useRef(null);
  
  const ImageGeneration= async (data)=>{
    console.log(data)
    const response = await fetch("https://api-inference.huggingface.co/models/kothariyashhh/GenAi-Texttoimage", {
      method: 'POST',
      headers: {
        Authorization: "Bearer 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",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "inputs": data }),
    });
    const result = await response.blob();
    const imgUrl = URL.createObjectURL(result)
    console.log(imgUrl)
    const imgElement = document.createElement('img');
      imgElement.src = imgUrl;
      imgElement.alt = "Generated image";
      imgElement.height = "400"
      imgElement.width = "400"
      imgElement.className = "my-4"; 

      if (imageContainerRef.current) {
        imageContainerRef.current.innerHTML = '';
        imageContainerRef.current.appendChild(imgElement);
      }
    
  }
  

  return (
    <>
      <main className='grid justify-items-center mt-1'>
        <div className='flex flex-col rounded-md justify-center items-center gap-5 bg-blue-600 max-w-[750px] w-full'>
          <h1 className='text-white text-2xl font-bold underline'>Text To Image Generator</h1>
          <textarea name="inputData" id="inputData" rows={5} className='outline-blue-400 font-semibold rounded-md p-1 max-w-[400px] w-[60%]' value={input} onChange={(e)=>{setInput(e.target.value)}}></textarea>
          <button onClick={()=>{ImageGeneration(input)}} className='text-white border-[2px] border-white rounded-full px-3 py-1 font-semibold my-2'>Generate Image</button>
        </div>
        <div className="ImageContainer" ref={imageContainerRef}>
        </div>
      </main>
    </>
  )
}

export default App
