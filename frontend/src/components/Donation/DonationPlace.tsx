import RadioButtonCard from '@/components/CustomUI/RadioButtonCard';
import { fieldProp } from '@/components/Donation/Donation';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup } from '@radix-ui/react-radio-group';

const DonationPlace = ({ field }: { field: fieldProp<'donationPlace'> }) => {
  return (
    <FormItem>
      <FormLabel>Место сдачи</FormLabel>
      <FormControl>
        <RadioGroup
          className='space-y-4'
          onValueChange={field.onChange}
          defaultValue={field.value}
        >
          <RadioButtonCard
            header={'Стационарный пункт'}
            text={
              'Питание или компенсация питания бла бла бла бла или МРОТ и всё такое'
            }
            value='station'
          />
          <RadioButtonCard
            header={'Выездная акция'}
            text={
              'Питание или компенсация питания бла бла бла бла или МРОТ и всё такое'
            }
            value='event'
          />
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default DonationPlace;
