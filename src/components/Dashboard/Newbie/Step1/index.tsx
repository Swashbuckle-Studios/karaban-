import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

const Container = styled.div`
  
`;

type Step1Props = {
  uid: string,
  nextStep?: any,
}

type Step1State = {
  activeUsername: string
}

const INITIAL_STATE = {
  activeUsername: '',
}

class Step1 extends React.Component<Step1Props, Step1State> {
  constructor(props: any) {
    super(props);
    
    this.state = {...INITIAL_STATE};
    this.changeUsername = this.changeUsername.bind(this);
  }
  
  handleUsernameChange = (event: any): void => {
    this.setState({
      ...this.state,
      activeUsername: event.target.value,
    })
  }
  
  changeUsername = (): void => {
    // Delete old username -> uid mapping doc
    firebase.firestore().collection('usernames')
      .doc(this.props.uid).delete().then(() => {
        
        // Change uid -> new username mapping
        firebase.firestore().collection('users')
          .doc(this.props.uid).update({
            newbie: false,
            username: this.state.activeUsername,
          }).then(() => {
            
            // Add new username -> uid mapping doc
            firebase.firestore().collection('usernames')
              .doc(this.state.activeUsername).set({
                uid: this.props.uid,
              }).then(() => {
                
                // Advance the pagination
                this.props.nextStep();
              });
          });
      });
  }
  
  render() {
    // console.log(firebase.auth().currentUser!.uid);
    return (
      <Container>
        <h1>Welcome to Karaban, {this.props.uid}</h1>
        <p>Let's pick a more fitting username</p>
        
        <input
          type="text"
          value={this.state.activeUsername}
          onChange={this.handleUsernameChange}
          placeholder={this.props.uid}
        />
        
        <button onClick={this.changeUsername}>
          Change username
        </button>
      </Container>
    );
  }
}

export default Step1;