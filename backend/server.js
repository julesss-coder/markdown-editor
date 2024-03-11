const express = require('express');
const cors = require('cors');
const fs = require('node:fs/promises');
const port = 3000;

const app = express();
// Enable all CORS requests
app.use(cors());
app.use(express.json());

// === ENDPOINTS ===
// GET all notes: "/notes"

// Using the Promise-based API: async/await
app.get("/notes", async (request, response) => {
    try {
        // When reading a JSON file from the filesystem in NodeJS using `fs.readFile()`, 
        // the data you get is a string, not a JS object. Even though this string is in 
        // JSON format, JS treats it as a plain string. So you cannot directly access the
        // properties of this object.
        // In order to access its properties, you need to convert the JSON string into a JS object
        // using (JSON.parse()).
        // When finished working with the JS object, you need to convert the JS object back to 
        // a JSON string, as HTTP is a text-based protocol that deals with strings, not JS objects. 
        // This conversion from JS to JSON is done by Express' response.json() method.
        // So, the process is: read JSON string from file -> parse JSON string to JavaScript object -> manipulate data as needed -> convert JavaScript object back to JSON string -> send JSON string as HTTP response.
        const data = await fs.readFile('data/notes.json', { encoding: 'utf-8' });
        // `data` is already a JSON string, so I don't need to use `response.json()` to convert is to JSON before sending.
        response.type('application/json');
        response.send(data);
    } catch (error) {
        console.error(error);
        response.status(500).json({error}); // TODO Is this the correct status code?
    }
});

// DONE
app.post("/notes", async (request, response) => {
    const newNote = request.body;

    // Validate new note
    if (newNote.id == null) {
        return response.status(400).json({error: 'Invalid note format - id missing'});
    }
    let notes;
    
    try {
        notes = await fs.readFile('data/notes.json', {encoding: 'utf-8'});
        notes = JSON.parse(notes);
        notes[newNote.id] = newNote;
        
        try {
            await fs.writeFile('data/notes.json', JSON.stringify(notes, null, 2), {encoding: 'utf-8'});
            response.status(201).json(newNote);
        } catch (error) {
            console.error(error);
            response.status(501).json({error: 'Error posting new note to database.'});
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({error: 'Error fetching notes before updating them.'});
    }
});

// GET a note with a specific ID
// DONE
app.get("/notes/:id", async (request, response) => {
    const { id } = request.params; 
    let notes;

    // get all notes from file
    try {
        notes = await fs.readFile('data/notes.json', { encoding: 'utf-8' });
    } catch (error) {
        console.error(error);
        response.status(500).json({error: 'Error reading notes'});
        return;
    }
    
    // if note with this id exists, send it
    notes = JSON.parse(notes);
    try {
        response.send(notes[id]);
    // else, send error message
    } catch (error) {
        console.error(error);
        response.status(500).json({error: 'Error: Note not found'});
        return;
    }
});

// Update a note
app.put('/notes/:id', async (request, response) => {
    const updatedNote = request.body;
    const id = updatedNote.id;

    let notes;
    try {
        notes = await fs.readFile('data/notes.json', {encoding: 'utf-8'});
    } catch (error) {
        console.error(error);
        response.status(500).json({error: 'Error reading notes'});
        return;
    }

    try {
        notes = JSON.parse(notes);
        notes[updatedNote.id] = updatedNote;
        console.log("notes after updating: ", notes);

        try {

            await fs.writeFile('data/notes.json', JSON.stringify(notes, null, 2), {encoding: 'utf-8'});
            response.status(200).json(notes);
        } catch (error) {
            console.error(error);
            response.status(500).json({error: 'Error updating note'});
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({error: 'Error updating note'});
    }
});

app.listen(port, () => {
    console.log("app listening on port ", port);
});
