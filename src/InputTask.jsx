import { useState } from 'react'

function InputTask({ onAdd }) {
    const [inputValue, setInputValue] = useState('');

    const addItem = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            onAdd(inputValue);
            setInputValue('');
        }
    };

    return (
        <>
            <div className="input-section">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="form-control"
                    placeholder="Название задачи"
                    onKeyPress={(e) => e.key === 'Enter' && addItem(e)}
                />
            </div>
            <button className="btn btn-primary form-control" type="button" onClick={addItem}>
                Добавить
            </button>
        </>
    );
}

export default InputTask