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

export type fieldProp<
  FieldName extends
    | 'donationType'
    | 'donationData'
    | 'donationPrice'
    | 'donationPlace'
    | 'donationCity'
    | 'donationCenter'
    | 'donationCertificateDate'
    | 'donationCertificate',
> = ControllerRenderProps<
  {
    donationType: 'blood' | 'plasma' | 'trombs' | 'erits' | 'granuls';
    donationData: Date;
    donationPrice: 'free' | 'money';
    donationPlace: 'station' | 'event';
    donationCity: string;
    donationCenter: string | undefined;
    donationCertificateDate: 'today' | 'then';
    donationCertificate: any;
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
    donationCertificateDate: z.enum(['today', 'then'], {
      required_error: 'Выберите дату загрузки справки',
    }),
    donationCertificate: z.any().or(z.undefined()),
  })
  .refine(
    (schema) => schema.donationPlace === 'event' || schema.donationCenter,
    { message: 'Выберите центр сдачи', path: ['donationCenter'] }
  )
  .refine(
    (schema) =>
      schema.donationCertificateDate === 'then' ||
      schema.donationCertificate?.length > 0,
    { message: 'Приложите справку', path: ['donationCertificate'] }
  );
const Donation = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      donationType: 'blood',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  const donationPlace = form.watch('donationPlace');
  const donationCertificateDate = form.watch('donationCertificateDate');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='donationType'
          render={({ field }) => <DonationType field={field} />}
        />
        <FormField
          control={form.control}
          name='donationData'
          render={({ field }) => <DonationDate field={field} />}
        />
        <FormField
          control={form.control}
          name='donationPrice'
          render={({ field }) => <DonationPrice field={field} />}
        />
        <FormField
          control={form.control}
          name='donationPlace'
          render={({ field }) => <DonationPlace field={field} />}
        />
        <FormField
          control={form.control}
          name='donationCity'
          render={({ field }) => <DonationCity field={field} form={form} />}
        />
        {donationPlace === 'station' && (
          <FormField
            control={form.control}
            name='donationCenter'
            render={({ field }) => <DonationCenter field={field} form={form} />}
          />
        )}
        <FormField
          control={form.control}
          name='donationCertificateDate'
          render={({ field }) => <DonationCertificateDate field={field} />}
        />
        {donationCertificateDate === 'today' && (
          <FormField
            control={form.control}
            name='donationCertificate'
            render={({ field }) => <DonationCertificate field={field} />}
          />
        )}
        <Button type='submit'>Принять</Button>
      </form>
    </Form>
  );
};

export default Donation;
