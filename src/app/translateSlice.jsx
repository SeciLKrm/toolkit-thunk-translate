import { createSlice } from "@reduxjs/toolkit";
import { getAnswer, getLanguages } from "./actions";


const initialState = {
    answer : '',
    isLoading : true,
    isError : false,
    languages : []
}

export const translateSlice = createSlice({
name : 'translate',
initialState,
// thunkta olan "reducers" yerine "extraReducer" kullanılır (asnkron aksiyonlarda)
extraReducers : {
      // atılan isteğe cevabı beklerken
 [getAnswer.pending]: (state) =>{
    state.isLoading = true
 },
  // atılan isteğe cevabı beklerken
 [getAnswer.fulfilled]:(state,action) =>{
    state.answer =action.payload,
    state.isLoading =false,
    state.isError =false
 },
 // atılan isteğe cevap gelmezse veya hatalı gelirse
 [getAnswer.rejected] :(state) =>{
  state.isError =true,
  state.isLoading=false
 },
 [getLanguages.pending]: (state) => {
    state.isLoading=true
 },
 [getLanguages.fulfilled]:(state,action) => {
    state.languages = action.payload,
    state.isLoading =false,
    state.isError =false
 },
 [getLanguages.rejected]:(state) =>{
    state.isError=false,
    state.isLoading=false
 }

},
reducers :{
   clearAnswer :(state)=>{
      state.answer=''
   }
}

})

export const {clearAnswer}= translateSlice.actions
export default translateSlice.reducer 