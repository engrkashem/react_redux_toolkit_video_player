import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getRelatedVideos } from "./relatedVideosAPI"



const initialState={
    isLoading:false,
    isError:false,
    error:'',
    relatedVideos:[],
}

export const fetchRelatedVideos=createAsyncThunk("relatedVideos/fetchRelatedVideos", async(queryObj)=>{
    const relatedVideos=await getRelatedVideos(queryObj);

    return relatedVideos;
});

const relatedVideosSlice=createSlice({
    name:"relatedVideos",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchRelatedVideos.pending, (state, action)=>{
            state.isLoading=true;
            state.isError=false;
        }).addCase(fetchRelatedVideos.fulfilled, (state,action)=>{
            state.isLoading=false;
            state.relatedVideos=action.payload; 
        }).addCase(fetchRelatedVideos.rejected, (state, action)=>{
            state.isLoading=false;
            state.isError=true;
            state.error=action.error?.message;
            state.relatedVideos=[];
        })
    }
});

export default relatedVideosSlice.reducer