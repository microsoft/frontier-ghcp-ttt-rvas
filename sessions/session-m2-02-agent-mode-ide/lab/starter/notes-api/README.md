# notes-api

A small in-memory notes API built with Express.

```bash
npm install
npm test
npm start
```

## Endpoints

| Method | Route | Description |
| --- | --- | --- |
| GET | `/api/notes` | List notes. `?q=` searches title and body. |
| GET | `/api/notes/:id` | Get one note. |
| POST | `/api/notes` | Create a note. `title` is required. |
| PUT | `/api/notes/:id` | Update a note. |
| DELETE | `/api/notes/:id` | Delete a note. |
