import { Authorization } from '@/components/Authorization/Authorization.tsx';
import Donation from '@/components/Donation/Donation';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RegisterPhone } from '@/components/Authorization/Register/RegisterPhone/RegisterPhone.tsx';
import { RegisterEmail } from '@/components/Authorization/Register/RegisterEmail/RegisterEmail.tsx';
import { RegisterCode } from '@/components/Authorization/Register/RegisterCode/RegisterCode.tsx';
import { Profile } from '@/components/Profile/Profile.tsx';
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
    <div className='mx-auto mt-[80px] max-w-[320px]'>
      <Routes>
        <Route path='/DonorSearch-Module' element={<Donation />} />
        <Route path='/DonorSearch-Module/profile' element={<Profile />} />
        <Route path='/DonorSearch-Module/auth' element={<Authorization />} />
        <Route
          path='/DonorSearch-Module/auth/phone'
          element={<RegisterPhone />}
        />
        <Route
          path='/DonorSearch-Module/auth/email'
          element={<RegisterEmail />}
        />
        <Route
          path='/DonorSearch-Module/auth/email/pin'
          element={<RegisterCode />}
        />
        <Route
          path='/DonorSearch-Module/auth/phone/pin'
          element={<RegisterCode />}
        />
      </Routes>
      {/*<Button onClick={() => onClose()}>Close</Button>*/}
    </div>
  );
}

export default App;
