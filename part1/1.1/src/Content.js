import React from "react"

const Content = (props) => {
	const ret = // Make a loop from that
	<div>
		<p>{props.course[0].part} {props.course[0].exercises}</p>
		<p>{props.course[1].part} {props.course[1].exercises}</p>
		<p>{props.course[2].part} {props.course[2].exercises}</p>
	</div>;
	return ret;
}

export default Content;
