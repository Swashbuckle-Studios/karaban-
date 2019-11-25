import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

const Container = styled.div`
  
`;

type Step2Props = {
  closeModal?: any,
}

type Step2State = {
}

const INITIAL_STATE = {
}

class Step2 extends React.Component<Step2Props, Step2State> {
  constructor(props: any) {
    super(props);
    
    this.state = {...INITIAL_STATE};
  }
  
  handleUsernameChange = (event: any): void => {
    this.setState({
      ...this.state,
      activeUsername: event.target.value,
    });
    firebase.firestore().collection('usernames')
      .doc(event.target.value).get().then((doc) => {
        if (doc.exists) {
          this.setState({
            ...this.state,
            usernameTaken: true,
          });
        } else {
          this.setState({
            ...this.state,
            usernameTaken: false,
          });
        }
      });
  }
  
  render() {
    // console.log(firebase.auth().currentUser!.uid);
    return (
      <Container>
        <h1>Great! You're all set</h1>
        <p>Ready to go? Click done.</p>
        
        <button onClick={this.props.closeModal}>
          Finish
        </button>
      </Container>
    );
  }
}

export default Step2;