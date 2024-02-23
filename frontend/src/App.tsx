// import { Profile } from '@/components/Profile/Profile.tsx';
import { Authorization } from '@/components/Authorization/Authorization.tsx';
import { useEffect } from 'react';
// import { Button } from './components/ui/button';

const tg = Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready();
  }, []);

  // const onClose = () => {
  //   tg.close();
  // };

  return (
    <div className='max-w-[320px] mx-auto mt-[150px]'>
      {/*<Profile />*/}
      <Authorization />
      {/*<Button onClick={() => onClose()}>Close</Button>*/}
    </div>
  );
}

export default App;
