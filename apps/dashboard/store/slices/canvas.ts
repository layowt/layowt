import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { Component } from '@prisma/client'

export type CanvasMode = 'move' | 'select' | 'zoom'
export type ZoomLevel = 25 | 50 | 75 | 100 | 125 | 150 | 175 | 200 | 'custom'

type CanvasState = {
  device: string
  canvasZoom: number
  canvasPosition: {
    x: number
    y: number
  },
  canBeDragged: boolean
  isDragged: boolean
  showDebugTools: boolean
  mode: CanvasMode,
  zoomLevel: ZoomLevel,
  components: Component[]
}

const initialState: CanvasState = {
  device: 'desktop',
  canvasZoom: 1,
  canvasPosition: { 
    x: 0, 
    y: 0 
  },
  canBeDragged: true,
  isDragged: false,
  showDebugTools: false,
  mode: 'move',
  zoomLevel: 100,
  components: []
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

      if(action.payload === 'move') state.canBeDragged = true
      else state.canBeDragged = false
    },
    setZoomLevel: (state, action: PayloadAction<ZoomLevel>) => {
      state.zoomLevel = action.payload
    },
    setComponents: (state, action: PayloadAction<Component[]>) => {
      state.components = action.payload
    }
  }
})

export const {
  setDevice,
  setCanvasZoom,
  setCanvasPosition,
  setIsDragged,
  setShowDebugTools,
  setMode,
  setZoomLevel,
  setComponents
} = canvasSlice.actions

export const isDragged = (state: RootState) => state.canvas.isDragged
export const showDebugTools = (state: RootState) => state.canvas.showDebugTools
export const canvasMode = (state: RootState) => state.canvas.mode
export const canBeDragged = (state: RootState) => state.canvas.canBeDragged
export const zoomLevel = (state: RootState) => state.canvas.zoomLevel
export const components = (state: RootState) => state.canvas.components

export default canvasSlice.reducer