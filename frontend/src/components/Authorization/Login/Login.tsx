import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  username: z.string().min(1, {
    message: 'Введите ваше имя пользователя',
  }),
  password: z.string().min(1, {
    message: 'Введите пароль',
  }),
});

export const Login = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    Telegram.WebApp.sendData(JSON.stringify(values));
    navigate('/profile');
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col items-center space-y-4'
        >
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem className='w-[100%]'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Номер телефона или Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='w-[100%]'>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input placeholder='Пароль' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-20'>
            Войти
          </Button>
        </form>
      </Form>
    </>
  );
};
