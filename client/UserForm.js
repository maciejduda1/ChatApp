import React, {Component} from 'react';

import styles from './UserForm.css';

class UserForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name : ''
		};
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log(e);
		console.log(this.state.name);
		this.props.onUserSubmit(this.state.name);
	}

	handleChange(e) {
		this.setState ({ name : e.target.value});
	}

	render() {
		return(
			<form className ={styles.UserForm} onSubmit = { e => this.handleSubmit(e)}>
				<input
					className = {styles.UserInput}
					placeholder = 'Write your nickname and press enter'
					onChange = { e => this.handleChange(e)}
					value = {this.state.name}
				/>
			</form>
		);
	}
}

export default UserForm;