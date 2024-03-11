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
      // DONE
      loader={
        async ({ params }) => {
          try {
            let response = await fetch(`http://localhost:3000/notes`);

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            let data = await response.json();
            console.log(data);
            return data;
          } catch (error) {
            console.error(error);
            return error;
          }
        }
      }
      >
      <Route index element={<Home />} />
      <Route
        path="/new"
        element={<Note />}
        loader={async ({ params }) => {
          console.log("params in /new: ", params);
          let notes;

          try {
            // Get all notes to get the next id
            const responseAllNotes = await fetch('http://localhost:3000/notes');

            if (!responseAllNotes.ok) {
              throw new Error(`HTTP error! status: ${response.status}`); // Where is this error caught? In the catch block?
            }

            notes = await responseAllNotes.json();
            console.log("notes: ", notes);
          } catch (error) {
            console.error(error);
            return error;
          }

          // Add error handling. If error, create random id. Replace in Note?

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

          // Redo POST endpoint before fixing this
          const response = await fetch('http://localhost:3000/notes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNote),
          });
          const data = await response.json();
          console.log('data: ', data);
          return data;
        }}
      />
      <Route
        path="/:id"
        element={<Note />}
        // DONE
        loader={async ({ params }) => {
          let response = await fetch(`http://localhost:3000/notes/${params.id}`);
          let data = await response.json();
          return data;
        }}
      />

      {/* Error handling */}
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
