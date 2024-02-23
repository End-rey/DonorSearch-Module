import { Button } from '@/components/ui/button.tsx';
import { ChevronLeft } from 'lucide-react';

export const BackButton = () => {
  return (
    <Button>
      <ChevronLeft className='mr-2 h-4 w-4' /> Назад
    </Button>
  );
};

export default BackButton;
