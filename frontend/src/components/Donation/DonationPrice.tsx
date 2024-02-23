import RadioButtonCard from '@/components/CustomUI/RadioButtonCard';
import { fieldProp } from '@/components/Donation/Donation';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup } from '@/components/ui/radio-group';

const DonationPrice = ({ field }: { field: fieldProp<'donationPrice'> }) => {
  return (
    <FormItem>
      <FormLabel>Тип донации</FormLabel>
      <FormControl>
        <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
          <RadioButtonCard
            header={'Безвозмездно'}
            text={
              'Питание или компенсация питания бла бла бла бла или МРОТ и всё такое'
            }
            value='free'
          />
          <RadioButtonCard
            header={'Платно'}
            text={
              'Питание или компенсация питания бла бла бла бла или МРОТ и всё такое'
            }
            value='money'
          />
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default DonationPrice;
