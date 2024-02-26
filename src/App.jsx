import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState } from 'react';


const App = () => {
  const [notes, setNotes] = useState({
    // Using numeric and incrementing (by 1) keys as ids because in case of a large number of notes, this allows constant time lookups and updates.
    0: {
      id: 0,
      title: "Test note",
      content: "Hello, earthside humans!",
      created: Date.now(),
      updated: Date.now()
    }
  });

  // Upon opening, first note is shown
  const [editId, setEditId] = useState(0);


  const markdown = "# Hi, *Pluto*! url: www.pluto.com";

  const createNote = () => {
    // Get highest numerical id in notes object and increment by 1 to create next id
    let lastId = Math.max(...Object.keys(notes).map(stringId => +stringId));
    lastId++;

    setNotes({
      ...notes, 
      [lastId]: {
        id: lastId,
        title: "",
        content: "",
        created: Date.now(),
        updated: Date.now()
      }
    });
    // TODO Upon creating a new note, title should be highlighted and ready to edit
    // For now, user has to click into content field to edit new note - so I can separate creating and editing a note
    setEditId(lastId);
  };

  const editNote = (id, e) => {
    setEditId(id);

    const updatedNotes = Object.values(notes).map(note => {
      if (note.id === id) {
        return {...note, content: e.target.value};
      } else {
        return note;
      }
    });

    setNotes(updatedNotes);
  };

  const editNoteTitle = (id, e) => {
    setEditId(id);

    const updatedNotes = Object.values(notes).map(note => {
      if (note.id === id) {
        return {...note, title: e.target.value};
      } else {
        return note;
      }
    });

    setNotes(updatedNotes);
  };



  console.log("notes: ", notes);

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
            <li onClick={createNote}>
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
        {/* Display the note by the id of the one clicked/created */}
        {/* Currently showing the last note because I'm working on creating a new note */}
        {notes ? (
          
            <div className="note" key={notes[editId].id}>
              <input className='note-title' value={notes[editId].title} onChange={(e) => editNoteTitle(notes[editId].id, e)}></input>
              <small className='note-created'>Created: {notes[editId].created}</small>
              <br />
              <small className='note-last-updated'>Last updated: {notes[editId].updated}</small>
              <textarea className='note-content' onChange={(e) => editNote(notes[editId].id, e)} value={notes[editId].content}></textarea>
            </div>

        ) :
          "No notes created yet."
        }
      </main>
    </div>
    // <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
  );
};

export default App;