import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MyListProvider } from "./context/myListContext.jsx"
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <MyListProvider>
          <App />
        </MyListProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
)