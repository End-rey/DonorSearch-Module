import { fieldProp } from '@/components/Donation/Donation';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const DonationCertificate = ({
  field,
}: {
  field: fieldProp<'donationCertificate'>;
}) => {
  return (
    <>
      <FormItem>
        <FormLabel>Справка</FormLabel>
        <FormControl>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Input type='file' {...field} />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </>
  );
};

export default DonationCertificate;
