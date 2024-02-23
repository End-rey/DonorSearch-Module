import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Login } from '@/components/Authorization/Login/Login.tsx';
import { Register } from '@/components/Authorization/Register/Register.tsx';

export const Authorization = () => {
  return (
    <Tabs defaultValue='account' className='w-[400px] bg-transparent'>
      <TabsList className='justify-start'>
        <TabsTrigger value='account' className='text-2xl'>
          Вход
        </TabsTrigger>
        <div className='border-r-1 w-[1px] h-[20px] bg-dark mx-2'></div>
        <TabsTrigger value='password' className='text-2xl'>
          Регистрация
        </TabsTrigger>
      </TabsList>
      <TabsContent value='account'>
        <Login />
      </TabsContent>
      <TabsContent value='password'>
        <Register />
      </TabsContent>
    </Tabs>
  );
};
