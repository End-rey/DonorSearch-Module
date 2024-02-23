import { fieldProp } from '@/components/Donation/Donation';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const DonationPrice = ({ field }: { field: fieldProp<'donationPrice'> }) => {
  return (
    <FormItem>
      <FormLabel>Тип донации</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className='flex flex-col space-y-1'
        >
          <FormItem className='flex items-center space-x-3 space-y-0'>
            <FormControl>
              <RadioGroupItem value='free' />
            </FormControl>
            <FormLabel className='font-normal'>Цельная кровь</FormLabel>
          </FormItem>

          <FormItem className='flex items-center space-x-3 space-y-0'>
            <FormControl>
              <RadioGroupItem value='money' />
            </FormControl>
            <FormLabel className='font-normal'>Плазма</FormLabel>
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default DonationPrice;
