import { useState, useCallback, useEffect } from 'react';
import { useParams, useLoaderData } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const NewNote = () => {
  const allNotes = useLoaderData();
  console.log("allNotes: ", allNotes);

  let nextId = Object.keys(allNotes).length > 0 ? (Math.max(...Object.keys(allNotes).map(stringId => +stringId)) + 1) : 0;
  console.log("nextId: ", nextId);

  const [newNote, setNewNote] = useState({
    "id": nextId,
    "title": "",
    "content": "",
    "created": Date.now(),
    "updated": Date.now()
  });

  /*
  On clicking new file, newNote is rendered
  On loading this page, create a new Note and add it to notes in database
  */

  return (
    <main className="note-editor">
      <div className="note" key={newNote.id}>
        <nav className="note-nav">
          <li onClick={(e) => deleteNote(e, id)}>
            <a href="#">Delete file</a>
          </li>
        </nav>
        <input className='note-title' value={newNote.title} onChange={(e) => editNoteTitle(e)} placeholder="Title"></input>
        <small className='note-created'>Created: {newNote.created}</small>
        <br />
        <small className='note-last-updated'>Last updated: {newNote.updated}</small>
        <textarea className='note-content' onChange={(e) => editNote(e)} value={newNote.content} placeholder="Note content"></textarea>
      </div>

      <ReactMarkdown className="markdown-display" remarkPlugins={[remarkGfm]} onChange={(e) => editNote(id, e)}>
        {newNote.content || ''}
      </ReactMarkdown>
    </main>
  )
};

export default NewNote;

export const noteDetailsLoader = () => {
  console.log("noteDetailsLoader() runs");
  return null;
};