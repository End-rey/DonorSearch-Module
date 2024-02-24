import RadioButtonCard from '@/components/CustomUI/RadioButtonCard';
import { fieldProp } from '@/components/Donation/Donation';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup } from '@radix-ui/react-radio-group';

const DonationCertificateDate = ({
  field,
}: {
  field: fieldProp<'donationCertificateDate'>;
}) => {
  return (
    <FormItem>
      <FormLabel>Справка</FormLabel>
      <FormControl>
        <RadioGroup
          className='space-y-4'
          onValueChange={field.onChange}
          defaultValue={field.value}
        >
          <RadioButtonCard
            header={'Загрузить сейчас'}
            text={
              'Питание или компенсация питания бла бла бла бла или МРОТ и всё такое'
            }
            value='today'
          />
          <RadioButtonCard
            header={'Загрузить потом'}
            text={
              'Питание или компенсация питания бла бла бла бла или МРОТ и всё такое'
            }
            value='then'
          />
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default DonationCertificateDate;
