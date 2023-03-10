import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import AdminMainNavigation from './AdminMainNavigation';

const AdminLayout = (props) => {
  return (
    <Fragment>
      <AdminMainNavigation />
        <Outlet>{props.children}</Outlet>
    </Fragment>
  );
};

export default AdminLayout;