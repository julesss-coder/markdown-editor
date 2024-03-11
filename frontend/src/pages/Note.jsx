import { useState, useCallback, useEffect } from 'react';
import { useParams, useLoaderData } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Note = () => {
  const { id } = useParams();
  const currentNote = useLoaderData();
  console.log("id, currentNote: ", id, currentNote);


  // This only sets the initial value of note, does not update each time the value of `currentNote` changes.
  const [note, setNote] = useState(currentNote);

  useEffect(() => {
    setNote(currentNote);

    // TODO This is not correct, saves the note with the wrong id
    return () => {
      console.log("saveNote() runs, with note.id: ", note.id);
      saveNote(note);
    }
  }, [currentNote]);

  // TODO Redo editing and saving using server.js
  const editNote = useCallback((e) => {
    const updatedNote = { ...note, content: e.target.value };
    setNote(updatedNote);
    // saveNote(updatedNote);
  }, [note]);

    
  const editNoteTitle = useCallback((e) => {
    const updatedNote = { ...note, title: e.target.value };
    setNote(updatedNote);
    // saveNote(updatedNote);
  }, [note]);
  
  const saveNote = async (note) => {
    console.log("note.id: ", note.id);
    const response = await fetch(`http://localhost:3000/notes/${note.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });

    console.log("response in saveNote(): ", response);
    
    // TODO Is this correct error handling?
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  };

  console.log("--- Note rerenders ---");
  console.log("note.id: ", note.id);
  
  return (
    <main className="note-editor">
      <div className="note" key={note.id}>
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