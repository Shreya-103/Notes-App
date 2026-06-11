import { useState, useEffect } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [task, setTask] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (!savedTasks) return [];

    return JSON.parse(savedTasks).map((note, index) => ({
      id: note.id || `legacy-${Date.now()}-${index}`,
      ...note,
    }));
  });

  const [search, setSearch] = useState("");

  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  const [selectedNote, setSelectedNote] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    const newNote = {
      id: crypto.randomUUID(),
      title,
      content,
      pinned: false,
    };

    setTask([...task, newNote]);

    setTitle("");
    setContent("");
  };

  const deleteNote = (id) => {
    setTask((prev) => prev.filter((note) => note.id !== id));

    if (selectedNote === id) {
      setSelectedNote(null);
    }
  };

  const togglePin = (id) => {
    setTask((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
            ...note,
            pinned: !note.pinned,
          }
          : note
      )
    );
  };

  const openNote = (note) => {
    setSelectedNote(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const saveChanges = () => {
    setTask((prev) =>
      prev.map((note) =>
        note.id === selectedNote
          ? {
            ...note,
            title: editTitle,
            content: editContent,
          }
          : note
      )
    );

    setSelectedNote(null);
  };

  const toggleMode = () => {
    setDarkMode((prev) => !prev);
  };

  const sortedTasks = [...task]
    .sort((a, b) => {
      if (a.pinned === b.pinned) return 0;
      return a.pinned ? -1 : 1;
    }).filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <>
      <div className="container">
        <form onSubmit={submitHandler}>
          <h1>Add Your Notes</h1>
          <input type="text" placeholder="Enter heading" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea placeholder="Enter your content here" value={content} onChange={(e) => setContent(e.target.value)} />
          <button type="submit">Add Note</button>
        </form>

        <div className="card-holder">
          <div className="search-bar">
            <input type="text" placeholder="🔍 Search notes..." className="searchBox" value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button type="button" className="mood" onClick={toggleMode} >
              {darkMode ? "🔆" : "🌙"}
            </button>
          </div>

          {sortedTasks.map((elem) => (
            <div key={elem.id} className="card" onClick={() => openNote(elem)} >
              <h5 onClick={(e) => {
                e.stopPropagation();
                deleteNote(elem.id);
              }}
              > ❌ </h5>

              <p className="pinn" onClick={(e) => {
                e.stopPropagation();
                togglePin(elem.id);
              }}
              > {elem.pinned ? "📌" : "📍"}
              </p>

              <h3>{elem.title}</h3>
              <p>{elem.content}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedNote && (
        <div className="modalOverlay" onClick={() => setSelectedNote(null)} >
          <div className="modalCard" onClick={(e) => e.stopPropagation()} >
            <span className="closeBtn" onClick={() => setSelectedNote(null)} >  ✖  </span>

            <input className="editTitle" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />

            <textarea className="editContent" value={editContent}
              onChange={(e) => setEditContent(e.target.value)} />

            <button className="saveBtn" onClick={saveChanges} > Save Changes</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;