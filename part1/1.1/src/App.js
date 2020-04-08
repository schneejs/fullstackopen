import React from "react"
import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const App = () => {
	const course_name = 'Half Stack application development';
	const course = [
		{"part": "Fundamentals of React", "exercises": 10},
		{"part": "Using props to pass data", "exercises": 7},
		{"part": "State of a component", "exercises": 14},
	];

	return (
		<div>
			<Header text={course_name} />
			<Content course={course} />
			<Total course={course} />
		</div>
	);
}

export default App;
