import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Login } from '@/components/Authorization/Login/Login.tsx';
import { Register } from '@/components/Authorization/Register/Register.tsx';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { SupportLine } from '@/components/Authorization/SupportLine/SupportLine';

export const Authorization = () => {
  return (
    <Card className='rounded-3xl'>
      <Tabs defaultValue='account'>
        <CardHeader className='px-2 pb-0'>
          <TabsList className='mb-3 justify-start bg-transparent'>
            <TabsTrigger value='account' className='text-2xl'>
              Вход
            </TabsTrigger>
            <div className='border-r-1 mx-2 h-[20px] w-[1px] bg-foreground'></div>
            <TabsTrigger value='password' className='text-2xl'>
              Регистрация
            </TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className='px-2'>
          <TabsContent value='account'>
            <Login />
          </TabsContent>
          <TabsContent value='password'>
            <Register />
          </TabsContent>
        </CardContent>
        <CardFooter className='px-2'>
          <SupportLine />
        </CardFooter>
      </Tabs>
    </Card>
  );
};
