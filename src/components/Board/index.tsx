import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import Column from '../Column';

import * as CONSTANTS from '../../constants';
// import logo from '../../logo.svg';
// import '../../App.css';

const Canvas = styled.div`
  background-image: url("https://images.unsplash.com/photo-1413977886085-3bbbf9a7cf6e");
  background-size: cover;
  height: 100vh;
  width: 100%;
  letter-spacing: 1px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Title = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
  margin-left: 8px;
`;

const ColumnColumn = styled.div`
  width: 23%;
  min-width: 150px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 10px;
`;

const BoardsButton = styled.button`
  font-family: 'Cabin', 'sans-serif';
  padding: 13px;
  background-color: rgb(0, 0, 0, 0.3);
  transition: background-color 0.2s ease;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.5px;
  outline: none;
  
  :hover {
    background-color: rgb(0, 0, 0, 0.5)
  }
`;

type BoardProps = {
  match: any;
  history: any;
}

type BoardState = {
  tasks: any,
  columns: any,
  columnMeta: any,
  columnOrder: any,
  teams: any,
  teamOrder: any,
  title: string,
  isSignedIn: boolean,
  boardId: string,
  homeIndex: number,
}

const INITIAL_STATE = {
  tasks: CONSTANTS.BTASKS,
  columns: CONSTANTS.COLUMNS,
  columnMeta: CONSTANTS.COLUMN_META,
  columnOrder: CONSTANTS.COLUMN_ORDER,
  teams: CONSTANTS.TEAMS,
  teamOrder: CONSTANTS.TEAMS_ORDER,
  title: '',
  isSignedIn: false,
  boardId: '',
  homeIndex: -1
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
    this.initialGetCards(this.props.match.params.boardId);
  }
  
  componentWillUnmount() {
    // @ts-ignore
    this.unregisterAuthObserver();
  }
  
  // Retrieve board info from Firebase
  getBoardMeta = (bId: string): void => {
    // const uid = firebase.auth().currentUser!.uid;
    
    // Get board meta
    firebase.firestore().collection('boards')
    .doc(bId).onSnapshot(snapshot => {
      this.setState({
        title: snapshot.data()!.title
      });
    });
  }
  
  // Initially retrieve cards and columns from Firebase
  // TODO: Use snapshot to setup hooks for individual teams, columns, ...
  initialGetCards = (bId: string): void => {
    // const uid = firebase.auth().currentUser!.uid;
    
    firebase.firestore().collection('boards')
      .doc(bId)
      .collection('teams')
      .get()
      .then((querySnapshot) => {
        // For each team, get the cards/tasks
        querySnapshot.forEach((doc) => {
          var incomingCards: any = {};
          
          // For each card
          doc.ref.collection('cards').get().then((qS) => {
            qS.forEach((d) => {
              incomingCards[d.id] = {
                id: d.id,
                content: d.data()!.content,
                tag: d.data()!.tag,
                status: d.data()!.status
              }
            });
          }).then(() => {
            this.setState({
              tasks: {...incomingCards, ...this.state.tasks}
            });
            // Update column ordering and cards
            const newState = {
              // @ts-ignore
              ...this.state,
              columns: {
                // @ts-ignore
                ...this.state.columns,
                [`backlog-${doc.id}`]: {
                  id: `backlog-${doc.id}`,
                  type: 'backlog',
                  team: doc.id,
                  taskIds: doc.data()!.order_backlog
                },
                [`todo-${doc.id}`]: {
                  id: `todo-${doc.id}`,
                  type: 'todo',
                  team: doc.id,
                  taskIds: doc.data()!.order_todo
                },
                [`doing-${doc.id}`]: {
                  id: `doing-${doc.id}`,
                  type: 'doing',
                  team: doc.id,
                  taskIds: doc.data()!.order_doing
                },
                [`done-${doc.id}`]: {
                  id: `done-${doc.id}`,
                  type: 'done',
                  team: doc.id,
                  taskIds: doc.data()!.order_done
                }
              },
              teams: {
                ...this.state.teams,
                [doc.id]: {
                  name: doc.data()!.name,
                  color: doc.data()!.color
                }
              },
              teamOrder: [...this.state.teamOrder, doc.id],
            }
            this.setState(newState, () => {
              this.listenCards(doc.id);
              this.listenTeams();
            });
          });
        });
      });
  }
    
  listenTeams = (): void => {
    // Listen for teams realtime changes
    firebase.firestore().collection('boards')
    .doc(this.props.match.params.boardId)
    .collection('teams').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          // Create new team
          var newTeamOrder = this.state.teamOrder;
          if (!newTeamOrder.includes(change.doc.id)) {
            newTeamOrder.push(change.doc.id);
          }
          
          // Update state
          this.setState({
            ...this.state,
            teams: {
              ...this.state.teams,
              [change.doc.id]: {
                color: change.doc.data()!.color,
                name: change.doc.data()!.name,
              }
            },
            columns: {
              ...this.state.columns,
              [`backlog-${change.doc.id}`]: {
                ...this.state.columns[`backlog-${change.doc.id}`],
                taskIds: change.doc.data()!.order_backlog,
              },
              [`todo-${change.doc.id}`]: {
                ...this.state.columns[`todo-${change.doc.id}`],
                taskIds: change.doc.data()!.order_todo,
              },
              [`doing-${change.doc.id}`]: {
                ...this.state.columns[`doing-${change.doc.id}`],
                taskIds: change.doc.data()!.order_doing,
              },
              [`done-${change.doc.id}`]: {
                ...this.state.columns[`done-${change.doc.id}`],
                taskIds: change.doc.data()!.order_done,
              },
            },
            teamOrder: newTeamOrder, //-- for some reason listening for new teams gives error
          })
        }
        else if (change.type === 'modified') {
          // Update team metadata
          this.setState({
            ...this.state,
            teams: {
              ...this.state.teams,
              [change.doc.id]: {
                color: change.doc.data()!.color,
                name: change.doc.data()!.name,
              },
            },
            columns: {
              ...this.state.columns,
              [`backlog-${change.doc.id}`]: {
                ...this.state.columns[`backlog-${change.doc.id}`],
                taskIds: change.doc.data()!.order_backlog,
              },
              [`todo-${change.doc.id}`]: {
                ...this.state.columns[`todo-${change.doc.id}`],
                taskIds: change.doc.data()!.order_todo,
              },
              [`doing-${change.doc.id}`]: {
                ...this.state.columns[`doing-${change.doc.id}`],
                taskIds: change.doc.data()!.order_doing,
              },
              [`done-${change.doc.id}`]: {
                ...this.state.columns[`done-${change.doc.id}`],
                taskIds: change.doc.data()!.order_done,
              },
            }
          })
        }
        else if (change.type === 'removed') {
          // Delete team
          var newTeams = this.state.teams;
          delete newTeams[change.doc.id];
          
          var newTeamOrder = this.state.teamOrder;
          const idx = newTeamOrder.indexOf(change.doc.id);
          if (idx > -1) {
            newTeamOrder.splice(idx, 1);
          } else {
            console.error("Unable to find column ID in column order");
          }
          
          // Update state
          this.setState({
            ...this.state,
            teams: newTeams,
            teamOrder: newTeamOrder,
          });
        }
      });
    });
  }
  
  listenCards = (teamId: string): void => {
    firebase.firestore().collection('boards')
      .doc(this.props.match.params.boardId)
      .collection('teams')
      .doc(teamId)
      .collection('cards').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            // Add a new card
            this.setState({
              ...this.state,
              tasks: {
                ...this.state.tasks,
                [change.doc.id]: {
                  content: change.doc.data()!.content,
                  id: change.doc.id,
                  status: change.doc.data()!.status,
                  tag: change.doc.data()!.tag,
                },
              },
            });
          }
          else if (change.type === 'modified') {
            // Change a card's details
            this.setState({
              ...this.state,
              tasks: {
                ...this.state.tasks,
                [change.doc.id]: {
                  content: change.doc.data()!.content,
                  id: change.doc.id,
                  status: change.doc.data()!.status,
                  tag: change.doc.data()!.tag,
                },
              },
            });
          }
          else if (change.type === 'removed') {
            // Remove a card
            var newTasks = this.state.tasks;
            delete newTasks[change.doc.id];
            
            // Update state
            this.setState({
              ...this.state,
              tasks: newTasks,
            });
          }
        })
      })
  }
  
  onDragStart = (start: any): void => {
    const homeIndex = this.state.columnOrder.indexOf(this.state.columns[start.source.droppableId]['type']);
    
    this.setState({
      ...this.state,
      homeIndex: homeIndex
    });
  }
  
  addTask = (column: any, newTaskText: string): void => {
    firebase.firestore().collection('boards')
    .doc(this.props.match.params.boardId)
    .collection('teams')
    .doc(column.team)
    .collection('cards')
    .add({
      content: newTaskText,
      id: 'Generating...',
      status: 'backlog',
      tag: 'Generating...'
    }).then((docRef) => {
      // @ts-ignore
      const newTaskOrderArr = this.state.columns[column.id]['taskIds'].concat(docRef.id);
      firebase.firestore().collection('boards')
      .doc(this.props.match.params.boardId)
      .collection('teams')
      .doc(column.team)
      .update({
        order_backlog: newTaskOrderArr
      })
    });
    // TODO: set state temporarily for quick change
    // this.setState({
    //   ...this.state,
    //   columns: {
    //     ...this.state.columns,
    //     [column.id]: {
    //       ...this.state.columns[column.id],
    //       taskIds: newTaskOrderArr
    //     },
    //     tasks: {
    //       ...this.state.tasks,
    //       ['newtask'] :{
    //         content: newTaskText,
    //         id: 'newtask',
    //         status: 'backlog',
    //         tag: 'Generating...'
    //       }
    //     }
    //   }
    // });
  }
  
  onDragEnd = (result: any): void => {
    const { destination, source, draggableId } = result;
    
    this.setState({
      ...this.state,
      homeIndex: -1,
    });
    
    // Dropped outside the droppable areas
    if (!destination) {
      return;
    }
    
    // Dropped in the same place it was picked up
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) {
        return;
    }
    
    const srcColumn = this.state.columns[source.droppableId];
    const dstColumn = this.state.columns[destination.droppableId];
    
    // Reordering in the same column
    if (srcColumn === dstColumn) {
      // Update local state
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
      
      // Update Firebase
      firebase.firestore().collection('boards')
        .doc(this.props.match.params.boardId)
        .collection('teams')
        .doc(srcColumn.team).update({
          [`order_${srcColumn.type}`]: newTaskIds
        });
    } else {
      // Update local state
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
        tasks: {
          ...this.state.tasks,
          [draggableId]: {
            ...this.state.tasks[draggableId],
            'status': dstColumn.type
          }
        }
      };
      
      this.setState(newState);
      
      // Update Firebase
      firebase.firestore().collection('boards')
        .doc(this.props.match.params.boardId)
        .collection('teams')
        .doc(srcColumn.team).update({
          [`order_${srcColumn.type}`]: startTaskIds
        });
      firebase.firestore().collection('boards')
        .doc(this.props.match.params.boardId)
        .collection('teams')
        .doc(dstColumn.team).update({
          [`order_${dstColumn.type}`]: dstTaskIds
        });
      firebase.firestore().collection('boards')
        .doc(this.props.match.params.boardId)
        .collection('teams')
        .doc(srcColumn.team)
        .collection('cards')
        .doc(draggableId).update({
          ['status']: dstColumn.type
        });
    }
  }

  render() {
    // @ts-ignore
    const { tasks } = this.state;
    return (
      <Canvas>
        <TopBar>
          <BoardsButton>
            🐪 Boards
          </BoardsButton>
        </TopBar>
        <header>{this.state.title} - {this.state.boardId}</header>
        <DragDropContext
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
        >
          <Container>
            {
            // @ts-ignore
            this.state.columnOrder.map((columnType, index) => {
              return (
                <ColumnColumn key={columnType}>
                  <Title>{this.state.columnMeta[columnType]['title']}</Title>
                  {
                    // @ts-ignore
                    this.state.teamOrder.map(teamId => {
                      const column = this.state.columns[columnType + '-' + teamId];
                      // @ts-ignore
                      const tasks = column.taskIds.map((taskId) => this.state.tasks[taskId]);
                      const tColor = this.state.teams[teamId]['color'];
                      return (
                        <Column
                          key={column.id}
                          column={column}
                          tasks={tasks}
                          teamColor={tColor}
                          isDroppableDisabled={Math.abs(index - this.state.homeIndex) > 1}
                          addTask={this.addTask}
                        />
                      );
                    })
                  }
                </ColumnColumn>
              );
            }
            )}
          </Container>
        </DragDropContext>
      </Canvas>
    );
  }
}

export default Board;
