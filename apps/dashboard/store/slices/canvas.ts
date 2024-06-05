import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CanvasMode = 'move' | 'select'

type CanvasState = {
  device: string,
  canvasZoom: number,
  canvasPosition: {
    x: number,
    y: number
  },
  isDragged: boolean
  showDebugTools: boolean
  mode: CanvasMode
}

const initialState: CanvasState = {
  device: 'desktop',
  canvasZoom: 1,
  canvasPosition: { 
    x: 0, 
    y: 0 
  },
  isDragged: false,
  showDebugTools: false,
  mode: 'move'
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
    },
    setShowDebugTools: (state, action: PayloadAction<boolean>) => {
      state.showDebugTools = action.payload
    },
    setMode: (state, action: PayloadAction<CanvasMode>) => {
      state.mode = action.payload
    }
  }
})

export const {
  setDevice,
  setCanvasZoom,
  setCanvasPosition,
  setIsDragged,
  setShowDebugTools,
  setMode
} = canvasSlice.actions

export const isDragged = (state: RootState) => state.canvas.isDragged
export const showDebugTools = (state: RootState) => state.canvas.showDebugTools
export const canvasMode = (state: RootState) => state.canvas.mode

export default canvasSlice.reducer