import { useEffect } from 'react';
import Router from 'next/router';

const Success = () => {
  useEffect(() => { Router.replace('/'); }, []);
  return null;
};

export default Success;
