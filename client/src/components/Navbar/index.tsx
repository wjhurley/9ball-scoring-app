import List from '@material-ui/core/List';
import { makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';

import ListItemLink from '../ListItemLink';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
}));

function Navbar(): JSX.Element {
  const classes = useStyles();

  return (
    <List aria-label="main site navigation" className={classes.root} component="nav">
      <ListItemLink primary="Home" to="/" />
      <ListItemLink primary="Login" to="/login" />
      <ListItemLink primary="Setup" to="/setup" />
      <ListItemLink primary="Play" to="/play" />
      <ListItemLink primary="Stats" to="/stats" />
      <ListItemLink primary="Edit" to="/edit" />
    </List>
  );
}

export default Navbar;
