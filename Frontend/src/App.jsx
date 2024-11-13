import './App.css'
import EditPost from './pages/EditPost';
import Login from './pages/Login';
import Posts from './pages/Posts';
import SignUp from './pages/SignUp'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<SignUp/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/post',
      element:<Posts/>
    },
    {
      path:'/post?id=123',
      element:<EditPost/>
    },
   
   
  ])

  return (
    <>
    <RouterProvider router={router}/>
      
    </>
  )
}

export default App
