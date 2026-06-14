import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setItems(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(items));
  }, [items]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const getFilterItems = () => items.filter(item => {
    if (filter == 'active') return !item.completed;
    else if (filter == 'completed') return item.completed;
    else return true
  })


  const addItem = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const newItem = {
        id: generateId(),
        text: inputValue,
        completed: false
      };
      setItems([...items, newItem]);
      setInputValue('');
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter(task => task.id !== id));
  }

  const toggleItem = (id) => {
    setItems(
      items.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }


  return (
    <>
      <div className="container">
        <h1 className='m-5'>Список задач</h1>
        <div className="input-section">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="form-control"
            placeholder="название задачи"
            onKeyPress={(e) => e.key === 'Enter' && addItem(e)}
          />
        </div>
        <button
          className="btn btn-primary form-control"
          type='button'
          onClick={addItem}
        >Добавить</button>


        <h1 className='mt-5'></h1>

        <div className="filters mt-3 mb-3">
          <button
            onClick={() => setFilter('all')}
            className={`btn btn-outline-link ${filter === 'all' ? 'active' : ''}`}
          >
            Все
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`btn btn-outline-link ${filter === 'active' ? 'active' : ''}`}
          >
            Активные
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`btn btn-outline-link ml-1 ${filter === 'completed' ? 'active' : ''}`}
          >
            Выполненные
          </button>
        </div>

        <ul className='task-list'>
          {items
            .filter(item => {
              if (filter === 'active') return !item.completed;
              if (filter === 'completed') return item.completed;
              return true;
            })
            .map((item) => (
              <li key={item.id} className={item.completed ? 'completed' : ''} >
                <span className={`item-title ${item.completed ? 'completed' : ''}`} onClick={() => toggleItem(item.id)}>{item.text}</span>
                <button className='btn btn-danger btn-sm' onClick={() => deleteItem(item.id)}>х</button>
              </li>
            ))}
        </ul>
      </div >
    </>
  )
}

export default App
