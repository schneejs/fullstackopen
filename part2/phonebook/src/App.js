import React, {useState, useEffect} from "react";
import Communication from "./Communication";

const AddPerson = ({
		newName,
		newPhone,
		handleNameChange,
		handlePhoneChange,
		handleSubmitClick
	}) => (<>
	<form>
		<div>
			<input
				value={newName}
				placeholder="Name"
				onChange={handleNameChange}
			/>
		</div>
		<div>
			<input
				value={newPhone}
				placeholder="Phone number"
				onChange={handlePhoneChange}
			/>
		</div>
		<div>
			<button onClick={handleSubmitClick}>
				Add
			</button>
		</div>
	</form>
</>);

const Contacts = ({filteredPersons, handleFilterChange, removePerson}) => (
	<div>
		<h2>Contacts</h2>
		<input placeholder="Filter" onChange={handleFilterChange} />
		<ul>
			{filteredPersons.map(person =>
				<li key={person.id}>
					{person.name} {person.number} 
					<button type="button" onClick={() =>
						Communication
							.deletePerson(person.id)
							.then(({data}) =>
								removePerson(person.id)
							)
							.catch(error => {
								alert(`Unforunately, ${person.name} doesn't exist.`);
								removePerson(person.id);
							})
					}>
						Delete
					</button>
				</li>
			)}
		</ul>
	</div>
);

const App = () => {
	const [persons, setPersons] = useState([]);
	const removePerson = personId =>
		setPersons(persons.filter(person => person.id !== personId));
	const [filteredPersons, setFilteredPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newPhone, setNewPhone] = useState('');
	const clearForm = () => {
		setNewName('');
		setNewPhone('');
	};
	const [currentFilter, setCurrentFilter] = useState('');
	const is_matching_filter = filterStr => ({name}) =>
		name.toLowerCase().includes(filterStr.toLowerCase());
	
	useEffect(() => {
		Communication
			.loadPersons()
			.then(({data}) => setPersons(data));
	}, []);
	
	useEffect(() => {
		if (currentFilter) {
			const newFilteredPersons =
				persons.filter(is_matching_filter(currentFilter));
			setFilteredPersons(newFilteredPersons);
		} else
			setFilteredPersons(persons);
	}, [persons, currentFilter]);
	
	const handleNameChange = event =>
		setNewName(event.target.value);
	const handlePhoneChange = event =>
		setNewPhone(event.target.value);
	const handleFilterChange = event =>
		setCurrentFilter(event.target.value);
	
	const handleSubmitClick = event => {
		event.preventDefault();
		const indexOfNewName = persons
			.map(person => person.name)
			.indexOf(newName);
		if (indexOfNewName >= 0) {
			const confirmResult =
				window.confirm(`Are you sure you want to change the number of ${newName}?`);
			if (confirmResult) {
				// if pressed yes
				Communication
					.updatePerson({
						id: persons[indexOfNewName].id,
						name: newName,
						number: newPhone
					})
					.then(({data}) => {
						let newPersons = [...persons];
						newPersons[indexOfNewName] = data;
						setPersons(newPersons);
					});
			} else // cancelled
				clearForm();
		}
		else if (persons.map(
			person => person.phone).indexOf(newPhone) >= 0
		)
			alert(`${newPhone} is already in the phonebook!`);
		else if (newName) {
			Communication
				.uploadPerson({
					name: newName,
					number: newPhone
				})
				.then(({data}) => setPersons(persons.concat(data)));			
		}
		clearForm();
	};
	
	return (
		<div>
			<h2>Phonebook</h2>
			<AddPerson
				newName={newName}
				newPhone={newPhone}
				handleNameChange={handleNameChange}
				handlePhoneChange={handlePhoneChange}
				handleSubmitClick={handleSubmitClick}
			/>
			<Contacts
				filteredPersons={filteredPersons}
				handleFilterChange={handleFilterChange}
				removePerson={removePerson}
			/>
		</div>
	);
};

export default App;
