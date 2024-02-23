import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';


import { Button } from '@/components/ui/button.tsx';
export const AvatarCard = () => {
  return (
    <div className='flex flex-col justify-center content-center items-left gap-4'>
      <h2 className='text-3xl text-left font-semibold w-[100%]'>Профиль</h2>
      <div className='rounded-3xl bg-white flex flex-col p-4 w-[100%]'>
        <div className='flex gap-4  items-center'>
          <Avatar>
            <AvatarImage
              src='https://github.com/shadcn.png'
              alt='avatar'
              className='w-20 h-20'
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-2'>
            <p className='text-2xl font-bold'>Имя</p>
            <p className='bg-red-300 py-1 px-3 rounded-3xl'>Почетный донор</p>
          </div>
        </div>
        <p className='items-end'>
          <span className='text-4xl mr-4'>12</span> Донаций
        </p>
      </div>
      <div className='flex justify-between'>
        <Button variant={'whiteEdition'} className='w-[150px] h-[150px]'>
          Добавить донацию
        </Button>
        <Button variant={'whiteEdition'} className='w-[150px] h-[150px]'>
          Напомнить о донации
        </Button>
      </div>
    </div>
  );
};
