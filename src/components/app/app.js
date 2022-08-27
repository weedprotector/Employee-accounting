import { Component } from 'react/cjs/react.production.min';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{name: 'Sanya', salary: 800, increase: false, rise: false, id: 1},
				{name: 'Anya', salary: 3000, increase: false, rise: false, id: 2},
				{name: 'Misha', salary: 5000, increase: true, rise: false, id: 3}
			],
			term: '',
			filter: 'all'
		}
		this.maxId = 4;
	}

	deleteItem = (id) => {
		this.setState(({data}) => {
			return {
				data: data.filter(item => item.id !== id),
			}
		}) 
	}

	addItem = (name, salary) => {
		if (name.length >= 2 && salary) {
			const newItem = {
				name: name,
				salary: salary,
				increase: false,
				rise: false,
				id: this.maxId++
			}
			
			this.setState(({data}) => {
				return {
					data: [...data, newItem],
				}
			})
		}
    }
	
	// data. map - возвращает новый объект, при условии, когда id совпадет, изменит значение increase, если условие не совпало,
	// то возвращается этот объект. Как итог - массив объектов с новым измененным значением 
	onToggleProp = (id, prop) => {
		this.setState(({data}) => ({
			data: data.map(item => {
				if (item.id === id) {
					return {...item, [prop]: !item[prop]}
				}
				return(item);
			})
		}))
	}

	searchEmp = (items, term) => {
		if (term.length === 0) {
			return items;
		}

		return items.filter(item => {
			return item.name.indexOf(term) > -1
		})
	}

	onUpdateSearch = (term) => {
		//term == term: term
		this.setState({term});
	}

	filterPost = (items, filter) => {
		switch (filter) {
			case 'rise':
				// item. rise === if (item.rise) return
				return items.filter(item => item.rise);
			case 'moreThen1000': 
				return items.filter(item => item.salary > 1000);
			default:
				return items;
		}
	}

	onFilterSelect = (filter) => {
		this.setState({filter})
	}

	render() {
		const {data, term, filter} = this.state;
		const employees = this.state.data.length;
		const increased = this.state.data.filter(item => item.increase).length;
		// комбинируем два выражения, за items в filterPost передаем searchEmp
		const visibleData = this.filterPost(this.searchEmp(data, term), filter);

		return (
			<div className="app">
				<AppInfo 
					employees={employees}
					increased={increased}/>
	
				<div className="search-panel">
					<SearchPanel onUpdateSearch={this.onUpdateSearch}/>
					<AppFilter filter={filter}
							   onFilterSelect={this.onFilterSelect}/>
				</div>
				
				<EmployeesList
					data={visibleData}
					onDelete={this.deleteItem}
					onToggleProp={this.onToggleProp}/>
					
				<EmployeesAddForm
					onAdd={this.addItem}/>
			</div>
		);
	}
	
}

export default App;
