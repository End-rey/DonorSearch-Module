import { Button } from '@/components/ui/button.tsx';
import { RegisterEmail } from '@/components/Authorization/Register/RegisterEmail/RegisterEmail.tsx';
import { RegisterPhone } from '@/components/Authorization/Register/RegisterPhone/RegisterPhone.tsx';
import { SupportLine } from '@/components/Authorization/SupportLine/SupportLine.tsx';
import { RegisterCode } from '@/components/Authorization/Register/RegisterCode/RegisterCode.tsx';

export const Register = () => {
  return (
    <div className='flex flex-col items-center'>
      <RegisterCode />
      <RegisterEmail />
      <RegisterPhone />
      <Button variant='link' className='p-0 h-3 mb-5'>
        Регистрация по Email
      </Button>
      <Button variant='link' className='p-0 h-3'>
        Регистрация по номеру телефона
      </Button>
      <SupportLine />
    </div>
  );
};
