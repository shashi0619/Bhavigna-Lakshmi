import { useEffect } from 'react';
import Router from 'next/router';

const Admin = () => {
  useEffect(() => { Router.replace('/'); }, []);
  return null;
};

export default Admin;
