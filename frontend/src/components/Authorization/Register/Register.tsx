import { Button } from '@/components/ui/button.tsx';
import { SupportLine } from '@/components/Authorization/SupportLine/SupportLine.tsx';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center'>
      <Button
        variant='link'
        className='p-0 h-3 mb-5 text-links'
        onClick={() => navigate('email')}
      >
        Регистрация по Email
      </Button>
      <Button
        variant='link'
        className='p-0 h-3 text-links'
        onClick={() => navigate('phone')}
      >
        Регистрация по номеру телефона
      </Button>
      <SupportLine />
    </div>
  );
};
