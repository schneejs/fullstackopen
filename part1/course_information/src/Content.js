import React from "react"

const Part = props => (
	<p>{props.course.name} {props.course.exercises}</p>
)

const Content = props => (
	<div>
		<Part course={props.parts[0]} />
		<Part course={props.parts[1]} />
		<Part course={props.parts[2]} />
	</div>
)

export default Content;
