let React = require("react")

const Total = (props) => {
	let total = 0;
	for (let part of props.parts) {
		total += part.exercises;
	}
	return (
		<div>
			<p>Number of exercises: {total}</p>
		</div>
	);
}

export default Total;
