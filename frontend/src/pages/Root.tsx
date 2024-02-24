import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function Root() {
  useEffect(() => {
    Telegram.WebApp.ready();
  }, []);

  return (
    <div className='container mx-auto'>
      <Outlet />
    </div>
  );
}

export default Root;
