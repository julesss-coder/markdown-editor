const express = require('express');
const cors = require('cors');
const fs = require('fs');
const port = 3000;

const app = express();
// Enable all CORS requests
app.use(cors());
app.use(express.json());

// app.get("/", (request, response) => {
//     console.log("request: ", request.body);
//     response.send(JSON.stringify("hello, world!"));
// });


// ENDPOINTS
// GET all notes: "/notes"
app.get("/notes", (request, response) => {
    fs.readFile('data/notes.json', 'utf8', (error, data) => {
        if (error) {
            console.error(error);
            response.status(500).json({error: 'Error reading notes'});
        } else {
            response.json(JSON.parse(data));
        }
    });
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
})

// What happens with GET request to /new?
app.get("/new", (request, response) => {
    response.send(JSON.stringify("request to /new received"));
})

// React to POST request
// app.post("/notes", (request, response) => {
//     console.log("post request received");
//     const note = request.body;
//     console.log("note: ", note);
//     // fs.readFile('data/notes.json', 'utf8', (error, data) => {
//     //     if (error) {
//     //         console.error(error);
//     //         response.status(500).json({error: 'Error reading notes'});
//     //     } else {
//     //         const notes = JSON.parse(data);
//     //         notes.push(note);
//     //         fs.writeFile('data/notes.json', JSON.stringify(notes), 'utf8', (error) => {
//     //             if (error) {
//     //                 console.error(error);
//     //                 response.status(500).json({error: 'Error writing note'});
//     //             } else {
//     //                 response.status(201).json({message: 'Note written successfully'});
//     //             }
//     //         });
//     //     }
//     // });
// });

app.listen(port, () => {
    console.log("app listening on port ", port);
});
