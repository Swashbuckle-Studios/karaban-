import React from 'react';
import { DndProvider, DropTarget, DragSource } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

import Column from '../Column';
import Item from '../Item';

import * as CONSTANTS from '../../constants';
// import logo from '../../logo.svg';
// import '../../App.css';

// Configure Firebase login UI
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};

type BoardProps = {
  match: any;
  history: any;
}

type BoardState = {
  tasks: any,
  title: string,
  isSignedIn: boolean,
  boardId: string
}

const INITIAL_STATE = {
  tasks: CONSTANTS.TASKS,
  title: '',
  isSignedIn: false,
  boardId: ''
}

class Board extends React.Component<BoardProps, BoardState> {
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
        }
        this.setState({ isSignedIn: !!user });
        // this.getBoardMeta();
      }
    );
    
    // Get board ID from URL
    this.setState({
      boardId: this.props.match.params.boardId
    })
    
    
    // Grab board's info
    this.getBoardMeta(this.props.match.params.boardId);
    this.getCards(this.props.match.params.boardId);
  }
  
  componentWillUnmount() {
    // @ts-ignore
    this.unregisterAuthObserver();
  }
  
  getBoardMeta = (bId: string): void => {
    // const uid = firebase.auth().currentUser!.uid;
    firebase.firestore().collection('boards')
      .doc(bId).onSnapshot(snapshot => {
        this.setState({
          title: snapshot.data()!.title
        });
        console.log(snapshot.data());
      })
  }
  
  getCards = (bId: string): void => {
    // const uid = firebase.auth().currentUser!.uid;
    firebase.firestore().collection('boards')
      .doc(bId)
      .collection('teams')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.data());
          doc.ref.collection('cards').get().then(function(qS) {
            qS.forEach(function(d) {
              console.log(d.data());
            })
          })
        })
      })
  }
  
  update = (id: any, status: any) => {
    // @ts-ignore
    const { tasks } = this.state;
    // @ts-ignore
    const task = tasks.find(task => task._id === id);
    task.status = status;
    const taskIndex = tasks.indexOf(task);
    const newTasks = update(tasks, {
      [taskIndex]: { $set: task }
    });
    this.setState({ tasks: newTasks });
  }

  render() {
    // @ts-ignore
    const { tasks } = this.state;
    return (
      <div>
        <header>{this.state.title} - {this.state.boardId}</header>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        <DndProvider backend={HTML5Backend}>
          <section style={CONSTANTS.classes.board}>
            {CONSTANTS.CHANNELS.map(channel => (
              <Column status={channel}>
                <div style={CONSTANTS.classes.column}>
                  <div>Test</div>
                  <div>
                    {tasks
                      // @ts-ignore
                      .filter(item => item.status === channel)
                      // @ts-ignore
                      .map(item => (
                        <Item id={item._id} onDrop={this.update}>
                          <div style={CONSTANTS.classes.item}>{item.title}</div>
                        </Item>
                      ))}
                  </div>
                </div>
              </Column>
            ))}
          </section>
        </DndProvider>
      </div>
    );
  }
}

export default Board;
