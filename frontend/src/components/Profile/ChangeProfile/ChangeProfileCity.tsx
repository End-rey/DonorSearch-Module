import { fieldProp } from '@/components/Profile/ChangeProfile/ChangeProfile';
import { Button } from '@/components/ui/button';
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Command,
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
const cities = [
  {
    value: 'Msc',
    label: 'Москва',
  },
  {
    value: 'Spb',
    label: 'Санкт-Петербург',
  },
];

const ChangeProfileCity = ({
  field,
  form,
}: {
  field: fieldProp<'city'>;
  form: any;
}) => {
  return (
    <FormItem className='flex flex-col'>
      <FormLabel>Город</FormLabel>
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
                ? cities.find((city) => city.value === field.value)?.label
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
              {cities.map((city) => (
                <CommandItem
                  value={city.label}
                  key={city.value}
                  onSelect={() => {
                    form.setValue('donationCity', city.value);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      city.value === field.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {city.label}
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

export default ChangeProfileCity;
