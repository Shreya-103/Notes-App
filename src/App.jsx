import { useState, useEffect } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [task, setTask] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
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

    const newTask = [
      ...task,
      {
        title,
        content,
        pinned: false,
      },
    ];

    setTask(newTask);
    setTitle("");
    setContent("");
  };

  const deleteNote = (idx) => {
    const copyTask = [...task];
    copyTask.splice(idx, 1);
    setTask(copyTask);
  };

  const togglePin = (idx) => {
    const updatedTask = [...task];
    updatedTask[idx].pinned = !updatedTask[idx].pinned;
    setTask(updatedTask);
  };

  const openNote = (note, idx) => {
    setSelectedNote(idx);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const saveChanges = () => {
    const updatedTask = [...task];

    updatedTask[selectedNote] = {
      ...updatedTask[selectedNote],
      title: editTitle,
      content: editContent,
    };

    setTask(updatedTask);
    setSelectedNote(null);
  };

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div className="container">
        <form onSubmit={submitHandler}>
          <h1>Add Your Notes</h1>

          <input
            type="text"
            placeholder="Enter heading"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Enter your content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button type="submit">Add Note</button>
        </form>

        <div className="card-holder">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search notes..."
              className="searchBox"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              type="button"
              className="mood"
              onClick={toggleMode}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>

          {[...task]
            .sort((a, b) => b.pinned - a.pinned)
            .filter(
              (note) =>
                note.title.toLowerCase().includes(search.toLowerCase()) ||
                note.content.toLowerCase().includes(search.toLowerCase())
            )
            .map((elem, idx) => (
              <div
                key={idx}
                className="card"
                onClick={() => openNote(elem, idx)}
              >
                <h5
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(idx);
                  }}
                >
                  ❌
                </h5>

                <p
                  className="pinn"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePin(idx);
                  }}
                >
                  {elem.pinned ? "📌" : "📍"}
                </p>

                <h3>{elem.title}</h3>

                <p>{elem.content}</p>
              </div>
            ))}
        </div>
      </div>

      {selectedNote !== null && (
        <div
          className="modalOverlay"
          onClick={() => setSelectedNote(null)}
        >
          <div
            className="modalCard"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="closeBtn"
              onClick={() => setSelectedNote(null)}
            >
              ✖
            </span>

            <input
              className="editTitle"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <textarea
              className="editContent"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />

            <button
              className="saveBtn"
              onClick={saveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;