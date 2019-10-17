import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Task from '../Task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

type TaskListProps = {
  isDraggingOver: boolean
}

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props: TaskListProps) => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

type ColumnProps = {
  column: any,
  tasks: any
}

type ColumnState = {
  
}

class KanbanColumn extends React.Component<ColumnProps, ColumnState> {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        {/* 
         // @ts-ignore */}
        <Droppable
          droppableId={this.props.column.id}
        >
          {(provided, snapshot) => (
              // @ts-ignore
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                // @ts-ignore
                isDraggingOver={snapshot.isDraggingOver}
              >
                  {
                  // @ts-ignore
                  this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)
                  }
                  {provided.placeholder}
              </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}

export default KanbanColumn;