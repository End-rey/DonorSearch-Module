import { Dot, MoreVertical } from 'lucide-react';
import Blood from '@/assets/icons/blood-icons.svg';
import * as React from 'react';

export const DonationRefCard = () => {
  return (
    <div className='w-[240px] rounded-2xl p-4'>
      <div className='flex w-full justify-between'>
        <p className='text-sm font-normal opacity-50'>date</p>
        <MoreVertical />
      </div>
      <p className='line-clamp-2 font-bold opacity-80'>
        ФГБОУВО «Первый Санкт-Петербургский государственный медицинский
        университет имени академика И.П. Павлова» Министерства здравоохранения
        Российской Федерации, опк"
      </p>
      <p className='line-clamp-1 text-sm font-normal opacity-50'>
        ул. Льва Толстого, д. 19 корп. 53
      </p>
      <div className='flex items-center border-y py-2'>
        <img src={Blood} alt='Blood' />
        <p className='ml-2 text-sm font-semibold'>Цельная кровь</p>
      </div>
      <div className='mt-2 flex flex-col items-start'>
        <p className='text-sm font-normal opacity-50'>Безвозмездно</p>
        <div className='flex items-center'>
          <Dot color='#c2c2c2' />
          <p className='text-sm font-normal'>Без справки</p>
        </div>
      </div>
    </div>
  );
};

export default DonationRefCard;
