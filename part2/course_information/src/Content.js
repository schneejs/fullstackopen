import React from "react"

const Part = props => (
	<p>{props.course.name} {props.course.exercises}</p>
)

const Content = ({parts}) => (
	<div>
		{parts.map(part =>
			<Part key={part.id} course={part} />
		)}
	</div>
)

export default Content;
