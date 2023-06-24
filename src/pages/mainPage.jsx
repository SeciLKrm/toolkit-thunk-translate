import { useEffect, useState, useRef  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAnswer, getLanguages } from '../app/actions'
import {clearAnswer } from '../app/translateSlice'
import Select from 'react-select'
import {FaExchangeAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'


const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const MainPage = () => {
    const state = useSelector((store)=> store)
    // console.log(state)
    const dispatch = useDispatch()
    const inputRef = useRef()
   const [text,setText] = useState('')
     // hangi dilden çevrilmek istendiği bilgisi
   const[sourceLang,setSourceLang]=useState({value:'tr', label:'Turkish'})
   // hangi dile çevirmek istediği
   const [targetLang,setTargetLang]=useState({value:'en', label:'English'})
    // console.log(text)
    const handleClick =()=>{
      if(text.length === 0 )
      {toast.warn ("Bu alan boş bırakılamaz",{theme: "dark"}) 
      return}
     
      dispatch(getAnswer({text, sourceLang, targetLang}))
    }
useEffect(()=>{
    dispatch(getLanguages())
},[])
// console.log(state.languages)

const changeLang =()=>{
  setSourceLang(targetLang)
  setTargetLang(sourceLang)
//inputların içini temizleme
inputRef.current.value=''
dispatch(clearAnswer())

}

  return (
    <div>
      
        <h1> Çeviri +</h1>
        <div className='container'> 
        <div className='left'>
        <Select value={sourceLang} onChange={(e)=>setSourceLang(e)}
         options={state.languages} isLoading={state.isLoading}
         className='select'
         styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? 'red' : 'grey',
            background : 'black'
          }),
        }}   />
            <textarea ref={inputRef} type='text' onChange={(e)=>setText(e.target.value) }/>
        </div>
        <span onClick={changeLang}> <FaExchangeAlt className='icon'/> </span>
        <div className='right'>
        <Select value={targetLang} onChange={(e)=>setTargetLang(e)}
         options={state.languages} isLoading={state.isLoading}
         className='select'
         styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? 'red' : 'grey',
            background : 'black'
          }),
          }} />
            <textarea value={state.answer} disabled type='text' className='disabled-area'/>
        </div>
        </div>
        <button onClick={handleClick} >Çevir</button>
    </div>
  )
}

export default MainPage