import { useEffect } from 'react';
import { Button } from './components/ui/button';

const tg = Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
    tg.close();
  };

  return (
    <>
      <div>Hello!</div>
      <Button onClick={() => onClose()}>Close</Button>
    </>
  );
}

export default App;
