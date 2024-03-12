import React from 'react'
import ReactDOM from 'react-dom/client'
import Note from './pages/Note.jsx';
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
          console.log("loader for path / runs");
          try {
            let response = await fetch(`http://localhost:3000/notes`);

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            let data = await response.json();
            console.log("notes loaded in / path: ", data);
            return data;
          } catch (error) {
            console.error(error);
            return error;
          }
        }
      }
      >
      <Route index element={<Home />} />
      {/* DONE */}
      <Route
        path="/new"
        element={<Note />}
        loader={async ({ params }) => {
          let notes;

          try {
            // Get all notes to get the next id
            const responseAllNotes = await fetch('http://localhost:3000/notes');

            if (!responseAllNotes.ok) {
              throw new Error(`HTTP error! status: ${responseAllNotes.status}`);
            }

            notes = await responseAllNotes.json();
          } catch (error) {
            console.error(error);
            return error; // Should I return redirect() here?
          }

          let nextId = Object.keys(notes).length > 0 ? (Math.max(...Object.keys(notes).map(stringId => +stringId)) + 1) : 0;

          const newNote = {
            "id": nextId,
            "title": "",
            "content": "",
            "created": Date.now(),
            "updated": Date.now()
          };

          const response = await fetch('http://localhost:3000/notes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNote),
          });
          const data = await response.json();
          console.log("data after posting new note: ", data);
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
          console.log("data after loading note: ", data);
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
