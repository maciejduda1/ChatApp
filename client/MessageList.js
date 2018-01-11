import React from 'react';

import styles from './UsersList.css';

const Message = props => (
	<div className={styles.Message}>
		<strong> {props.from} : </strong>
		<span>{props.text}</span>
	</div>
);

const MessageList = props => (
	<div className={styles.MessageList}>
		{
			props.message.map((message, i) => {
				return (
					<Message
						key = {i}
						from = {message.from}
						text = {message.text}
					/>
				);
			})
		}
	</div>
);


export default MessageList;