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
            text={'Справку выданную в центре крови.'}
            value='today'
          />
          <RadioButtonCard
            header={'Загрузить потом'}
            text={
              'Справку можно будет загрузить позже. Донация без справки не будет учитываться для пути почетного донора.'
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
