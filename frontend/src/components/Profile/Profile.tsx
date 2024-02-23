import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs.tsx';
import { AvatarCard } from '@/components/Profile/AvatarCard/AvatarCard.tsx';

export const Profile = () => {
  return (
    <Tabs defaultValue='account' className='bg-white rounded-3xl py-3 px-2'>
      <TabsList className='justify-start bg-transparent mb-3'>
        <TabsTrigger value='profile' className='text-sm'>
          Мой профиль
        </TabsTrigger>
        <div className='border-r-1 w-[1px] h-[20px] bg-dark'></div>
        <TabsTrigger value='place' className='text-sm'>
          Где сдать
        </TabsTrigger>
        <div className='border-r-1 w-[1px] h-[20px] bg-dark'></div>
        <TabsTrigger value='settings' className='text-sm'>
          Настройки
        </TabsTrigger>
      </TabsList>
      <TabsContent value='profile'>
        <AvatarCard />
      </TabsContent>
      <TabsContent value='place'>Где сдать</TabsContent>
      <TabsContent value='settings'>Настройки</TabsContent>
    </Tabs>
  );
};
