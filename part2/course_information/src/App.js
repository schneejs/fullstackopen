import React from "react"
import Course from "./Course"

const App = () => {
	const courses = [
		{
			id: 1,
			name: "Half Stack application development",
			parts: [
				{id: 1, name: "Fundamentals of React", exercises: 10},
				{id: 2, name: "Using props to pass data", exercises: 7},
				{id: 3, name: "State of a component", exercises: 14}
			]
		},
		{
			id: 2,
			name: "NodeJS",
			parts: [
				{id: 1, name: "NodeJS basics", exercises: 9},
				{id: 2, name: "NodeJS Advanced", exercises: 19}
			]
		}
	];

	return (
		<div>
			{courses.map(course => 
				<Course key={course.id} course={course} />
			)}
		</div>
	);
};

export default App;
