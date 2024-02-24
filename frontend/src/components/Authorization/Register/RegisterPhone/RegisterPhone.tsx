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
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SupportLine } from '@/components/Authorization/SupportLine/SupportLine.tsx';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/Authorization/BackButton/BackButton.tsx';

const formSchema = z.object({
  phone: z.string().min(1, {
    message: 'Поле обязательно к заполнению',
  }),
  password: z.string().min(1, {
    message: 'Поле обязательно к заполнению',
  }),
  username: z.string().min(1, {
    message: 'Поле обязательно к заполнению',
  }),
});
export const RegisterPhone = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '+7',
      password: '',
      username: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <>
      <BackButton />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-[100%] space-y-4'
        >
          <h3 className='text-2xl font-medium'>
            Регистрация по номеру телефона
          </h3>
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Номер телефона<span className='text-sm text-redMain'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='tel'
                    placeholder='Номер телефона с +7'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Пароль<span className='text-sm text-redMain'>*</span>
                </FormLabel>
                <FormControl>
                  <Input type={'password'} placeholder='Пароль' {...field} />
                </FormControl>
                <FormDescription>
                  Пароль должен содержать минимум 8 символов и состоять из цифр
                  и букв
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Имя пользователя
                  <span className='text-sm text-redMain'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='Имя пользователя' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='w-[100%]'
            onClick={() => navigate('pin')}
          >
            Зарегистрироваться
          </Button>
        </form>
      </Form>
      <SupportLine />
    </>
  );
};
