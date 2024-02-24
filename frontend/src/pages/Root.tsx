import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
const tg = Telegram.WebApp;
function Root() {
  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className='container mx-auto'>
      <Outlet />
    </div>
  );
}

export default Root;
