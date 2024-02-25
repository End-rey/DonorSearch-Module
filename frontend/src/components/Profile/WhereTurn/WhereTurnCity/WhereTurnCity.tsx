import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

const frameworks = [
  {
    value: 'msc',
    label: 'Москва',
  },
  {
    value: 'spb',
    label: 'Санкт-Петербург',
  },
];
const WhereTurnCity = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  return (
    <div className='w-full'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-full justify-between'
          >
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : 'Выберите город'}
            <ChevronDown className='ml-2 h-4 w-4 shrink-0 transition-transform duration-200' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[290px] p-0'>
          <Command>
            <CommandInput placeholder='Выберите город' />
            <CommandEmpty>Город не найден</CommandEmpty>
            <CommandGroup>
              <ScrollArea className='rounded-mb max-h-72 w-full'>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === framework.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default WhereTurnCity;
