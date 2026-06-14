import { useState, useEffect } from 'react'
import InputTask from './InputTask'
import Filters from './Filters';
import ListItems from './ListItems';
import './TodoList.css'


function TodoList() {
  const [items, setItems] = useState([{ id: '1', text: 'One', completed: false }, { id: '2', text: 'Two', completed: true }, { id: '3', text: 'Three', completed: true }]);
  const [filter, setFilter] = useState('all');

  const generateId = () => Math.random().toString(36).substring(2, 11);

  const handleAddTask = (text) => {
    const newItem = {
      id: generateId(),
      text: text,
      completed: false
    };
    setItems([...items, newItem]);
  };

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setItems(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(items));
  }, [items]);


  return (
    <>
      <InputTask onAdd={handleAddTask} />
      <Filters filter={filter} setFilter={setFilter}></Filters>
      <ListItems items={items} updateItems={setItems} filter={filter}></ListItems>
    </>
  )
}

export default TodoList
