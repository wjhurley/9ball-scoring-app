import * as React from 'react';

import Navbar from '../components/Navbar';

interface Props {
  onClick: (route: string) => void;
}

function Header() {
  return <Navbar />;
}

export default Header;
