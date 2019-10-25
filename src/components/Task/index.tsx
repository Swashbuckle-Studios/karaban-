import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

type ContainerProps = {
  isDragging: boolean;
  isDragDisabled: boolean;
  isTodo: boolean;
  myDelay: number;
  teamColor: string;
}

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

  margin: 8px;
  border-radius: 6px;
  background: ${(props: ContainerProps) => (
    props.isDragging ? 'rgb(255, 255, 255, 0.8)': 
      props.isDragDisabled ? 'rgb(255, 255, 255, 0.6)' : (props: ContainerProps) => (
        props.isTodo ? 'linear-gradient(-45deg, #fdede8, #fce8f0, #e9f7fc, #e9fbf7)' : 'white'
      )
    )};
  background-size: 400% 400%;
  padding: 12px;
  font-weight: 400;
  font-size: 15px;
  animation: borderBlink 5s ease infinite;
`;

class Task extends React.Component<any, any> {
  render() {
    // Reenable this once auth is working -- once you drag into Todo, you are auto-ssigned and only one who can move it
    const isDragDisabled: boolean = false /*this.props.task.status !== 'backlog' /*|| this.props.task.caravaneer !== null*/;
    const isTodo: boolean = this.props.task.status === 'doing';
    return (
      <Draggable
        draggableId={this.props.task.id}
        index={this.props.index}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          // @ts-ignore
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
            // @ts-ignore
            isDragDisabled={isDragDisabled}
            isTodo={isTodo}
            myDelay={(Math.random() * 5) + 10}
            teamColor={this.props.teamColor}
          >
            {this.props.task.content}
          </Container>
        )}
        
      </Draggable>
    );
  }
}

export default Task;