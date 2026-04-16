import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/Router.jsx'
import { TimelineProvider } from './components/context/TimelineContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TimelineProvider>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </TimelineProvider>
  </StrictMode>,
)
