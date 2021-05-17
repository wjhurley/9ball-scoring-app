import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  icon?: React.Component;
  primary: string;
  to: string;
};

function ListItemLink(props: Props): JSX.Element {
  const { icon, primary, to } = props;

  const CustomLink = React.useMemo(() => {
    return React.forwardRef<HTMLAnchorElement>((linkProps, ref) => (
      <Link ref={ref} to={to} {...linkProps} />
    ));
  }, [to]);

  return (
    <li>
      <ListItem button component={CustomLink}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default ListItemLink;
