import { useState } from 'react'
import { useEffect } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const [content, addContent] = useState('');
  const [task, addTask] = useState(()=>{
     const savedTasks = localStorage.getItem("tasks");
     return savedTasks ? JSON.parse(savedTasks): [];
  });

  const [search, setSearch] = useState('');

const searchNote = (e) => {
  setSearch(e.target.value);
}


  useEffect(()=>{
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  const submitHandler = (e)=>{
    e.preventDefault();
    
    const newTask = [...task];
    
    newTask.push({
  title,
  content,
  pinned: false
});
    addTask(newTask);
    setTitle('');
    addContent('');
  }

  const deleteNote = (idx)=>{
    const copyTask = [...task];
    copyTask.splice(idx, 1);
    addTask(copyTask);
  }
  const togglePin = (idx) => {
  const updatedTask = [...task];

  updatedTask[idx].pinned = !updatedTask[idx].pinned;

  addTask(updatedTask);
}


const [darkMode, setDarkMode] = useState(() => {
  return JSON.parse(localStorage.getItem("darkMode")) || false;
});  
useEffect(() => {
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
}, [darkMode]);
  const toggleMode = () => {
  setDarkMode(!darkMode);
};

useEffect(() => {
  if (darkMode) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}, [darkMode]);

  return(
    <>
    <div className='container'>
       <form action="">
        <h1>Add Your Notes</h1>
          <input type="text" placeholder='Enter heading' value={title}
            onChange={(e)=>{
              setTitle(e.target.value);
            }}
          />
          <textarea name="content" id="content" placeholder='enter your content here' value={content}
             onChange={(e)=>{
               addContent(e.target.value);
              }}
          ></textarea>
          <button onClick={submitHandler}>Add Note</button>
       </form>
       <div className='card-holder'>
              <div className='search-bar'>
              <input type="text" placeholder='search notes' className='searchBox' onChange={searchNote}/>
              <button className='mood' onClick={toggleMode}>
  {darkMode ? "🔆" : "🌙"}
</button>
              </div>
              
          {task.filter((elem) =>
            elem.title.toLowerCase().includes(search.toLowerCase()) ||
            elem.content.toLowerCase().includes(search.toLowerCase())
  )
  .map(function(elem, idx){
            return(
              <div key={idx} className='card'>
                <h5 onClick={ ()=>
                deleteNote(idx)
                }>❌</h5>
                <h5 onClick={() => togglePin(idx)}>
  {elem.pinned ? "📌" : "📍"}
</h5>
              <h3>{elem.title}</h3>
              <p>{elem.content}</p>
              </div>
            )
          })}
       </div>
    </div>
    </>
  )
}

export default App