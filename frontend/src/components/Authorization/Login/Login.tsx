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
import { SupportLine } from '@/components/Authorization/SupportLine/SupportLine.tsx';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Введите ваше имя пользователя',
  }),
  password: z.string(),
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
    navigate('/DonorSearch-Module/profile');
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 flex flex-col items-center'
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
          <Button type='submit' className='bg-redMain w-20'>
            Войти
          </Button>
        </form>
      </Form>
      <SupportLine />
    </>
  );
};
