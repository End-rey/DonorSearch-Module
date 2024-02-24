import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs.tsx';
import { AvatarCard } from '@/components/Profile/AvatarCard/AvatarCard.tsx';
import { DonationSpawn } from '@/components/Profile/DonationSpawn/DonationSpawn.tsx';
import { MyDonation } from '@/components/Profile/MyDonation/MyDonation.tsx';

export const Profile = () => {
  return (
    <Tabs
      defaultValue='account'
      className='my-3 flex w-full flex-col items-center rounded-3xl'
    >
      <TabsList className='justify-start bg-transparent'>
        <TabsTrigger value='profile' className='text-sm'>
          Мой профиль
        </TabsTrigger>
        <div className='border-r-1 h-[20px] w-[1px] bg-dark'></div>
        <TabsTrigger value='place' className='text-sm'>
          Где сдать
        </TabsTrigger>
        <div className='border-r-1 h-[20px] w-[1px] bg-dark'></div>
        <TabsTrigger value='settings' className='text-sm'>
          Настройки
        </TabsTrigger>
      </TabsList>
      <TabsContent value='profile' className='w-full p-0'>
        <AvatarCard />
        <DonationSpawn />
        <MyDonation />
      </TabsContent>
      <TabsContent value='place'>Где сдать</TabsContent>
      <TabsContent value='settings'>Настройки</TabsContent>
    </Tabs>
  );
};
