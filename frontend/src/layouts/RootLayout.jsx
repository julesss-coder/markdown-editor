import { useEffect, useState } from "react";
import { Outlet, NavLink, useLoaderData } from "react-router-dom";


// RootLayout needs to be informed of every change to notes titles (PUT), and deletion of notes (DELETE), and adding of new note (POST). 
// Option 1: Polling the server every few seconds - CURRENT SOLUTION
// Option 2: WebSockets
// Option 3: Server-sent events
const RootLayout = () => {
  let loadedNotes = useLoaderData(); // TODO handle the case where `notes` is actually an error
  const [notes, setNotes] = useState(loadedNotes);

  useEffect(() => {
    const fetchNotesTimer = setInterval(async() => {
      try {
        let response = await fetch(`http://localhost:3000/notes`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();
        setNotes(data);
        console.log("notes loaded in / path: ", data);
        // return data;
      } catch (error) {
        console.error(error);
        // return error;
      }
    }, 5000);


    // Clean up interval
    return () => {
      clearInterval(fetchNotesTimer);
    }
  }, []);


  // TODO Titles in Sider need to update when changed. => use action callback and useActionData hook to solve this?



  // const [notes, setNotes] = useState(loadedNotes);
  // // State with current files goes here
  // useEffect(() => {
  //   const fetchNotes = async () => {
  //     const response = await fetch('http://localhost:3000/notes');
  //     const data = await response.json();

  //     // Get highest note id - do that on creating new note
  //     // let ids = Object.values(data).map(item => {
  //     //   return +item.id;
  //     // });
  //     // console.log(Math.max(...ids));


  //     setNotes(data);
  //   };

  //   fetchNotes();
  // }, []);

  // 

  return (
    <>
      <div className="app-container">
        {/* Navbar */}
        <div className="sidebar root-layout">
          {/* This nav goes inside the Sider */}
          <header>
            <nav>
              <NavLink to="/">Home</NavLink>
              <br />
              <NavLink to="/new">New file</NavLink>
              <br />

              {/* Does this work? */}
              {notes && Object.values(notes).map((note) => (
                <>
                  <NavLink to={`/${note.id}`} key={note.id}>{note.title ? note.title : 'Untitled'}</NavLink>
                  <br />
                </>
              ))}
            </nav>
          </header>
        </div>

        {/* Content outlet, next to Sider */}
        <Outlet />

      </div>
    </>
  );
};

export default RootLayout;