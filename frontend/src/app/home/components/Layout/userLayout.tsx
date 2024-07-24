import React, { ReactNode } from 'react';
import UserHeader from '../Header/userHeader';

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <>
      <UserHeader />
      <div>{children}</div>
    </>
  );
};

export default UserLayout;
