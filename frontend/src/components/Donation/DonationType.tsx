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
      <FormLabel>Выберите тип донации</FormLabel>
      <FormControl>
        <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
          <ScrollArea>
            <div className='flex space-x-3'>
              {types.map((item) => (
                <FormItem className='flex items-center' key={item.id}>
                  <FormControl>
                    <RadioGroupItem className='peer hidden' value={item.id} />
                  </FormControl>
                  <FormLabel className='flex h-full cursor-pointer items-center rounded-lg px-10 py-2 ring-1 ring-border peer-aria-checked:bg-primary peer-aria-checked:text-primary-foreground'>
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
