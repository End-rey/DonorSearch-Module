import { z } from 'zod';
import { Form, FormField } from '@/components/ui/form';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DonationType from '@/components/Donation/DonationType';
import DonationDate from '@/components/Donation/DonationDate';
import DonationPrice from '@/components/Donation/DonationPrice';

export type fieldProp<
  FieldName extends 'donationType' | 'donationData' | 'donationPrice',
> = ControllerRenderProps<
  {
    donationType: 'blood' | 'plasma' | 'trombs' | 'erits' | 'granuls';
    donationData: Date;
    donationPrice: 'free' | 'money';
  },
  FieldName
>;

const formSchema = z.object({
  donationType: z.enum(['blood', 'plasma', 'trombs', 'erits', 'granuls'], {
    required_error: 'Выберите тип донации',
  }),
  donationData: z.date({ required_error: 'Выберите дату' }).min(new Date()),
  donationPrice: z.enum(['free', 'money'], {
    required_error: 'Выберите тип донации',
  }),
});
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
      </form>
    </Form>
  );
};

export default Donation;
