import { useState, useCallback, useEffect } from 'react';
import { useParams, useLoaderData } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Note = () => {
  const { id } = useParams();
  const currentNote = useLoaderData();
  // This only sets the initial value of note, does not update each time the value of `currentNote` changes.
  const [note, setNote] = useState(currentNote);

  useEffect(() => {
    setNote(currentNote);
  }, [currentNote]);

  const editNote = useCallback((e) => {
    const updatedNote = { ...note, content: e.target.value };
    setNote(updatedNote);
    saveNote(updatedNote);
  }, [note]);

    
  const editNoteTitle = useCallback((e) => {
    const updatedNote = { ...note, title: e.target.value };
    setNote(updatedNote);
    saveNote(updatedNote);
  }, [note]);
  
  const saveNote = async (note) => {
    const response = await fetch(`http://localhost:3000/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  };
  
  return (
    <main className="note-editor">
      <div className="note" key={id}>
        <nav className="note-nav">
          <li onClick={(e) => deleteNote(e, id)}>
            <a href="#">Delete file</a>
          </li>
        </nav>
        <input className='note-title' value={note.title} onChange={(e) => editNoteTitle(e)} placeholder="Title"></input>
        <small className='note-created'>Created: {note.created}</small>
        <br />
        <small className='note-last-updated'>Last updated: {note.updated}</small>
        <textarea className='note-content' onChange={(e) => editNote(e)} value={note.content} placeholder="Note content"></textarea>
      </div>
      
      <ReactMarkdown className="markdown-display" remarkPlugins={[remarkGfm]} onChange={(e) => editNote(id, e)}>
        {note.content || ''}
      </ReactMarkdown>
    </main>
  )
};

export default Note;

export const noteDetailsLoader = () => {
  console.log("noteDetailsLoader() runs");
  return null;
};