import { useCallback, useEffect, useRef, useState } from 'react'
import { Slider } from '@/components/ui/slider';
import { Checkbox } from './components/ui/checkbox';
import { Button } from './components/ui/button';



function App() {
  const [length, setLength] = useState([8]);
  const [isNumAllowed , setNumAllowed] = useState(false)
  const [isSpecialAllowed , setSpecialAllowed] = useState(false)
  const [password , setPassword] = useState('');
  const [isCopied, setisCopied] = useState(false)





  const GeneratePassword = useCallback( () => {
    let myPass = '';
    let passContent = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(isNumAllowed) passContent += '0123456789'
    if(isSpecialAllowed) passContent += '!@#$%^&*-_+=[]{}~`'

    for (let i = 0; i < length; i++) {
      let num = Math.floor(Math.random() *passContent.length );
      myPass += passContent.charAt(num)
      
    }
    setPassword(myPass)
    setisCopied(false)
  } ,[length,isNumAllowed,isSpecialAllowed,setPassword,setisCopied])

  
  useEffect( () => {
    GeneratePassword();
  }, [length,isNumAllowed,isSpecialAllowed, GeneratePassword])
  
  
  const copyTOClipBoard = useCallback( () => {
    window.navigator.clipboard.writeText(password)
  }, [password])


  return (
    <>
      <div className='max-w-xl w-5/6 mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
        <h1 className='font-bold mb-4 text-2xl'>Password Generator</h1>

        <div className='mb-4 flex'>
          <input type="text" 
          value={password} 
          readOnly 
          className='border outline-none p-2 pr-10 rounded-l-xl w-full' 
          />

          <button 
          className='bg-blue-500 p-2 rounded-r-xl text-white hover:bg-blue-700  border-blue-900 text-lg '
          onClick={ () => {
            copyTOClipBoard();

            setisCopied(true);
            setTimeout(() => {
              setisCopied(false);
            }, 2000);
          }}>
            { isCopied ? 'Copied!' : 'Copy' }
          </button>
          
        </div>

        <div className='mb-4'>
          <label className="block mb-2 text-md">Password Length: {length}</label>
          <Slider
          min={6}
          max={30}
          value={length}
          onValueChange={(newValue) => setLength(newValue)}
        />
        </div>

        <div className='mb-4 flex items-center'>
          <Checkbox id ='includeNumbers' 
          checked ={isNumAllowed} 
          onCheckedChange = {() => setNumAllowed(!isNumAllowed)}
           />
          <label htmlFor="includeNumbers" className='ml-2' >
          Include Numbers
          </label>
        </div>

        <div className='mb-4 flex items-center'>
          <Checkbox id ='includeSpecial' 
          checked ={isSpecialAllowed} 
          onCheckedChange = {() => setSpecialAllowed(!isSpecialAllowed)}
          />
          <label htmlFor="includeSpecial" className='ml-2'>
          Include Special Characters
          </label>
        </div>

        <Button 
        className="w-full"
        onClick = {GeneratePassword}
        >
        Generate New Password
        </Button>
        

      </div>
    </>
  )
}

export default App
