
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
    <>
      {/*<Profile />*/}
      <Authorization />
      {/*<Button onClick={() => onClose()}>Close</Button>*/}
    </>
  );
}

export default App;
