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
      <FormLabel>
        <div className='w-full rounded-lg p-5 ring-1 ring-foreground'>
          <p className='mb-3'>{header}</p>
          <p className='font-normal'>{text}</p>
        </div>
      </FormLabel>
      <FormControl>
        <RadioGroupItem
          className='absolute right-3 top-2 aria-checked:text-foreground'
          value={value}
        />
      </FormControl>
    </FormItem>
  );
};

export default RadioButtonCard;
