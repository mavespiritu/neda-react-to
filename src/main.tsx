import ReactDOM from 'react-dom/client'
import './index.css'
import { Toaster } from './components/ui/toaster.tsx'

import { routeTree } from "./routeTree.gen"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import React from "react"

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
)
