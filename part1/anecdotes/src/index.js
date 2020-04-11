import React, {useState} from "react";
import ReactDOM from "react-dom";

// Find index of the biggest value in array
const maxIndex = array => {
	if (array.length === 0)
		return null;
	let biggestValueIndex = 0;
	for (let i = 1; i < array.length; i++) {
		if (array[i] > array[biggestValueIndex])
			biggestValueIndex = i;
	}
	return biggestValueIndex;
};

const App = ({anecdotes}) => {
	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
	const randomIndex = () => Math.floor(Math.random() * anecdotes.length);
	const votesCount = votes[selected];
	const incrementVotes = () => {
		let votesCopy = [...votes];
		votesCopy[selected] += 1;		
		setVotes(votesCopy);
	};
	return (
		<div>
			<h3>IT anecdotes around the world</h3>
			<p>{anecdotes[selected]}</p>
			<p>Votes: {votesCount}</p>
			<button onClick={incrementVotes}>
				Vote
			</button>
			<button onClick={() => {setSelected(randomIndex())}}>
				Next anecdote
			</button>
			<h3>The best anecdote of the century</h3>
			<p>{anecdotes[maxIndex(votes)]}</p>
		</div>
	);
};

const anecdotes = [
	"If it hurts, do it more often",
	"Adding manpower to a late software project makes it later!",
	"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
	"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
	"Premature optimization is the root of all evil.",
	"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(
	<App anecdotes={anecdotes} />,
	document.getElementById("root")
);
