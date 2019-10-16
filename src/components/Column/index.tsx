import React from 'react';
import { DropTarget, DragSource } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

const boxTarget = {
  drop(props: any) {
    return { name: props.status };
  }
};

class KanbanColumn extends React.Component<any, any> {
  render() {
    return this.props.connectDropTarget(<div>{this.props.children}</div>);
  }
}

export default DropTarget("kanbanItem", boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(KanbanColumn);