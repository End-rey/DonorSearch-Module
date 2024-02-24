import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { ReactNode } from 'react';

const RadioButtonCard = ({
  header,
  text,
  value,
}: {
  header: ReactNode;
  text: ReactNode;
  value: string;
}) => {
  return (
    <FormItem className='relative'>
      <FormControl>
        <RadioGroupItem
          className='peer absolute right-3 top-3 aria-checked:text-foreground'
          value={value}
        />
      </FormControl>
      <FormLabel className='cursor-pointer'>
        <div className='rounded-lg p-5 ring-1 ring-border'>
          <p className='mb-3'>{header}</p>
          <p className='font-normal'>{text}</p>
        </div>
      </FormLabel>
    </FormItem>
  );
};

export default RadioButtonCard;
