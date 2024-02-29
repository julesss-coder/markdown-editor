import React from 'react'
import ReactDOM from 'react-dom/client'
import Note, { noteDetailsLoader } from './pages/Note.jsx';
import Home from './pages/Home.jsx';
import './index.css';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} loader={
      async ({ params }) => {
        console.log("params in RootLayout loader: ", params);
        let response = await fetch(`http://localhost:3000/notes`);
        let data = await response.json();
        return data;
      }
    }>
      <Route index element={<Home />} />
      <Route path="/new" element={<Note />} />
      <Route
        path="/:id"
        element={<Note />}
        loader={async ({ params }) => {
          let response = await fetch(`http://localhost:3000/notes/${params.id}`);
          let data = await response.json();
          return data;
        }}
      />

      {/* Error handling */}
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
