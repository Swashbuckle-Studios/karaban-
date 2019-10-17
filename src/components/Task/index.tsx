import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

type ContainerProps = {
  isDragging: boolean
}

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  transition: background-color 0.2s ease;
  background-color: ${(props: ContainerProps) => (props.isDragging ? 'lightgreen': 'white')};
`;

class Task extends React.Component<any, any> {
  render() {
    return (
      <Draggable
        draggableId={this.props.task.id}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          // @ts-ignore
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          >
            {this.props.task.content}
          </Container>
        )}
        
      </Draggable>
    );
  }
}

export default Task;