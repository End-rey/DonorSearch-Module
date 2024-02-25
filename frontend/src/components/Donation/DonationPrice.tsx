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
        <RadioGroup
          className='space-y-2'
          onValueChange={field.onChange}
          defaultValue={field.value}
        >
          <RadioButtonCard
            header={'Безвозмездно'}
            text={
              'Питание или компенсация питания (5% МРОТ порядка 700-1500 ₽. Учитывается при получении звания Почетного донора).'
            }
            value='free'
          />
          <RadioButtonCard
            header={'Платно'}
            text={
              'Деньги или социальная поддержка. Не учитывается при получении звания почетного донора.'
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
