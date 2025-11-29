import React, { createContext, useContext, useReducer } from 'react'

const AppStateContext = createContext()
const AppDispatchContext = createContext()

const initialState = {
  watched: [],
  preferences: { darkMode: false }
}

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_WATCH':
      return {
        ...state,
        watched: state.watched.includes(action.payload)
          ? state.watched.filter((id) => id !== action.payload)
          : [...state.watched, action.payload]
      }
    case 'SET_PREFERENCE':
      return { ...state, preferences: { ...state.preferences, ...action.payload } }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  return useContext(AppStateContext)
}

export function useAppDispatch() {
  return useContext(AppDispatchContext)
}
