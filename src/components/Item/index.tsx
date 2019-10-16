import React from 'react';
import { DropTarget, DragSource } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

const boxSource = {
  beginDrag(props: any) {
    return {
      name: props.id
    };
  },

  endDrag(props: any, monitor: any) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      props.onDrop(monitor.getItem().name, dropResult.name);
    }
  }
};

class KanbanItem extends React.Component<any, any> {
  render() {
    return this.props.connectDragSource(<div>{this.props.children}</div>);
  }
}

export default DragSource("kanbanItem", boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(KanbanItem);