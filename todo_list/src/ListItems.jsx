import { useState } from 'react'

function Item({ item, onToggle, onDelete }) {
    return (
        <li className={item.completed ? 'completed' : ''}>
            <span
                className={`item-title ${item.completed ? 'completed' : ''}`}
                onClick={() => onToggle(item.id)}
            >{item.text}</span>
            <button
                className='btn btn-danger btn-sm'
                onClick={() => onDelete(item.id)}
            >х</button>
        </li>
    );
}


function ListItems({ items, updateItems, filter }) {
    const handleToggle = (id) => {
        updateItems(items.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleDelete = (id) => {
        updateItems(items.filter(task => task.id !== id));
    };

    const filteredItems = items.filter(item => {
        if (filter === 'active') return !item.completed;
        if (filter === 'completed') return item.completed;
        return true;
    });

    return (
        <ul className='task-list'>
            {filteredItems.map((item) => (
                <Item
                    key={item.id}
                    item={item}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                />
            ))}
        </ul>

    )
}

export default ListItems 