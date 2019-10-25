import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Task from '../Task';

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

type ColumnProps = {
  column: any,
  tasks: any,
  teamColor: string,
  isDroppableDisabled: boolean,
}

type ColumnState = {
  
}

class KanbanColumn extends React.Component<ColumnProps, ColumnState> {
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
                {this.props.column.type === "backlog" &&
                  <p>Add new</p>
                }
              </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}

export default KanbanColumn;