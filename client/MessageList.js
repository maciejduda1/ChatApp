import React from 'react';

import styles from './UsersList.css';

const Message = props => {
	//console.log('props.name ' + props.name);
	//console.log('props.from ' + props.from);
	//console.log('props.text: ' + props.text);
	console.log('props.time: ' + props.time);
	console.log('props.deletes: ' + props.delete);

	if (props.name == props.from){
		return (
			<div className={styles.Message}>
				<span>{props.time}</span>
				<strong> {props.from} : </strong>
				<span>{props.text}</span>
				<button onClick={(time, text) => props.delete(props.time, props.text)}> X </button>
			</div>
		);
	} else {
		return (
			<div className={styles.Message}>
				<span>{props.time}</span>
				<strong> {props.from} : </strong>
				<span>{props.text}</span>
			</div>
		);
	}
};

const MessageList = props => (
	<div className={styles.MessageList}>
		{
			props.messages.map((message, i) => {
				return (
					<Message
						delete = {props.delete}
						name = {props.name}
						key = {i}
						from = {message.from}
						text = {message.text}
						time = {message.time}
					/>
				);
			})
		}
	</div>
);


export default MessageList;