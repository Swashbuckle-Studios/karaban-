export const TEST = 'test';

export const TASKS = [
  { _id: 1, title: "Firsty Task", status: "backlog" },
  { _id: 2, title: "Second Task", status: "backlog" },
  { _id: 3, title: "Third Task", status: "backlog" },
  { _id: 4, title: "Fourth Task", status: "new" },
  { _id: 5, title: "Fifth Task", status: "new" },
  { _id: 6, title: "Sixth Task", status: "wip" },
  { _id: 7, title: "Seventh Task", status: "review" },
  { _id: 8, title: "Eighth Task", status: "review" },
  { _id: 9, title: "Ninth Task", status: "done" },
  { _id: 10, title: "Tenth Task", status: "done" }
];

export const COLUMNS = {
  'backlog': {
    id: 'backlog',
    title: 'Backlog',
    taskIds: ['b56de068-e34a-4f90-886f-47241f5f27a8', 'cb56de068-e34a-4f90-886f-47241f5f27a8'],
  },
  'todo': {
    id: 'todo',
    title: 'To do',
    taskIds: [],
  },
  'doing': {
    id: 'doing',
    title: 'Doing',
    taskIds: ['db56de068-e34a-4f90-886f-47241f5f27a8'],
  },
  'done': {
    id: 'done',
    title: 'Done',
    taskIds: ['eb56de068-e34a-4f90-886f-47241f5f27a8'],
  },
}

export const COLUMN_ORDER = ['backlog', 'todo', 'doing', 'done']

export const BTASKS = {
  'b56de068-e34a-4f90-886f-47241f5f27a8': {
    id: 'b56de068-e34a-4f90-886f-47241f5f27a8',
    content: 'Generate using creat-react-app'
  },
  'cb56de068-e34a-4f90-886f-47241f5f27a8': {
    id: 'cb56de068-e34a-4f90-886f-47241f5f27a8',
    content: 'Denerate using creat-react-app'
  },
  'db56de068-e34a-4f90-886f-47241f5f27a8': {
    id: 'db56de068-e34a-4f90-886f-47241f5f27a8',
    content: 'Tenerate using creat-react-app'
  },
  'eb56de068-e34a-4f90-886f-47241f5f27a8': {
    id: 'eb56de068-e34a-4f90-886f-47241f5f27a8',
    content: 'Zenerate using creat-react-app'
  }
}

export const labelsMap = {
  backlog: "Backlog",
  new: "To Do",
  wip: "In Progress",
  review: "Review",
  done: "Done"
};

export const classes = {
  board: {
    display: "flex",
    margin: "0 auto",
    width: "90vw",
    fontFamily: 'Arial, "Helvetica Neue", sans-serif'
  },
  column: {
    minWidth: 200,
    width: "18vw",
    height: "80vh",
    margin: "0 auto",
    backgroundColor: "#FCC8B2"
  },
  columnHead: {
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
    backgroundColor: "#C6D8AF"
  },
  item: {
    padding: 10,
    margin: 10,
    fontSize: "0.8em",
    cursor: "pointer",
    backgroundColor: "white"
  }
};

export const BOARD_ID = 'QHqNTHxEuTc0UGw8FmK2';