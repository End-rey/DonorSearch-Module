import { z } from 'zod';
import { Form, FormField } from '@/components/ui/form';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DonationType from '@/components/Donation/DonationType';
import DonationDate from '@/components/Donation/DonationDate';
import DonationPrice from '@/components/Donation/DonationPrice';
import DonationPlace from '@/components/Donation/DonationPlace';
import DonationCity from '@/components/Donation/DonationCity';
import DonationCenter from '@/components/Donation/DonationCenter';
import DonationCertificate from '@/components/Donation/DonationCertificate';
import DonationCertificateDate from '@/components/Donation/DonationCertificateDate';
import { Button } from '@/components/ui/button';
import { notification } from '@/api/auth';

export type fieldProp<
  FieldName extends
    | 'donationType'
    | 'donationData'
    | 'donationPrice'
    | 'donationPlace'
    | 'donationCity'
    | 'donationCenter',
> = ControllerRenderProps<
  {
    donationType: 'blood' | 'plasma' | 'trombs' | 'erits' | 'granuls';
    donationData: Date;
    donationPrice: 'free' | 'money';
    donationPlace: 'station' | 'event';
    donationCity: string;
    donationCenter: string | undefined;
  },
  FieldName
>;

const formSchema = z
  .object({
    donationType: z.enum(['blood', 'plasma', 'trombs', 'erits', 'granuls'], {
      required_error: 'Выберите тип донации',
    }),
    donationData: z.date({ required_error: 'Выберите дату' }).min(new Date()),
    donationPrice: z.enum(['free', 'money'], {
      required_error: 'Выберите тип донации',
    }),
    donationPlace: z.enum(['station', 'event'], {
      required_error: 'Выберите место сдачи',
    }),
    donationCity: z.string({
      required_error: 'Выберите город сдачи',
    }),
    donationCenter: z.string().or(z.undefined()),
  })
  .refine(
    (schema) => schema.donationPlace === 'event' || schema.donationCenter,
    { message: 'Выберите центр сдачи', path: ['donationCenter'] }
  );
const DonationNotification = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      donationType: 'blood',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    notification(values);
  }
  const donationPlace = form.watch('donationPlace');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className='my-7 text-2xl font-bold'>Напоминание о донации</h1>
        <div className='my-5'>
          <FormField
            control={form.control}
            name='donationType'
            render={({ field }) => <DonationType field={field} />}
          />
        </div>
        <div className='my-5'>
          <FormField
            control={form.control}
            name='donationData'
            render={({ field }) => <DonationDate field={field} />}
          />
        </div>
        <div className='my-5'>
          <FormField
            control={form.control}
            name='donationPrice'
            render={({ field }) => <DonationPrice field={field} />}
          />
        </div>
        <div className='my-5'>
          <FormField
            control={form.control}
            name='donationPlace'
            render={({ field }) => <DonationPlace field={field} />}
          />
        </div>
        <div className='my-5'>
          <FormField
            control={form.control}
            name='donationCity'
            render={({ field }) => <DonationCity field={field} form={form} />}
          />
        </div>
        {donationPlace === 'station' && (
          <div className='my-5'>
            <FormField
              control={form.control}
              name='donationCenter'
              render={({ field }) => (
                <DonationCenter field={field} form={form} />
              )}
            />
          </div>
        )}
        <Button className='w-full' type='submit'>
          Напомнить о донации
        </Button>
        {/* {Object.values(form.formState.errors).length === 0 && (
          <div className=' my-5 rounded-md bg-green-300 p-10 text-center opacity-50'>
            Напоминание о донации добавлено!
          </div>
        )} */}
      </form>
    </Form>
  );
};

export default DonationNotification;
