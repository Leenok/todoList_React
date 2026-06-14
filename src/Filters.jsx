function Filters({ filter, setFilter }) {
    const filterList = [{ btnName: 'Все', btnTeg: 'all' }, { btnName: 'Активные', btnTeg: 'active' }, { btnName: 'Выполненные', btnTeg: 'completed' }]

    return (

        <div className="filters m-4" >
            {filterList.map((buttonItem) => (
                <button
                    onClick={() => setFilter(buttonItem.btnTeg)}
                    className={`btn btn-outline-link m-1 ${filter === buttonItem.btnTeg ? 'active' : ''}`}
                >{buttonItem.btnName}</button>
            ))}

        </div >
    )
}

export default Filters