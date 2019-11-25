import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
// @ts-ignore
import ReactStepWizard from 'react-step-wizard';
import SimpleDialog from '@material-ui/core/Dialog'

import Step1 from './Newbie/Step1';
import Step2 from './Newbie/Step2';

import NewBoardForm from './NewBoardForm';

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
  history: any,
}

type DashboardState = {
  isSignedIn: boolean,
  uid: string,
  username: string,
  boardOrder: Array<string>,
  boards: any,
  newbieModalOpen: boolean,
  createBoardModalOpen: boolean,
}

const INITIAL_STATE = {
  isSignedIn: false,
  uid: '',
  username: '',
  boardOrder: [],
  boards: {},
  newbieModalOpen: false,
  createBoardModalOpen: false,
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
          this.props.history.push('/');
        } else {
          this.setState({
            isSignedIn: !!user,
            uid: user!.uid,
          });
          
          // Get user's boards
          firebase.firestore().collection('users')
            .doc(user.uid)
            .collection('joined_boards').onSnapshot((snapshot) => {
              this.setState({
                ...this.state,
                boards: {},
              });
              snapshot.forEach((doc) => {
                var incomingBoards: Array<string> = this.state.boardOrder;
                incomingBoards.push(doc.id);
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
          
          // Get user metadata
          firebase.firestore().collection('users')
            .doc(user.uid).onSnapshot((doc: any) => {
              if (doc.exists) {
                if (doc.data()!.newbie) {
                  this.setState({
                    ...this.state,
                    newbieModalOpen: true,
                  })
                } else {
                  this.setState({
                    ...this.state,
                    username: doc.data()!.username,
                  })
                }
              }
            });
        }
      }
    );
  }
  
  openNewbieModal = (): void => {
    this.setState({
      ...this.state,
      newbieModalOpen: true,
    });
  }
  
  closeNewbieModal = (): void => {
    this.setState({
      ...this.state,
      newbieModalOpen: false,
    })
  }
  
  openCreateBoardModal = (): void => {
    this.setState({
      ...this.state,
      createBoardModalOpen: true,
    });
  }
  
  closeCreateBoardModal = (): void => {
    this.setState({
      ...this.state,
      createBoardModalOpen: false,
    })
  }
  
  render() {
    // console.log(firebase.auth().currentUser!.uid);
    return (
      <div>
        <Container>
          <h1>{this.state.username}'s Boards</h1>
          <BoardCardContainer>
            {
              this.state.boardOrder.map((bId) => {
                return (
                  <Link to={`/board/${bId}`} key={bId}>
                    <BoardCard>
                      {bId}
                    </BoardCard>
                  </Link>
                );
              })
            }
            <BoardCard onClick={this.openCreateBoardModal}>
              Create new
            </BoardCard>
          </BoardCardContainer>
        </Container>
        
        <Modal
          isOpen={this.state.newbieModalOpen}
          onRequestClose={this.closeNewbieModal}
          contentLabel="Welcome to Karaban!"
        >
          <ReactStepWizard>
            <Step1 uid={this.state.uid} />
            <Step2 closeModal={this.closeNewbieModal} />
          </ReactStepWizard>
        </Modal>
        
        <SimpleDialog
          open={this.state.createBoardModalOpen}
          onClose={this.closeCreateBoardModal}
        >
          <NewBoardForm
            uid={this.state.uid}
            closeDialog={this.closeCreateBoardModal}
          />
        </SimpleDialog>
      </div>
    );
  }
}

export default Dashboard;