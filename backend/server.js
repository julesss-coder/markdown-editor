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
    // response.json(JSON.parse(data));
    

    // fs.readFile('data/notes.json', 'utf8', (error, data) => {
    //     if (error) {
    //         console.error(error);
    //         response.status(500).json({error: 'Error reading notes'});
    //     } else {
    //         response.json(JSON.parse(data));
    //     }
    // });
});

app.post("/notes", (request, response) => {
    const newNote = request.body;
    console.log("newNote in app.post: ", newNote);

    fs.readFile('data/notes.json', 'utf8', (error, data) => {
        if (error) {
            console.error(error);
            response.status(500).json({error: 'Error reading notes'});
        } else {
            const notes = JSON.parse(data);
            console.log("NOTES: ", notes);
            notes.notes[newNote.id] = newNote;
            
            // notes.push(newNote);

            fs.writeFile('data/notes.json', JSON.stringify(notes, null, 2), (error) => {
                if (error) {
                    console.error(error);
                    response.status(500).json({error: 'Error writing note'});
                } else {
                    response.json(newNote);
                }
            });
        }
    });
});

// GET a note with a specific ID
app.get("/notes/:id", (request, response) => {
    const { id } = request.params; 
    fs.readFile('data/notes.json', 'utf8', (error, data) => {
        if (error) {
            console.error(error);
            response.status(500).json({error: 'Error reading notes'});
        } else {
            const { notes } = JSON.parse(data);
            if (notes[id]) {
                response.json(notes[id]);
            } else {
                response.status(404).json({error: 'Note not found'});
            }
        }
    });
});

// What happens with GET request to /new?
app.get("/new", (request, response) => {
    response.send(JSON.stringify("request to /new received"));
});

app.listen(port, () => {
    console.log("app listening on port ", port);
});
