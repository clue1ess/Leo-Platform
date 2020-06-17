import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.css';
import AddCrime from './AddCrime';
import AddArea from './AddArea';
import ShowCrimes from './ShowCrimes';
import ShowAreas from './ShowAreas';
import WebScrap from './WebScrap';
import DROLogin from './DROLogin';

/*
//import SignIn from './SignIn'
import Registration from './Registration';
import StartupList from './StartupList';
import ApplicationList from './ApplicationList';
*/
class App extends Component {
	render() {
		return (
			<div>
			<Router>
					<div className="App">
					<Switch>
						<Route exact path="/AddCrime" component={AddCrime} />
						<Route exact path="/AddArea" component={AddArea} />
						<Route exact path="/ShowCrimes" component={ShowCrimes}/>
						<Route exact path="/ShowAreas" component={ShowAreas}/>
						<Route exact path = "/WebScrap" component={WebScrap}/>
						<Redirect from="/" to="AddArea" />
					</Switch>
					</div>
				</Router>
				<link
			  rel="stylesheet"
			  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
			  crossOrigin="anonymous"
			/>
			
			</div>
		);
	}
}
export default App;
