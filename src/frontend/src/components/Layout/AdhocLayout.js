import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import AdhocMainNavigation from './AdhocMainNavigation';

const AdhocLayout = (props) => {
  return (
    <Fragment>
      <AdhocMainNavigation />
        <Outlet>{props.children}</Outlet>
    </Fragment>
  );
};

export default AdhocLayout;