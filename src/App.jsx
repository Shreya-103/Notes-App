import { useState } from 'react'
import { useEffect } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const [content, addContent] = useState('');
  const [task, addTask] = useState(()=>{
     const savedTasks = localStorage.getItem("tasks");
     return savedTasks ? JSON.parse(savedTasks): [];
  });

  // useEffect(()=>{
  //   const savedTasks = localStorage.getItem("tasks");
  //   if(savedTasks){
  //     addTask(JSON.parse(savedTasks));
  //   }
  // }, []);

  useEffect(()=>{
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  const submitHandler = (e)=>{
    e.preventDefault();
    
    const newTask = [...task];
    newTask.push({title, content});
    addTask(newTask);
    setTitle('');
    addContent('');
  }

  const deleteNote = (idx)=>{
    const copyTask = [...task];
    copyTask.splice(idx, 1);
    addTask(copyTask);
  }
  return(
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
          {task.map(function(elem, idx){
            return(
              <div key={idx} className='card'>
                <h5 onClick={ ()=>
                deleteNote(idx)
                }>❌</h5>
              <h3>{elem.title}</h3>
              <p>{elem.content}</p>
              </div>
            )
          })}
       </div>
    </div>
  )
}

export default App