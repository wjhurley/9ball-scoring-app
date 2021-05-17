import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';

import { loginUser } from '../../reducers/userSlice';
import { useAppDispatch } from '../../store';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: theme.spacing(2),
  },
}));

function Login(): JSX.Element {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const classes = useStyles();
  const dispatch = useAppDispatch();

  async function userLogin(e: React.SyntheticEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    await dispatch(
      loginUser({
        email,
        password,
      }),
    );
  }

  return (
    <form autoComplete="off" className={classes.root} noValidate onSubmit={userLogin}>
      <TextField
        id="email"
        label="Email"
        onChange={e => setEmail(e.currentTarget.value)}
        required
        value={email}
        variant="outlined"
      />
      <TextField
        autoComplete="current-password"
        id="password"
        label="Password"
        onChange={e => setPassword(e.currentTarget.value)}
        required
        type="password"
        value={password}
        variant="outlined"
      />
      <Button color="primary" type="submit" variant="contained">
        Login
      </Button>
    </form>
  );
}

export default Login;
