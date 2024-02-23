import { useEffect } from 'react';
// import { Button } from './components/ui/button';
import { Outlet } from 'react-router-dom';
const tg = Telegram.WebApp;
import { Link } from 'react-router-dom';
function Root() {
  useEffect(() => {
    tg.ready();
  }, []);

  // const onClose = () => {
  //   tg.close();
  // };

  return (
    <div className='mx-auto mt-[150px] max-w-[320px]'>
      <Link to={'/auth'}>Login</Link>
      <Outlet />
      {/*<Button onClick={() => onClose()}>Close</Button>*/}
    </div>
  );
}

export default Root;
