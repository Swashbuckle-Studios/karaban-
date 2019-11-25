import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import AccountCircle from '@material-ui/icons/AccountCircle';

const FunHeader = styled.h1`
  margin-top: 0;
`;

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  padding: 40px;
`;

const chipData = ['default', 'test1'];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: theme.spacing(0.5),
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }),
);

type NewBoardFormProps = {
  uid: string,
  nextStep?: any,
  closeDialog: any,
}

type NewBoardFormState = {
  activeBoardTitle: string,
}

const INITIAL_STATE = {
  activeBoardTitle: '',
}

class NewBoardForm extends React.Component<NewBoardFormProps, NewBoardFormState> {
  constructor(props: any) {
    super(props);
    
    this.state = {...INITIAL_STATE};
  }
  
  handleBoardTitleChange = (event: any): void => {
    this.setState({
      ...this.state,
      activeBoardTitle: event.target.value,
    });
  }
  
  createBoard = (): void => {
    firebase.firestore().collection('boards').add({
      author: this.props.uid,
      title: this.state.activeBoardTitle,
    })
    .then((docRef: any) => {
      // Add self to board members
      firebase.firestore().collection('boards')
        .doc(docRef.id)
        .collection('members')
        .doc(this.props.uid).set({
          'Full name': this.props.uid // TODO get actual name
        });
      // Create a sample team
      firebase.firestore().collection('boards')
        .doc(docRef.id)
        .collection('teams')
        .doc('default').set({
          color: 'red',
          title: 'default',
          order_backlog: [],
          order_todo: [],
          order_doing: [],
          order_done: [],
        })
      // Add board to user's profile
      firebase.firestore().collection('users')
        .doc(this.props.uid)
        .collection('joined_boards')
        .doc(docRef.id).set({
          title: this.state.activeBoardTitle,
        })
    })
    .then(() => {
      this.props.closeDialog();
    })
  }
  
  render() {
    // console.log(firebase.auth().currentUser!.uid);
    return (
      <Container>
        <div>
          <FunHeader>Let's create a new board</FunHeader>
          <h3>Basics</h3>
        </div>
        
        <TextField
          type="text"
          value={this.state.activeBoardTitle}
          onChange={this.handleBoardTitleChange}
          required={true}
          label="Board name"
          variant="outlined"
        />
        
        <h3>Teams</h3>
        
        <Paper className={useStyles().root}>
          {chipData.map((data: any) => {
            return (
              <Chip
                key={data}
                label={data}
                onDelete={this.createBoard}
                className={useStyles().chip}
              />
            );
          })}
        </Paper>
        
        <br />
        
        <TextField
          type="text"
          label="Add a new team"
          variant="filled"
        />
        
        <h3>Collaborators</h3>
        
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Add collaborators" />
          </Grid>
        </Grid>
        
        <br />
        
        <Button
          onClick={this.createBoard}
          variant="contained"
          color="primary"
        >
          Create Board
        </Button>
      </Container>
    );
  }
}

export default NewBoardForm;