let React = require("react")

const Total = ({parts}) => {
	console.log(parts)
	let total =
		parts.map((obj) => obj.exercises)
		.reduce((acc, val) => acc + val);
	return (
		<div>
			<p><b>Number of exercises: {total}</b></p>
		</div>
	);
}

export default Total;
