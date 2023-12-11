import "regenerator-runtime";
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import './index.css'
import {ChakraProvider} from "@chakra-ui/react";

// Page Components & Layouts

import Login from "./routes/pages/Login.jsx";
import Signup from "./routes/pages/Signup.jsx";
import Home from "./routes/pages/Home.jsx";
import Root from "./routes/Root.jsx";
import {action as signUpAction} from './routes/pages/Signup.jsx';
import {action as loginAction} from './routes/pages/Login.jsx';
import {loader as homeLoader} from './routes/pages/Home.jsx';
const router = createBrowserRouter([

    {
       path:"/",
       element:<Root />,
        children: [
            {
                index: true,
                element: <Home />,
                loader: homeLoader
            }
        ]
    },
    {
        path: "/login",
        element: <Login />,
        action: loginAction
    },
    {
        path: "/sign-up",
        element: <Signup />,
        action: signUpAction
    },


]);



ReactDOM.createRoot(document.getElementById('root')).render(

      <ChakraProvider>
          <RouterProvider router={router} />
      </ChakraProvider>
)
