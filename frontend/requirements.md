# Obsidian Clone

## Requirements
- Must use
    - React
    - NodeJS
    - Express
    - MySQL
    - RESTful API


Notes contain:
- Title
- Content
- Date created
- Date last updated
- Tags

### Desired functionality
- Format: Markdown
- Create database for user notes
- Display folders and contents of database in side pane
- On click on note, display note in main window
- Edit note
- Create note
- Delete note

### Version 1
- [ ] Create note
- [x] Read note
- [x] Update note
- [ ] Delete note
- [x] save note in db.json
- Sider when expanded:
   - Navbar with "new file", "new folder"
   - Shows all files and folders
- display all notes in side pane
- Notes should be in Markdown
- Links should be by note id, not index, because in notes array in db.json, deleting notes can change indices. On creating new note, highest id has to be incremented

### Version 2 - Fullstack version
- [x] Create note and save in notes.db
   -  [x] Must also work if no notes exist yet
- [x] Read note(s) from notes.db
- [ ] Update note and save in notes.db
- [ ] Delete note and save update to notes.db
   - [ ] What to render when note is deleted? 
- [ ] notes.db is an object with notes ids
- [ ] Set error state in Note component and render error message when error occurs. OR Create error component that is rendered in place of note
- [ ] Sider should be updated when note title is changed

TODO Create Error page

### Layout
#### Home
- Sider
- No file is open
#### New
- Sider
- New note
#### Note id
- Sider
- Note with the chosen id

-- Set up version 1, continue with NetNinja course on React
-- This is almost exactly like a todo list


### Later versions
- Create folder
- Create graph that shows how posts are grouped around tags and related to each other

### Qs to Chat GPT

Q: Is it possible to create a frontend with React where the user can create and edit md files?

A: Yes, it is entirely possible to create a frontend with React where users can create and edit Markdown (`.md`) files. Markdown is a lightweight markup language with plain-text formatting syntax, often used for creating formatted documents that can be easily converted to HTML.

To implement this functionality, you can follow these general steps:

1. **React Components**: Create React components for displaying the Markdown content and for providing editing capabilities. You may use libraries like `react-markdown` for rendering Markdown content and `react-markdown-editor-lite` for Markdown editing.

2. **State Management**: Manage the state of the Markdown content within your React application. When the user creates or edits a Markdown file, update the state accordingly.

3. **CRUD Operations**: Implement Create, Read, Update, and Delete (CRUD) operations for Markdown files. Use appropriate APIs to handle file creation, reading, updating, and deletion on the frontend.

4. **File Management**: Implement file management features such as saving Markdown files, loading existing files, renaming files, and deleting files. You can use browser APIs like the File System Access API or interact with a backend server for file storage.

5. **Preview Mode**: Provide a preview mode where users can see a rendered preview of the Markdown content as HTML. You can achieve this by rendering the Markdown content using a Markdown parser in real-time.

6. **Integration with Backend (Optional)**: If you need to store Markdown files persistently or perform server-side operations, integrate your React frontend with a backend server built with Node.js. The backend can handle file storage, retrieval, and other operations.

Here's a basic example of how you might structure your React components:

```jsx
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';

const MarkdownEditorComponent = () => {
  const [markdownContent, setMarkdownContent] = useState('# Edit your Markdown here');

  const handleEditorChange = ({ text }) => {
    setMarkdownContent(text);
  };

  return (
    <div>
      <MarkdownEditor value={markdownContent} onChange={handleEditorChange} />
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
};

export default MarkdownEditorComponent;
```

In this example, `MarkdownEditorComponent` is a React component that includes both an editor (using `react-markdown-editor-lite`) and a preview section (using `react-markdown`). The state `markdownContent` holds the current Markdown content, and the `handleEditorChange` function updates this state when the user edits the content.

You can expand upon this example to add more features and integrate it with your desired backend or file storage solution as needed.

---

Q: Is it possible to expand a frontend project, where data is store in react state, into a fullstack project, where is requested from an api and store in mysql database?

A: Yes, it is possible to expand a frontend project where data is stored in React state into a full-stack project where data is requested from an API and stored in a MySQL database. Here's how you can achieve this:

1. **Backend Development (Node.js with Express)**:
   - Set up a backend server using Node.js and Express.js.
   - Create API routes to handle CRUD operations for your data. These routes will handle requests from the frontend and interact with the MySQL database.
   - Install necessary packages such as `express`, `mysql`, and `body-parser` for handling HTTP requests and database interactions.
   - Connect your Node.js application to the MySQL database using a library like `mysql` or an ORM (Object-Relational Mapping) library like `sequelize` or `knex`.

2. **Database Setup (MySQL)**:
   - Set up a MySQL database to store your application data.
   - Define database schema including tables and relationships based on your application's data model.

3. **API Integration (Frontend)**:
   - Modify your React frontend to consume data from the backend API instead of directly manipulating React state.
   - Update your React components to make HTTP requests (e.g., using `fetch` or libraries like `axios`) to the backend API endpoints for fetching, creating, updating, and deleting data.
   - Replace the existing state management code with code that updates the UI based on the data received from the backend.

4. **API Implementation (Backend)**:
   - Implement the API routes on the backend to handle requests from the frontend.
   - Define controller functions for each API endpoint to interact with the MySQL database.
   - Handle incoming requests, perform necessary database operations (e.g., querying, inserting, updating, deleting data), and send appropriate responses back to the frontend.

5. **Data Persistence (Backend)**:
   - Modify the controller functions to interact with the MySQL database. This includes executing SQL queries to fetch, insert, update, or delete data.
   - Ensure proper error handling and validation of incoming data to maintain data integrity.

6. **Testing and Deployment**:
   - Test your full-stack application to ensure that data flows correctly between the frontend, backend, and database.
   - Deploy your backend server and MySQL database to a hosting provider.
   - Deploy your React frontend to a hosting provider or static site hosting service.

By following these steps, you can expand your frontend project into a full-stack project where data is fetched from an API and stored in a MySQL database, allowing for more scalable and robust applications.

///

Your plan for handling the creation and updating of notes in a React application seems solid. Here's a breakdown:

Create new empty note in loader. This is a good approach. When the user navigates to "/new", you can create a new note object with default values.

Send POST request to "/notes" with new note. This is the correct way to add a new note to your server. Make sure the new note object includes all the necessary fields required by your server.

Save it in React state in Note component. Storing the note in the state of the Note component will allow you to easily update the note as the user makes changes.

When user makes changes to note, send PUT request to "/notes/id", sending updated note. This is the correct way to update an existing note on your server. Make sure to replace "id" with the actual ID of the note.

One thing to consider is error handling. You should have a plan for handling any errors that might occur during the fetch requests, such as network errors or server errors. This could be as simple as displaying an error message to the user, or it could involve more complex error recovery procedures.

Also, consider what should happen after the note is successfully created or updated. For example, you might want to navigate the user back to the list of notes, or clear the form so the user can create another note.

Overall, your plan is well thought out and follows best practices for working with a RESTful API in a React application.