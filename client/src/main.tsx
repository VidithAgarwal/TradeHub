import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import appStore from "../utils/store";

createRoot(document.getElementById('root')!).render(
  <Provider store={appStore}>
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>,
)
