import { Button } from '@/components/ui/button.tsx';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Dot, MoreVertical } from 'lucide-react';
import Blood from '@/assets/icons/blood-icons.svg';
import * as React from 'react';
import DonationRefCard from '@/components/Profile/MyDonation/DonationRefCard/DonationRefCard.tsx';

export const MyDonation = () => {
  return (
    <div>
      <h2 className='text-2xl font-medium'>Мои донации</h2>
      <div className='flex  w-full items-center justify-center rounded-3xl px-4 py-4'>
        <Button className='w-full rounded-xl text-base font-semibold'>
          Добавить донацию
        </Button>
      </div>
      <Carousel className='mt-4'>
        <CarouselContent>
          <CarouselItem>
            <DonationRefCard />
          </CarouselItem>
          <CarouselItem>
            <DonationRefCard />
          </CarouselItem>
          <CarouselItem>
            <DonationRefCard />
          </CarouselItem>
          <CarouselItem>
            <div className='flex w-full flex-col items-center justify-center rounded-3xl px-4 py-10'>
              <p className='mb-4 text-xl font-bold'>Добавить донацию</p>
              <Button className='w-full rounded-xl  text-base font-semibold'>
                Загрузить справку
              </Button>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};
