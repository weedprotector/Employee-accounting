import "./app-filter.css";

const AppFilter = (props) => {
    const buttonsData = [
        {name: 'all', label: 'Все сотрудники'},
        {name: 'rise', label: 'На повышение'},
        {name: 'moreThen1000', label: 'З/П больше 1000$'}
    ];

    //Формируем массив элементов, сразу достаем name и label
    const buttons = buttonsData.map(({name, label}) => {
        // if (props.filter == name), возвращается true в active
        const active = props.filter === name;
        //clazz - название переменной из java
        const clazz = active ? 'btn-light' : 'btn-outline-light';
        return (
            <button type="button"
            className={`btn ${clazz}`}
            key={name}
            // Стрелочная функция, так как необходимо передать аргумент
            onClick={() => props.onFilterSelect(name)}>
            {label}
    </button>
        )
    })

    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}

export default AppFilter;