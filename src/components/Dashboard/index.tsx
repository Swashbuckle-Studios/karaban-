import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

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
`;

const BoardCardContainer = styled.div`
  display: flex;
`;

const BoardCard = styled.button`
  margin: 8px;
  border-radius: 6px;
  background-color: white;
  background-size: 400% 400%;
  padding: 12px;
  font-weight: 400;
  font-size: 15px;
  transition: background-color 0.2s ease;
  border: none;
  min-width: 300px;
  min-height: 200px;
  
  :hover {
    background-color: #fafafa;
    cursor: pointer;
  }
  
  :focus {
    outline: none;
  }
`;

type DashboardProps = {
  
}

type DashboardState = {
  isSignedIn: boolean,
  uid: string,
  boardOrder: Array<string>,
  boards: any,
}

const INITIAL_STATE = {
  isSignedIn: false,
  uid: '',
  boardOrder: [],
  boards: {},
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
  constructor(props: any) {
    super(props);
    
    this.state = {...INITIAL_STATE};
  }
  
  componentDidMount() {
    // @ts-ignore
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => {
        if (user == null) {
          // Show signin dialog
        } else {
          this.setState({
            isSignedIn: !!user,
            uid: user!.uid,
          });
          firebase.firestore().collection('users')
            .doc(user.uid)
            .collection('joined_boards').onSnapshot((snapshot) => {
              snapshot.forEach((doc) => {
                var incomingBoards: Array<string> = this.state.boardOrder;
                incomingBoards.push(doc.id);
                console.log(incomingBoards);
                this.setState({
                  ...this.state,
                  boards: {
                    ...this.state.boards,
                    [doc.id]: {
                      name: doc.data()!.name,
                    }
                  },
                  boardOrder: incomingBoards
                });
              });
          });
        }
      }
    );
  }
  
  render() {
    // console.log(firebase.auth().currentUser!.uid);
    return (
      <Container>
        <h1>{this.state.uid}'s Boards</h1>
        <BoardCardContainer>
          {
            this.state.boardOrder.map((bId) => {
              return (
                <Link to="/board/myid" key={bId}>
                  <BoardCard>
                    {bId}
                  </BoardCard>
                </Link>
              );
            })
          }
        </BoardCardContainer>
      </Container>
    );
  }
}

export default Dashboard;