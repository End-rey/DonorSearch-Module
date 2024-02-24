import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';

export const DonationSpawn = () => {
  return (
    <div className='mt-2 flex flex-col items-start rounded-3xl p-3'>
      <h3 className='text-base font-semibold opacity-80'>
        Напомнить о донации
      </h3>
      <p className='text-sm opacity-50'>
        Укажите центр крови, планируемую дату и тип донации. За 3 дня до
        намеченной даты мы пришлём напоминание на электронную почту.
      </p>
      <div className='my-4 flex items-center'>
        <AlertCircle color='#ff0000' className='mr-2 h-12 w-12' />
        <p className='text-sm font-bold leading-5 opacity-80'>
          Планирование не означает запись на&nbsp;донацию в центр крови
        </p>
      </div>
      <Button
        variant={'outline'}
        className='w-full rounded-xl border-primary bg-transparent'
      >
        Напомнить о донации
      </Button>
    </div>
  );
};
