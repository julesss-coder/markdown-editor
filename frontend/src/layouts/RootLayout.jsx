import { useEffect, useState } from "react";
import { Outlet, NavLink, useLoaderData } from "react-router-dom";

const RootLayout = () => {
  const { notes } = useLoaderData();
  console.log("loadedNotes: ", notes);

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
            {notes && notes.map((note) => (
              <>
                <NavLink to={`/${note.id}`} key={note.id}>{note.title}</NavLink>
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