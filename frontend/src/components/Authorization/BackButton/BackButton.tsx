import { Button } from '@/components/ui/button.tsx';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant={'ghost'}
      className='bg-transparent py-2 pl-0 pr-3'
      onClick={() => {
        navigate(-1);
      }}
    >
      <ChevronLeft className='mr-2 h-4 w-4' /> Назад
    </Button>
  );
};

export default BackButton;
