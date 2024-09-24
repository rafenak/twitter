import {createSlice } from "@reduxjs/toolkit";

interface ModalSliceState {
    displayEditPostImage: boolean
}

const initialState: ModalSliceState = {
    displayEditPostImage:false
};


  export const ModalSlice = createSlice({
    name: "modal",
    initialState,
        reducers:{
            updateDisplayEditPostImage(state){
                state ={
                    ...state,
                    displayEditPostImage: !state.displayEditPostImage
                }
                return state;
            }
        }
  })

  export const { updateDisplayEditPostImage } = ModalSlice.actions;

export default ModalSlice.reducer;