import axios from "axios";

const personsSourceURL = "http://localhost:3001/persons";

const loadPersons = () => axios.get(personsSourceURL);

const uploadPerson = newPerson =>
	axios.post(personsSourceURL, newPerson);
	
const updatePerson = newPerson =>
	axios.put(personsSourceURL + `/${newPerson.id}`, newPerson);
	
const deletePerson = personId =>
	axios.delete(personsSourceURL + `/${personId}`);

export default {loadPersons, uploadPerson, updatePerson, deletePerson};
