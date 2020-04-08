let React = require("react")

const Total = (props) => {
	let total = 0;
	for (let a of props.course) {
		total += a.exercises;
	}
	return (
		<div>
			<p>Number of exercises: {total}</p>
		</div>
	);
}

export default Total;
