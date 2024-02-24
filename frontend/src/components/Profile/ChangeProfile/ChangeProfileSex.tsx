import { fieldProp } from '@/components/Profile/ChangeProfile/ChangeProfile';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
const ChangeProfileSex = ({ field }: { field: fieldProp<'sex'> }) => {
  const types = [
    { name: 'Мужской', id: 'male' },
    { name: 'Женский', id: 'female' },
  ];

  return (
    <FormItem>
      <FormLabel>Выберите тип донации</FormLabel>
      <FormControl>
        <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
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
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default ChangeProfileSex;
