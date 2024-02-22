import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState } from 'react';


const App = () => {
  const [notes, setNotes] = useState([
    {
      id: Math.random(),
      title: "Test note",
      content: "Hello, earthside humans!",
      created: Date.now(),
      updated: Date.now()
    }
  ]);
  const markdown = "# Hi, *Pluto*! url: www.pluto.com";
  /*
  create a store with 1 note
  render note
  */

  return (
    <div className="app-container">
      {/* Sidebar: Icon that expands sidebar */}
      <nav className='main-menu'>
        <ul>
          <li>
            <a href="#">Expand</a>
          </li>
        </ul>
      </nav>
      <div className="sidebar">
        <nav className="sidebar-menu">
          <ul>
            <li>
              <a href="#">New file</a>
            </li>
            <li>
              <a href="#">New folder</a>
            </li>
          </ul>
        </nav>
        <div className="vault-contents">Folders and files</div>
      </div>
      <main className="note-editor">
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        {notes ? (
          notes.map(note => (
            <div key={note.id}>
              <h1>{note.title}</h1>
              <small>Created: {note.created}</small>
              <br />
              <small>Last updated: {note.updated}</small>
              <div>{note.content}</div>
            </div>
          ))
        ) :
          "No notes created yet."
        }
      </main>
    </div>
    // <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
  );
};

export default App;