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
    donationCenter: string;
    donationCertificateDate: 'today' | 'then';
    donationCertificate: string;
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
    donationCenter: z.string(),
    donationCertificateDate: z.enum(['today', 'then'], {
      required_error: 'Выберите дату загрузки справки',
    }),
    donationCertificate: z.string(),
  })
  .refine(
    (schema) =>
      schema.donationPlace !== 'station' || schema.donationCenter.length > 0,
    { message: 'Выберите центр сдачи', path: ['donationCenter'] }
  )
  .refine(
    (schema) =>
      schema.donationCertificateDate !== 'then' ||
      schema.donationCertificate.length > 0,
    { message: 'Выберите справку', path: ['donationCertificate'] }
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

  return (
    <Form {...form}>
      <form>
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
          render={({ field }) => <DonationPlace />}
        />
        <FormField
          control={form.control}
          name='donationCity'
          render={({ field }) => <DonationCity />}
        />
        <FormField
          control={form.control}
          name='donationCenter'
          render={({ field }) => <DonationCenter />}
        />
        <FormField
          control={form.control}
          name='donationCertificate'
          render={({ field }) => <DonationCertificate />}
        />
      </form>
    </Form>
  );
};

export default Donation;
