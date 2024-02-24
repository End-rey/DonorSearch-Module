import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import Blood from '@/assets/icons/blood-icons.svg';
import Plasma from '@/assets/icons/plasma-icons.svg';
import Trombo from '@/assets/icons/tromb-icons.svg';
import Eritroc from '@/assets/icons/eritroc-icons.svg';
import Leukocyt from '@/assets/icons/leukocytes-icons.svg';

import { ChevronRight, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import * as React from 'react';
import { Button } from '@/components/ui/button.tsx';
export const AvatarCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  return (
    <>
      <Accordion type='single' collapsible className='w-[100%]'>
        <AccordionItem value='item-1'>
          <div className='items-left flex w-[100%] flex-col content-center justify-center gap-4 border-0 pb-2'>
            <div className='flex flex-col rounded-3xl bg-white p-3'>
              <div className='flex items-center gap-4'>
                <div className='flex flex-shrink-0 flex-col items-center'>
                  <Avatar className='w-[60px]'>
                    <AvatarImage
                      src='https://github.com/shadcn.png'
                      alt='avatar'
                      className='h-[60px] w-[60px]'
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {isOpen ? (
                    <div className='drop-shadow-3xl rounded-3xl border-x-2 border-b-2 p-1 text-xs'>
                      AB (IV) Rh-
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className='flex w-[100%] items-center justify-between gap-2'>
                  <div className='flex flex-col'>
                    <p className='text-xl font-bold'>Имя</p>
                    {isOpen ? (
                      <p className='text-sm font-normal'>Санкт-Петербург</p>
                    ) : (
                      ''
                    )}
                  </div>
                  <AccordionTrigger
                    onClick={() => {
                      toggleAccordion();
                    }}
                  >
                    {isOpen ? (
                      ''
                    ) : (
                      <div className='flex h-[25px] w-full items-center'>
                        <p className='text-sm font-medium'>Развернуть</p>
                        <ChevronRight className='h-5 w-5 shrink-0' />
                      </div>
                    )}
                  </AccordionTrigger>
                </div>
              </div>
              {isOpen ? (
                ''
              ) : (
                <Button
                  variant={'whiteEdition'}
                  className='mt-4 rounded-xl bg-redMain text-base font-semibold text-white hover:bg-redMain hover:text-white'
                >
                  Добавить донацию
                </Button>
              )}
              {isOpen ? (
                <div className='flex items-end justify-between'>
                  <p className='h-[25px] rounded-3xl bg-red-300 px-3 py-1 text-xs'>
                    Потенциальный донор
                  </p>
                  <p className='items-end font-bold'>
                    <span className='mr-2 text-4xl font-medium'>12</span>{' '}
                    Донаций
                  </p>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <AccordionContent>
            <div className='mt-2 flex flex-col items-center rounded-3xl bg-white'>
              <p className='w-[200px] text-center font-medium'>
                Здесь будут отображаться ваши донации
              </p>
              <div className='mt-2 flex items-center gap-2'>
                <div className='flex flex-col items-center'>
                  <img src={Blood} alt='Blood' />
                  <p>0</p>
                </div>
                <div className='flex flex-col items-center'>
                  <img src={Plasma} alt='Plasma' />
                  <p>0</p>
                </div>
                <div className='flex flex-col items-center'>
                  <img src={Trombo} alt='Trombocytes' />
                  <p>0</p>
                </div>
                <div className='flex flex-col items-center'>
                  <img src={Eritroc} alt='Eritrocytes' />
                  <p>0</p>
                </div>
                <div className='flex flex-col items-center'>
                  <img src={Leukocyt} alt='Leukocytes' />
                  <p>0</p>
                </div>
              </div>
            </div>
          </AccordionContent>
          {isOpen ? (
            <AccordionTrigger
              className='flex justify-center pt-0'
              onClick={() => {
                toggleAccordion();
              }}
            >
              <div className='flex flex-col items-center'>
                <ChevronUp className='h-4 w-4 shrink-0 transition-transform duration-200' />
                <p className='mx-1 flex items-baseline text-sm font-medium'>
                  Свернуть
                </p>
              </div>
            </AccordionTrigger>
          ) : (
            ''
          )}
        </AccordionItem>
      </Accordion>
    </>
  );
};
