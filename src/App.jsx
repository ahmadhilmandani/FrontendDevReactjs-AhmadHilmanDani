import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'

import Home from "./pages/Home.jsx"
import Detail from "./pages/Detail.jsx"
import Index from './layout/Index.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Index />}>
      <Route index element={<Home />} />
      <Route path='/:id/:price/:openTime/:closedTime' element={<Detail />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
