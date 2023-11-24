import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import './index.css'
import {ChakraProvider} from "@chakra-ui/react";

// Page Components & Layouts
import Root, {loader as rootLoader , action as rootAction} from "./routes/Root.jsx";
import ErrorPage from "./error-page.jsx";
import Contact, {loader as contactLoader} from "./routes/Pages/Contact.jsx";
import EditContact, {
    action as editAction
} from './routes/Pages/Edit.jsx';
import {action as destroyAction} from './routes/Pages/Destroy.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                path: "contacts/:contactId",
                element: <Contact />,
                loader: contactLoader
            },
            {
                path: "contacts/:contactId/edit",
                element: <EditContact />,
                loader: contactLoader,
                action: editAction
            },
            {
                path: "contacts/:contactId/destroy",
                action: destroyAction
            }
        ]
    },

]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ChakraProvider>
          <RouterProvider router={router} />
      </ChakraProvider>
  </React.StrictMode>
)
