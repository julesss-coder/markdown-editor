import { useState, useCallback, useEffect, useRef} from 'react';
import { useParams, useLoaderData, useNavigate} from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Note = () => {
  // `id` is only available when opening an existing note, not when opening a new note (assumption: when editing a new note, we are still at path /new, not path /:id. id is returned by useParams())
  // const { id } = useParams();
  const currentNote = useLoaderData();
  const noteId = currentNote.id;
  const timerRef = useRef();
  const navigate = useNavigate();


  // This only sets the initial value of note, does not update each time the value of `currentNote` changes.
  const [note, setNote] = useState(currentNote);

  useEffect(() => {
    setNote(currentNote);
  }, [currentNote]);

  const editNote = useCallback((e) => {
    const updatedNote = { ...note, content: e.target.value};
    setNote(updatedNote);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      saveNote(updatedNote);
    }, 1000);
  }, [note]);

    
  const editNoteTitle = useCallback((e) => {
    const updatedNote = { ...note, title: e.target.value };
    setNote(updatedNote);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      saveNote(updatedNote);
    }, 1000);
  }, [note]);

  const deleteNote = async (e) => {
    try {
      const response = await fetch(`http://localhost:3000/notes/${note.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const data = await response.json();
        // Navigate to home page only AFTER delete request is finished, as home page loader fetches all notes and it needs to fetch the current version
        navigate('/');
      }
    } catch (error) {
      console.log('Error deleting note.');
      console.error(error);
      navigate('/');
    }

    // TODO Display message that note was successfully deleted? Check Obsidian.
    // navigate('/');
  };
  
  const saveNote = async (note) => {
    try {
      const response = await fetch(`http://localhost:3000/notes/${note.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log('Error saving note.');
      console.error(error);
    }
  };

  console.log("note: ", note);
  console.log("--- Note rerenders ---");

  
  return (
    <main className="note-editor">
      <div className="note" key={note.id}>
        <nav className="note-nav">
          <li onClick={(e) => deleteNote(e)}>
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