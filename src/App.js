import { useRef, useState } from 'react';
import { ListItem } from './components/list-item';
import { Banner } from './components/banner'
import { Checkbox } from './components/checkbox';


function App() {
  const inputRef = useRef();
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [task, setTask] = useState({
    title: '',
    checked: false
  });

  const getTasksFromLocalStorage = () => {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      return JSON.parse(tasks);
    }
  }

  const setTasksToLocalStorage = (newList) => {
    localStorage.setItem('tasks', JSON.stringify(newList));
  }

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return alert('Please enter a value');
    const newList = [{
      id: Math.floor(Math.random() * 1000000),
      title: task.title,
      checked: task.checked
    }, ...tasks,];

    localStorage.setItem('tasks', JSON.stringify(newList));
    setTask({ title: '', checked: false });
    setTasks(newList);
    inputRef.current.value = '';
  };

  const handleRemoveItem = (item) => {
    const newList = tasks.filter((listItem) => listItem.id !== item.id);
    setTasks(newList);
    setTasksToLocalStorage(newList);
  };

  const handleCheckedItem = (item) => {
    console.log(item);
    let newList = tasks.map((listItem) => listItem.id === item.id ? { ...listItem, checked: !listItem.checked } : listItem);
    setTasks(newList);
    setTasksToLocalStorage(newList);
  };

  const handleChange = ({ title = task.title, checked = task.checked }) => {
    setTask({
      title,
      checked
    })
  }

  const handleFilter = (filter) => {
    let tasks = getTasksFromLocalStorage();
    if (filter === 'active') {
      return setTasks(tasks.filter(task => !task.checked));
    }
    if (filter === 'completed') {
      return setTasks(tasks.filter(task => task.checked));
    }
    return setTasks(tasks);
  }

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDrop = (e, index) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData("index");
    console.log(draggedIndex, index);
    const draggedTask = tasks[draggedIndex];
    let newTasks = [...tasks];
    newTasks.splice(draggedIndex, 1);
    newTasks.splice(index, 0, draggedTask);
    setTasks(newTasks);
    setTasksToLocalStorage(newTasks);
  }


  return (
    <>
      <Banner />
      <div className='flex flex-col gap-10 items-center justify-center mt-36'>
        <h1 className='self-start'>TODO</h1>
        <div className='w-2/6 bg-white flex rounded-md items-center justify-start px-2'>
          <form onSubmit={(e) => handleAddItem(e)} className="flex gap-5 w-full">
            <div className='flex items-center gap-2 w-full'>
              <Checkbox onClick={() => handleChange({ checked: !task.checked })} checked={task.checked} />
              <input required ref={inputRef} onInput={(e) => handleChange({ title: e.target.value })} type='text' className='border-2 w-full flex-1 border-gray-300 p-2 rounded-md focus:outline-none border-none' />
            </div>
          </form>
        </div>

        <div className='w-2/6 bg-white flex flex-col rounded-md items-center justify-center'>
          <ul className='flex flex-col whitespace-pre w-full'>
            {tasks.map((item, index) => (
              <ListItem index={index}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                handleCheckedItem={handleCheckedItem}
                handleRemoveItem={handleRemoveItem}
                key={item.id} item={item} />
            ))}
          </ul>
          <div className='flex flex-col lg:flex-row items-center justfiy-between p-2 w-full'>
            <span>{tasks.filter(task => !task.checked).length} items left</span>
            <div className='flex  flex-1 justify-center items-center gap-4 '>
              <button onClick={() => handleFilter('all')}>All</button>
              <button onClick={() => handleFilter('active')}>Active</button>
              <button onClick={() => handleFilter('completed')}>Completed</button>
            </div>

            <span>Clear</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
