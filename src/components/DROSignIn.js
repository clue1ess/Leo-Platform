import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import classNames from 'classnames';
import Error from '../elements/Error';
import { REGISTRATION_FIELDS, REGISTRATION_MESSAGE, COMMON_FIELDS, ERROR_IN_REGISTRATION } from '../MessageBundle';
import DROPanel from './DROPanel';
import Header from './Header';

export default class DROSignIn extends React.Component {
	constructor(props) {
		super(props)
		this.state= {
			user_name:"",
			password:"",
			error: false,
			loginSuccess: false,
			errorMessage: "",
			token : ""
		}
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}

	sha256 = async message => {
		// encode as UTF-8
	    const msgBuffer = new TextEncoder('utf-8').encode(message);                    

	    // hash the message
	    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

	    // convert ArrayBuffer to Array
	    const hashArray = Array.from(new Uint8Array(hashBuffer));

	    // convert bytes to hex string                  
	    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
	    return hashHex;	
	}



	onSubmit = async e => {
		let hash = await this.sha256(this.state.password);
		// 256 hash of password "drodrodro" 3e23d25887299c5b47a11e68aa600b6e9bb78d775ce09babfbfae14cc8a4e703"
		const data = {
			user_name : this.state.user_name,
			password : hash
		};
		var res;
		// await axios.post('http://localhost:5000/LeoHelp/DROloginIn', data)
		await axios.post('https://peaceful-refuge-01419.herokuapp.com/LeoHelp/DROloginIn', data)
		.then(response => {
			res = response.status;
			this.setState({
				token : response.data.token
			});
			console.log(response.data);
		})
		.catch(error => {
			this.setState({
				password: ""
			});
		});
			if(res === 200) {
					this.setState({
					loginSuccess : true
					});
			} else {
			this.setState({
				errorMessage: "Username or password is incorrect",
				password: ""
			});
		}
	}

	componentWillMount() {
		localStorage.setItem('session_start', null);	
		try{
			localStorage.getItem('user_name' && this.setState({
				user_name : JSON.parse(localStorage.getItem('user_name'))
			}))
		}
		catch(e){

		}
	}

	componentDidMount(){
		if(!localStorage.getItem('user_name') || !localStorage.getItem('password')){
			this.onSubmit();
		}
		else{
			console.log('Using data from localStorage');
		}
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('user_name', JSON.stringify(nextState.user_name));
		localStorage.setItem('password', JSON.stringify(nextState.password));
	}

	render() {
		const { loginSuccess, error } = this.state;
		if (this.state.loginSuccess == true) {
			localStorage.setItem('session', "start");
			localStorage.setItem('DRO_start', "start");
			localStorage.setItem('token', this.state.token);
			return <Redirect push to = "/DROPanel" />;
		}
		return (
			<div>
			<Header />
			<center>
				<div className="jumbotron">
					<h2>DRO <span className="change-color">LOGIN</span> </h2>
					<hr />
					<form onSubmit = {this.handleSubmit}>
					<div className="form-group">
						<div className="row">
							<div className="col-md-2">
								<label htmlFor="user_name">Username:</label>
							</div>
							<div className="col-md-10">
								<input type="text" className="form-control" value={this.state.user_name} name="user_name" placeholder="Username" id="username" onChange={this.handleChange}/>
							</div>
						</div>
					</div>

					<div className="form-group">
						<div className="row">
							<div className="col-md-2">
								<label htmlFor="password">Password:</label>
							</div>
							<div className="col-md-10">
								<input type="password" className="form-control" name="password" id="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} />
							</div>
						</div>
					</div>
					<h4><span className="errorMessage">{this.state.errorMessage}</span></h4>
						<br/><br/>
						<center> <button type="button" onClick={this.onSubmit} className="btn btn-primary">LOGIN</button><br /><br />
						</center>	
					</form>
				</div>
				</center>
			</div>
		)

	}
}
