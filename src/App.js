import React from 'react';
import UserForm from './pages/UserFrom';
import UserTable from './pages/UserTable';
import { UserProvider } from './context/UserContext';
import './style.css'

const App = () => {
  return (
      <UserProvider>
        <UserForm />
        <UserTable />
      </UserProvider>
  );
};

export default App;