import React from 'react';
import styled from 'styled-components';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

const Container = styled.div`
  @keyframes borderBlink {    
  	0% {
  		background-position: 0% 50%;
  	}
  	50% {
  		background-position: 100% 50%;
  	}
  	100% {
  		background-position: 0% 50%;
  	}
  }
  
  animation: borderBlink 30s ease infinite;
  background: linear-gradient(-45deg, #fdede8, #fce8f0, #e9f7fc, #e9fbf7);
  background-size: 400% 400%;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /dashboard after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/dashboard',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ]
};

type HomeProps = {
  
}

type HomeState = {
  
}

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: any) {
    super(props);
  }
  
  render() {
    return (
      <Container>
        <h1>🐪</h1>
        <h1>Karaban</h1>
        <p>Supercharged, realtime, opinionated project management for remote teams</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </Container>
    );
  }
}

export default Home;