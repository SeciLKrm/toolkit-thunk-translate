import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "./constants";

 export const getAnswer = createAsyncThunk('getAnswer/translate', async (param) => {
     // istek atarken göndereceğimiz bilgiler
     const encodedParams = new URLSearchParams();
     encodedParams.set('source_language', param.sourceLang.value);
     encodedParams.set('target_language', param.targetLang.value);
     encodedParams.set('text', param.text);
     
     const options = {
       method: 'POST',
       url: 'https://text-translator2.p.rapidapi.com/translate',
       headers: {
         'content-type': 'application/x-www-form-urlencoded',
         'X-RapidAPI-Key': '8bcbaf7a2emsh51f471da367c07ap1ee547jsnd3b41e7c2083',
         'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
       },
       data: encodedParams,
     };
     
     
    // apiye istek atma kısmı
const res = await axios.request(options)
// console.log(res.data.data.translatedText)
//  verileri slice' a aktarmak için return etmek gerek
  return res.data.data.translatedText
} )

export const getLanguages = createAsyncThunk('getLanguage/translate', async () =>{
 
  // Diller verisini çekmek için aksiyon
  const res = await axios.request(options)
  // console.log(res.data.data.languages)
  //  verileri slice' a aktarmak için return etmek gerek
  const languages =  res.data.data.languages
  const newLanguages = languages.map((lang)=>({value :lang.code, label :lang.name}))

  return newLanguages
})

