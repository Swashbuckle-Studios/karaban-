import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import TextareaAutosize from 'react-textarea-autosize';
import Button from '@material-ui/core/Button';

import Task from '../Task';

import { potentialTasks } from '../../potential-tasks';

const Container = styled.div`
  margin: 8px;
  border-radius: 2px;
  width: 100%;
  min-width: 150px;
  display: flex;
  flex-direction: column;
`;

type TaskListProps = {
  isDraggingOver: boolean,
  teamColor: string
}

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props: TaskListProps) => (props.isDraggingOver ? '#d5d5d5' : '#e2e2e2')};
  min-height: 100px;
  border-radius: 5px;
  border-top: 5px solid ${(props: TaskListProps) => (props.teamColor ? props.teamColor : '#e2e2e2')};
  letter-spacing: 0px;
`;

const CardyContainer = styled.div`
  text-align: center;
  margin-left: 8px;
  margin-right: 8px;
`;

const AddButton = styled.button`
  width: 100%;
  background-color: #e2e2e2;
  border-radius: 5px;
  border: none;
  color: #595959;
  padding: 8px 10px;
  text-align: center;
  font-size: 16px;
  opacity: 0.6;
  transition: 0.3s;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  
  :hover {
    opacity: 1;
    background-color: #eeeeee;
  }
  
  :focus {
    outline: none;
  }
`;

const NewCardInput = styled(TextareaAutosize)`
  width: 80%;
  width: -moz-available;          /* WebKit-based browsers will ignore this. */
  width: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
  width: fill-available;
  border-radius: 6px;
  border: none;
  resize: none;
  padding: 12px;
  box-shadow: none;
  font-size: 15px;
  
  font-family: 'Cabin', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  
  :focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

const CancelButton = styled.button`
`;

const SubmitButton = styled.button`
`;

type ColumnProps = {
  column: any,
  tasks: any,
  teamColor: string,
  isDroppableDisabled: boolean,
  addTask: any,
}

type ColumnState = {
  addingNew: boolean,
  addingNewText: string,
}

const INITIAL_STATE = {
  addingNew: false,
  addingNewText: '',
}

class KanbanColumn extends React.Component<ColumnProps, ColumnState> {
  constructor(props: any) {
    super(props);
    this.state = {...INITIAL_STATE};
    
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
  }
  
  handleTextAreaChange = (event: any): void => {
    this.setState({
      ...this.state,
      addingNewText: event.target.value
    })
  }
  
  showCreationEditor = (): void => {
    this.setState({
      ...this.state,
      addingNew: true,
      addingNewText: '',
    });
  }
  
  cancelCreationEditor = (): void => {
    this.setState({
      ...this.state,
      addingNew: false,
    });
  }
  
  render() {
    return (
      <Container>
        {/* 
         // @ts-ignore */}
        <Droppable
          droppableId={this.props.column.id}
          type={this.props.column.team}
          isDropDisabled={this.props.isDroppableDisabled}
        >
          {(provided, snapshot) => (
              // @ts-ignore
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                // @ts-ignore
                isDraggingOver={snapshot.isDraggingOver}
                teamColor={this.props.teamColor}
              >
                  {
                  // @ts-ignore
                  this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} teamColor={'black'}/>)
                  }
                  {provided.placeholder}
                {this.props.column.type === "backlog" && !this.state.addingNew &&
                  <CardyContainer>
                    <AddButton
                      onClick={this.showCreationEditor}
                    >
                      Add new card
                    </AddButton>
                  </CardyContainer>
                }
                {this.props.column.type === "backlog" && this.state.addingNew &&
                  <CardyContainer>
                    <NewCardInput
                      value={this.state.addingNewText}
                      onChange={this.handleTextAreaChange}
                      placeholder={potentialTasks[Math.floor(Math.random() * potentialTasks.length)]}
                    />
                    <ButtonContainer>
                      <Button
                        onClick={this.cancelCreationEditor}>
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          this.props.addTask(this.props.column, this.state.addingNewText);
                          this.cancelCreationEditor();
                        }}
                      >
                        Add
                      </Button>
                    </ButtonContainer>
                  </CardyContainer>
                }
              </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}

export default KanbanColumn;