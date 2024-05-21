import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type CanvasState = {
  device: string,
  canvasZoom: number,
  canvasPosition: {
    x: number,
    y: number
  },
  isDragged: boolean
}

const initialState: CanvasState = {
  device: 'desktop',
  canvasZoom: 1,
  canvasPosition: { 
    x: 0, 
    y: 0 
  },
  isDragged: false
}

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setDevice: (state, action: PayloadAction<string>) => {
      state.device = action.payload
    },
    setCanvasZoom: (state, action: PayloadAction<number>) => {
      state.canvasZoom = action.payload
    },
    setCanvasPosition: (state, action: PayloadAction<{ x: number, y: number }>) => {
      state.canvasPosition = action.payload
    },
    setIsDragged: (state, action: PayloadAction<boolean>) => {
      state.isDragged = action.payload
    }
  }
})

export const {
  setDevice,
  setCanvasZoom,
  setCanvasPosition,
  setIsDragged
} = canvasSlice.actions

export const isDragged = (state: RootState) => state.canvas.isDragged
export default canvasSlice.reducer