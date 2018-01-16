import React, {Component} from 'react';
import io from 'socket.io-client';

import styles from './App.css';

import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';


const socket = io('http://localhost:3000');

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {users: [], messages: [], text: '', name: ''};
	}

	componentDidMount() {
		socket.on('message', message => this.messageReceive(message));
		socket.on('update', ({users}) => this.chatUpdate(users));
		socket.on('deleteThis', (time, text) => this.messageDeleted(time, text)); 
	}

	messageReceive(message) {
		const messages = [message, ...this.state.messages];
		this.setState({messages});
	}

	chatUpdate(users) {
		this.setState({users});
	}

	handleMessageSubmit(message) {
		//const messages = [message, ...this.state.messages];
		//this.setState({messages});
		socket.emit('message', message );
	}

	handleUserSubmit(name) {
		this.setState({name});
		//console.log(this.state.name);
		socket.emit('join', name);
	}

	messageDeleted(time, text) {
		console.log('new time + text:' + time + text);
		const remainedMessages = this.state.messages.filter( (message) => {if (message.time !== time && message.text !== text){
			return message
		}});

		this.setState({messages: remainedMessages})
	}

	handleMessageDelete(time, text) {
		console.log('time + text App.js: ' + time + text);
		socket.emit('delete', time, text);
	}
	
	
	render() {
		return this.state.name !== '' ? this.renderLayout() : this.renderUserForm();
	}

	renderLayout() {
		return (
			<div className={styles.App}>
				<div className={styles.AppHeader}>
					<div className={styles.AppTitle}>
						ChatApp
					</div>
					<div className={styles.AppRoom}>
						AppRoom
					</div>
				</div>
				<div className={styles.AppBody}>
					<UsersList
						users = {this.state.users}
					/>
					<div className={styles.MessageWrapper}>
						<MessageList
							messages = {this.state.messages}
							name = {this.state.name}
							delete = { (time, text) => this.handleMessageDelete(time, text)}
						/>
						<MessageForm
							onMessageSubmit = { message => this.handleMessageSubmit(message)}
							name = {this.state.name} 
						/>
					</div>
				</div>
			</div>
		);
	}

	renderUserForm() {
		return (<UserForm onUserSubmit = {name => this.handleUserSubmit(name)}/>);
	}
};

export default App;