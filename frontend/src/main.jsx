import React from 'react'
import ReactDOM from 'react-dom/client'
import Note, { noteDetailsLoader } from './pages/Note.jsx';
import Home from './pages/Home.jsx';
import './index.css';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.jsx';
import NewNote from './pages/NewNote.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
      loader={
        async ({ params }) => {
          let response = await fetch(`http://localhost:3000/notes`);
          let data = await response.json();
          return data;
        }
      }>
      <Route index element={<Home />} />
      <Route
        path="/new"
        element={<Note />}
        // loader={async ({ params }) => {
        //   let response = await fetch(`http://localhost:3000/notes`);
        //   let data = await response.json();
        //   return data;
        // }}
        loader={async ({ params }) => {
          console.log(params);

          const responseNew = await fetch('http://localhost:3000/new');
          const dataNew = await responseNew.json();
          console.log("dataNew: ", dataNew);

          // First fetch request
          const response1 = await fetch('http://localhost:3000/notes');
          // TODO restructure data so destructuring is not necessary
          const {notes} = await response1.json();

          console.log("notes: ", notes);

          let nextId = Object.keys(notes).length > 0 ? (Math.max(...Object.keys(notes).map(stringId => +stringId)) + 1) : 0;
          console.log("nextId: ", nextId);


          const newNote = {
            "id": nextId,
            "title": "",
            "content": "",
            "created": Date.now(),
            "updated": Date.now()
          };

          // const response = await fetch('http://localhost:3000/notes', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify(newNote),
          // });
          // const data = await response.json();
          // console.log('data: ', data);
          // return data;
          return null;
        }}
      // Alternativ: erzeuge random id, mache POST request an Datenbank
      />
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
