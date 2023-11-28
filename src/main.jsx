import "regenerator-runtime";
import React from 'react'
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

const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <Root />,
    //     errorElement: <ErrorPage />,
    //     loader: rootLoader,
    //     action: rootAction,
    //     children: [
    //         {
    //             path: "contacts/:contactId",
    //             element: <Contact />,
    //             loader: contactLoader
    //         },
    //         {
    //             path: "contacts/:contactId/edit",
    //             element: <EditContact />,
    //             loader: contactLoader,
    //             action: editAction
    //         },
    //         {
    //             path: "contacts/:contactId/destroy",
    //             action: destroyAction
    //         }
    //     ]
    // },
    //
    {
       path:"/",
       element:<Root />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/sign-up",
        element: <Signup />
    },


]);



ReactDOM.createRoot(document.getElementById('root')).render(

      <ChakraProvider>
          <RouterProvider router={router} />
      </ChakraProvider>
)
