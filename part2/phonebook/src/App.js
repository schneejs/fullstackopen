import React, {useState, useEffect} from "react";
import Communication from "./Communication";

const Notification = ({lastReport}) => {
	if (lastReport) {
		const className = lastReport.success ? "sucnotif" : "errnotif";
		return (
			<div>
				<p className={className}>{lastReport.text}</p>
			</div>
		);
	} else
		return (<></>);
}

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
					<button className="rem" type="button" onClick={() =>
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
	// Notification system
	const [lastReport, setLastReport] = useState(null);
	// Contacts that are going to be fetched from a database
	const [persons, setPersons] = useState([]);
	// Remove a contact by its ID (not index!)
	const removePerson = personId => {
		setPersons(persons.filter(person => person.id !== personId));
		setLastReport({
			success: true,
			text: `The person has been successfully deleted.`
		});
	}
	// Persons filtered by filter string enter by the user
	// automatically updated when persons update
	const [filteredPersons, setFilteredPersons] = useState([]);
	// Text fields
	const [newName, setNewName] = useState('');
	const [newPhone, setNewPhone] = useState('');
	const clearForm = () => {
		setNewName('');
		setNewPhone('');
	};
	// Filter field
	const [currentFilter, setCurrentFilter] = useState('');
	const is_matching_filter = filterStr => ({name}) =>
		name.toLowerCase().includes(filterStr.toLowerCase());
	
	// Load the database
	useEffect(() => {
		Communication
			.loadPersons()
			.then(({data}) => setPersons(data));
	}, []);
	
	// Reports handler
	useEffect(() => {
		setTimeout(() => setLastReport(null), 2000);
	}, [lastReport]);
	
	// Updater of filteredPersons
	useEffect(() => {
		if (currentFilter) {
			const newFilteredPersons =
				persons.filter(is_matching_filter(currentFilter));
			setFilteredPersons(newFilteredPersons);
		} else
			setFilteredPersons(persons);
	}, [persons, currentFilter]);
	
	// Functions for handling field changes
	const handleNameChange = event =>
		setNewName(event.target.value);
	const handlePhoneChange = event =>
		setNewPhone(event.target.value);
	const handleFilterChange = event =>
		setCurrentFilter(event.target.value);
	
	// Submit button clicking callback
	const handleSubmitClick = event => {
		event.preventDefault();
		// Index of a contact that the user is searching for
		const indexOfNewName = persons
			.map(person => person.name)
			.indexOf(newName);
		if (indexOfNewName >= 0) { // that name already exists
			const confirmResult =
				window.confirm(`Are you sure you want to change the number of ${newName}?`);
			if (confirmResult) // Yes was pressed
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
						setLastReport({
							success: true,
							text: "The number has been changed!"
						});
					})
					.catch(error => {
						setLastReport({
							success: false,
							text: "The contact has been deleted already."
						});
					});
			else // cancelled
				clearForm();
		}
		else if (persons.map(p => p.number).indexOf(newPhone) >= 0)
			setLastReport({
				success: false,
				text: `${newPhone} is already in the phonebook!`
			});
		else if (newName) {
			Communication
				.uploadPerson({
					name: newName,
					number: newPhone
				})
				.then(({data}) => {
					setPersons(persons.concat(data));
					setLastReport({
						success: true,
						text: `Added ${data.name}`
					});
				});			
		}
		clearForm();
	};
	
	return (
		<div>
			<h2>Phonebook</h2>
			<Notification lastReport={lastReport} />
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
