import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

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

const Container = styled.div`
  display: flex
`;

type BoardProps = {
  match: any;
  history: any;
}

type BoardState = {
  tasks: any,
  columns: any,
  columnOrder: any,
  title: string,
  isSignedIn: boolean,
  boardId: string
}

const INITIAL_STATE = {
  tasks: CONSTANTS.BTASKS,
  columns: CONSTANTS.COLUMNS,
  columnOrder: CONSTANTS.COLUMN_ORDER,
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
    
    // Get board ID from URL param
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
  
  // Retrieve board info from Firebase
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
  
  // Retrieve cards and columns from Firebase
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
  
  // update = (id: any, status: any) => {
  //   // @ts-ignore
  //   const { tasks } = this.state;
  //   // @ts-ignore
  //   const task = tasks.find(task => task._id === id);
  //   task.status = status;
  //   const taskIndex = tasks.indexOf(task);
  //   const newTasks = update(tasks, {
  //     [taskIndex]: { $set: task }
  //   });
  //   this.setState({ tasks: newTasks });
  // }
  
  onDragEnd = (result: any): void => {
    const { destination, source, draggableId } = result;
    
    // Dropped outside the droppable areas
    if (!destination) {
      return;
    }
    
    // Dropped in the same place it was picked up
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) {
        return;
    }
    
    console.log(source.droppableId);
    console.log(destination.droppableId);
    
    const srcColumn = this.state.columns[source.droppableId];
    const dstColumn = this.state.columns[destination.droppableId];
    
    if (srcColumn === dstColumn) {
      const newTaskIds = Array.from(srcColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      
      const newColumn: any = {
        ...srcColumn,
        taskIds: newTaskIds
      }
      
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        }
      }; 
      this.setState(newState);
    } else {
      const startTaskIds = Array.from(srcColumn.taskIds);
      startTaskIds.splice(source.index, 1);
      const newSrcColumn = {
        ...srcColumn,
        taskIds: startTaskIds,
      };
      
      const dstTaskIds = Array.from(dstColumn.taskIds);
      dstTaskIds.splice(destination.index, 0, draggableId);
      const newDstColumn = {
        ...dstColumn,
        taskIds: dstTaskIds
      };
      
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [srcColumn.id]: newSrcColumn,
          [dstColumn.id]: newDstColumn,
        },
      };
      
      this.setState(newState);
    }
    
  }

  render() {
    // @ts-ignore
    const { tasks } = this.state;
    return (
      <div>
        <header>{this.state.title} - {this.state.boardId}</header>
        <DragDropContext
          onDragEnd={this.onDragEnd}
        >
          <Container>
            {
            // @ts-ignore
            this.state.columnOrder.map(columnId => {
              const column = this.state.columns[columnId];
              // @ts-ignore
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
              
              return (
                <Column key={column.id} column={column} tasks={tasks} />
              );
            }
            )}
          </Container>
        </DragDropContext>
      </div>
    );
  }
}

export default Board;
