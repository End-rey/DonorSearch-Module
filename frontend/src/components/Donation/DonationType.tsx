import { fieldProp } from '@/components/Donation/Donation';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const DonationType = ({ field }: { field: fieldProp<'donationType'> }) => {
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
              <RadioGroupItem value='blood' />
            </FormControl>
            <FormLabel className='font-normal'>Цельная кровь</FormLabel>
          </FormItem>

          <FormItem className='flex items-center space-x-3 space-y-0'>
            <FormControl>
              <RadioGroupItem value='plasma' />
            </FormControl>
            <FormLabel className='font-normal'>Плазма</FormLabel>
          </FormItem>

          <FormItem className='flex items-center space-x-3 space-y-0'>
            <FormControl>
              <RadioGroupItem value='trombs' />
            </FormControl>
            <FormLabel className='font-normal'>Тромбоциты</FormLabel>
          </FormItem>

          <FormItem className='flex items-center space-x-3 space-y-0'>
            <FormControl>
              <RadioGroupItem value='erits' />
            </FormControl>
            <FormLabel className='font-normal'>Эритроциты</FormLabel>
          </FormItem>

          <FormItem className='flex items-center space-x-3 space-y-0'>
            <FormControl>
              <RadioGroupItem value='granuls' />
            </FormControl>
            <FormLabel className='font-normal'>Гранулоциты</FormLabel>
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default DonationType;
