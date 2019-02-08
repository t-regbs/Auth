import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';
import { Header, Button, Spinner } from './components/common'; 
import LoginForm from './components/LoginForm';

class App extends Component {
	state = { loggedIn: null };

	componentWillMount() {
		firebase.initializeApp({
		apiKey: 'AIzaSyBMGBy6ofWtCW7eCqYsmLHCrpj2LHCravU',
		authDomain: 'auth-4252c.firebaseapp.com',
		databaseURL: 'https://auth-4252c.firebaseio.com',
		projectId: 'auth-4252c',
		storageBucket: 'auth-4252c.appspot.com',
		messagingSenderId: '544140783706'
		});	

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		switch (this.state.loggedIn) {
			case true:
				return (
					<Button onPress={() => firebase.auth().signOut()}>
						Log Out
					</Button>
				);
			case false:
				return <LoginForm />;
			default:	
				return (
					<View alignSelf="center">
						<Spinner size="large" />
					</View>
				);
		}
	}

	render() {
		return (
				<View>
					<Header headerText="Authentication" />
					{this.renderContent()}
				</View>
			);
	}
} 

export default App;
