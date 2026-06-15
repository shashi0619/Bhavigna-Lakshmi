import { useEffect } from 'react';
import Router from 'next/router';

const Edit = () => {
  useEffect(() => { Router.replace('/gallery'); }, []);
  return null;
};

export default Edit;
