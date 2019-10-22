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
  'backlog-asdfaewfawefa3f': {
    id: 'backlog-asdfaewfawefa3f',
    team: 'asdfaewfawefa3f',
    type: 'backlog',
    taskIds: ['b56de068-e34a-4f90-886f-47241f5f27a8'],
  },
  'todo-asdfaewfawefa3f': {
    id: 'todo-asdfaewfawefa3f',
    team: 'asdfaewfawefa3f',
    type: 'todo',
    taskIds: [],
  },
  'doing-asdfaewfawefa3f': {
    id: 'doing-asdfaewfawefa3f',
    team: 'asdfaewfawefa3f',
    type: 'doing',
    taskIds: [],
  },
  'done-asdfaewfawefa3f': {
    id: 'done-asdfaewfawefa3f',
    team: 'asdfaewfawefa3f',
    type: 'done',
    taskIds: [],
  },
  'backlog-q43gq34gw45ghw4e5g': {
    id: 'backlog-q43gq34gw45ghw4e5g',
    team: 'q43gq34gw45ghw4e5g',
    type: 'backlog',
    taskIds: [],
  },
  'todo-q43gq34gw45ghw4e5g': {
    id: 'todo-q43gq34gw45ghw4e5g',
    team: 'q43gq34gw45ghw4e5g',
    type: 'todo',
    taskIds: ['eb56de068-e34a-4f90-886f-47241f5f27a8'],
  },
  'doing-q43gq34gw45ghw4e5g': {
    id: 'doing-q43gq34gw45ghw4e5g',
    team: 'q43gq34gw45ghw4e5g',
    type: 'doing',
    taskIds: [],
  },
  'done-q43gq34gw45ghw4e5g': {
    id: 'done-q43gq34gw45ghw4e5g',
    team: 'q43gq34gw45ghw4e5g',
    type: 'done',
    taskIds: [],
  },
}

export const TEAMS = {
  'asdfaewfawefa3f': {
    name: 'frontend',
    color: 'green'
  },
  'q43gq34gw45ghw4e5g': {
    name: 'backend',
    color: 'blue',
  }
};

export const TEAMS_ORDER = ['asdfaewfawefa3f', 'q43gq34gw45ghw4e5g'];

export const COLUMN_ORDER = ['backlog', 'todo', 'doing', 'done'];
export const COLUMN_META = {
  'backlog': {
    title: '💩 Backlog',
  },
  'todo': {
    title: '👍 To do',
  },
  'doing': {
    title: '🚀 Doing',
  },
  'done': {
    title: '🎉 Done',
  }
}

export const BTASKS = {
  'b56de068-e34a-4f90-886f-47241f5f27a8': {
    id: 'b56de068-e34a-4f90-886f-47241f5f27a8',
    content: 'Finish coding all of the things here, there, and there'
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
  },
  'feb56de068-e34a-4f90-886f-47241f5f27a8': {
    id: 'eb56de068-e34a-4f90-886f-47241f5f27a8',
    content: 'Zenerate using creat-react-app'
  },
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