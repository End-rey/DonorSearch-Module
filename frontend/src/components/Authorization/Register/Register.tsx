import { Button } from '@/components/ui/button.tsx';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center'>
      <Button asChild variant='link' className='mb-5 h-3 p-0 text-links'>
        <Link to={'/auth/email'}>Регистрация по Email</Link>
      </Button>
      <Button asChild variant='link' className='h-3 p-0 text-links'>
        <Link to={'/auth/phone'}>Регистрация по номеру телефона</Link>
      </Button>
    </div>
  );
};
