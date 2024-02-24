import { fieldProp } from '@/components/Donation/Donation';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

const centers = [
  {
    value: 'Msc',
    label: 'Москва',
  },
  {
    value: 'Spb',
    label: 'Санкт-Петербург',
  },
];

const DonationCenter = ({
  field,
  form,
}: {
  field: fieldProp<'donationCenter'>;
  form: any;
}) => {
  return (
    <FormItem className='flex flex-col'>
      <FormLabel>Центр</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant='outline'
              role='combobox'
              className={cn(
                'w-full justify-between',
                !field.value && 'text-muted-foreground'
              )}
            >
              {field.value
                ? centers.find((center) => center.value === field.value)?.label
                : 'Выберите город'}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandInput placeholder='Выберите город...' />
            <CommandEmpty>Город не найден.</CommandEmpty>
            <CommandGroup>
              {centers.map((center) => (
                <CommandItem
                  value={center.label}
                  key={center.value}
                  onSelect={() => {
                    form.setValue('donationCenter', center.value);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      center.value === field.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {center.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};

export default DonationCenter;
