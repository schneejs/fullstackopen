import React, {useState} from "react";
import ReactDOM from "react-dom";

const Statistic = ({text, value}) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
);

const Statistics = ({good, neutral, bad}) => {
	let totalRates = good + neutral + bad;
	let positivePercent = good / totalRates * 100 + "%";
	let average = (good - bad) / totalRates;
	if (totalRates > 0) {
		return (
			<div>
				<h3>Statistics</h3>
				<table><tbody>
					<Statistic text="Good" value={good} />
					<Statistic text="Neutral" value={neutral} />
					<Statistic text="Bad" value={bad} />
					<Statistic text="Positive" value={positivePercent} />
					<Statistic text="Average" value={average} />
				</tbody></table>
			</div>
		);
	} else {
		return (
			<div>
				<h3>Statistics</h3>
				No feedback given
			</div>
		);
	}
};

const Button = ({text, onClick}) => (
	<button onClick={onClick}>{text}</button>
);

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<h3>Give feedback</h3>
			<Button text="Good" onClick={() => {setGood(good + 1)}} />
			<Button text="Neutral" onClick={() => {setNeutral(neutral + 1)}} />
			<Button text="Bad" onClick={() => {setBad(bad + 1)}} />
			<Statistics
				good={good}
				neutral={neutral}
				bad={bad}
			/>
		</div>
	);
};

ReactDOM.render(
	<App />,
	document.getElementById("root")
);
