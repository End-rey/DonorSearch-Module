import ChangeProfileCity from '@/components/Profile/ChangeProfile/ChangeProfileCity';
import ChangeProfileDatebirth from '@/components/Profile/ChangeProfile/ChangeProfileDatebirth';
import ChangeProfileSex from '@/components/Profile/ChangeProfile/ChangeProfileSex';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { Camera } from 'lucide-react';

export type fieldProp<
  FieldName extends
    | 'lastName'
    | 'firstName'
    | 'patronymic'
    | 'username'
    | 'birthDate'
    | 'city'
    | 'sex'
    | 'about'
    | 'avatar',
> = ControllerRenderProps<
  {
    lastName: string;
    firstName: string;
    patronymic: string | undefined;
    username: string;
    birthDate: Date;
    city: string;
    sex: 'male' | 'female';
    about: string;
    avatar: any;
  },
  FieldName
>;

const formSchema = z.object({
  lastName: z.string({
    required_error: 'Укажите фамилию',
  }),
  firstName: z.string({ required_error: 'Укажите имя' }),
  patronymic: z.string().or(z.undefined()),
  username: z.string({
    required_error: 'Укажите username',
  }),
  birthDate: z
    .date({
      required_error: 'Укажите дату рождения',
    })
    .max(new Date()),
  city: z.string(),
  sex: z.enum(['male', 'female'], {
    required_error: 'Укажите пол',
  }),
  about: z.string().or(z.undefined()),
  avatar: z.any().or(z.undefined()),
});

const ChangeProfile = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className='my-7 text-2xl font-bold'>Персональные данные</h1>
        <div className='mb-5'>
          <FormField
            control={form.control}
            name='avatar'
            render={({ field }) => (
              <FormItem className='rounded border p-3'>
                <div className='flex flex-col items-center'>
                  <Camera className='h-[25px] w-[25px]' />
                  <p className='text-sm font-semibold'>
                    Перетащите изображение сюда
                  </p>
                  <p className='text-sm font-semibold'>или</p>
                </div>
                <FormControl>
                  <Input id='picture' placeholder={''} type='file' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='my-5'>
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фамилия</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='my-5'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='my-5'>
          <FormField
            control={form.control}
            name='patronymic'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Отчество</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='my-5'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='my-5'>
          <FormField
            control={form.control}
            name='birthDate'
            render={({ field }) => <ChangeProfileDatebirth field={field} />}
          />
        </div>
        <div className='my-5'>
          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <ChangeProfileCity form={form} field={field} />
            )}
          />
        </div>
        <div className='mt-5'>
          <FormField
            control={form.control}
            name='sex'
            render={({ field }) => <ChangeProfileSex field={field} />}
          />
        </div>
        <div className='mb-5'>
          <FormField
            control={form.control}
            name='about'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Textarea
                    className='my-0'
                    placeholder='Расскажите интересное о себе'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full' type='submit'>
          Принять
        </Button>
        {/* {Object.values(form.formState.errors).length === 0 && (
          <div className=' my-5 rounded-md bg-green-300 p-10 text-center opacity-50'>
            Донация успешно сохранена!
          </div>
        )} */}
      </form>
    </Form>
  );
};

export default ChangeProfile;
