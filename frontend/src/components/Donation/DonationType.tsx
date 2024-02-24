import { fieldProp } from '@/components/Donation/Donation';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const DonationType = ({ field }: { field: fieldProp<'donationType'> }) => {
  const types = [
    { name: 'Цельная кровь', id: 'blood' },
    { name: 'Плазма', id: 'plasma' },
    { name: 'Тромбоциты', id: 'trombs' },
    { name: 'Эритроциты', id: 'erits' },
    { name: 'Гранулоциты', id: 'granuls' },
  ];
  return (
    <FormItem>
      <FormLabel>Тип донации</FormLabel>
      <FormControl>
        <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
          <ScrollArea>
            <div className='flex space-x-3'>
              {types.map((item) => (
                <FormItem key={item.id}>
                  <FormControl>
                    <RadioGroupItem
                      className='peer w-[1px] opacity-0'
                      value={item.id}
                    />
                  </FormControl>
                  <FormLabel className='flex  w-36 cursor-pointer items-center justify-center space-y-0  rounded-lg p-2 font-normal peer-aria-checked:bg-primary peer-aria-checked:text-primary-foreground'>
                    {item.name}
                  </FormLabel>
                </FormItem>
              ))}
            </div>
            <div className='mt-5'></div>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default DonationType;
