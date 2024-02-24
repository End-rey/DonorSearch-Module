import React, { useState } from 'react';
import { Dot } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
const FormSchema = z.object({
  type: z.enum(['0+', 'A+', 'B+', 'AB+', '0-', 'A-', 'B-', 'AB-'], {
    required_error: 'Выберете группу',
  }),
});

const WhereTurnCard = () => {
  const [rh, setRh] = useState('');
  function handleRadioChange(value: string) {
    console.log(value);
    setRh(value);
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   description: (
    //     <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
    //       <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <div className='mt-4 flex flex-col'>
      <p className='line-clamp-3 text-base font-bold opacity-80'>
        ФГБОУВО «Первый Санкт-Петербургский государственный медицинский
        университет имени академика И.П. Павлова» Министерства здравоохранения
        Российской Федерации, опк"
      </p>
      <p className='line-clamp-1 text-sm font-normal opacity-50'>
        ул. Льва Толстого, д. 19 корп. 53
      </p>
      <div className='flex items-center justify-between'>
        <p>Ваша группа крови - AB-</p>
        <div>
          <p className='flex items-center justify-end text-xs'>
            Требуется <Dot className='h-6 w-6' color='#F63F3E' />
          </p>
          <p className='flex items-center justify-end text-xs'>
            Достаточно <Dot className='h-6 w-6' color='#25C175' />
          </p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col flex-wrap space-y-6'
        >
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem className='flex flex-wrap space-y-3'>
                <FormControl className='flex flex-wrap'>
                  <RadioGroup
                    onValueChange={(value) => {
                      handleRadioChange(value);
                      field.onChange;
                    }}
                    defaultValue={field.value}
                    className='flex space-y-1'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <div className='relative flex items-center space-x-2'>
                        <RadioGroupItem
                          value='0+'
                          id='r1'
                          className='relative h-[68px] w-[68px] rounded-2xl border-2 border-redMain bg-redMain
            bg-opacity-5 [&_span]:h-[100%] [&_span]:rounded-xl
            [&_span]:bg-redMain [&_span]:opacity-15 [&_span_svg]:hidden'
                        ></RadioGroupItem>
                        <Label
                          className='absolute left-[16px] top-[22px] text-base font-bold text-redMain'
                          htmlFor='r1'
                        >
                          0+
                        </Label>
                      </div>
                    </FormItem>
                    <FormItem>
                      <div className='relative flex items-center space-x-2'>
                        <RadioGroupItem
                          value='A+'
                          id='r2'
                          className='relative
            h-[68px] w-[68px] rounded-2xl border-2 border-redMain bg-redMain
             bg-opacity-5 [&_span]:h-[100%] [&_span]:rounded-xl
              [&_span]:bg-redMain [&_span]:opacity-15 [&_span_svg]:hidden'
                        ></RadioGroupItem>
                        <Label
                          className='absolute left-[16px] top-[22px] text-base font-bold text-redMain'
                          htmlFor='r2'
                        >
                          A+
                        </Label>
                      </div>
                    </FormItem>{' '}
                    <FormItem>
                      <div className='relative flex items-center space-x-2'>
                        <RadioGroupItem
                          value='B+'
                          id='r3'
                          className='relative
            h-[68px] w-[68px] rounded-2xl border-2 border-redMain bg-redMain
            bg-opacity-5 [&_span]:h-[100%] [&_span]:rounded-xl
            [&_span]:bg-redMain [&_span]:opacity-15 [&_span_svg]:hidden'
                        ></RadioGroupItem>
                        <Label
                          className='absolute left-[16px] top-[22px] text-base font-bold text-redMain'
                          htmlFor='r3'
                        >
                          B+
                        </Label>
                      </div>
                    </FormItem>
                    <FormItem>
                      <div className='relative flex items-center space-x-2'>
                        <RadioGroupItem
                          value='AB+'
                          id='r4'
                          className='relative
            h-[68px] w-[68px] rounded-2xl border-2 border-redMain bg-redMain
            bg-opacity-5 [&_span]:h-[100%] [&_span]:rounded-xl
            [&_span]:bg-redMain [&_span]:opacity-15 [&_span_svg]:hidden'
                        ></RadioGroupItem>
                        <Label
                          className='absolute left-[14px] top-[22px] text-base font-bold text-redMain'
                          htmlFor='r4'
                        >
                          AB+
                        </Label>
                      </div>
                    </FormItem>
                    <FormItem>
                      <div className='relative flex items-center space-x-2'>
                        <RadioGroupItem
                          value='0-'
                          id='r5'
                          className='relative
            h-[68px] w-[68px] rounded-2xl border-2 border-redMain bg-redMain
            bg-opacity-5 [&_span]:h-[100%] [&_span]:rounded-xl
            [&_span]:bg-redMain [&_span]:opacity-15 [&_span_svg]:hidden'
                        ></RadioGroupItem>
                        <Label
                          className='absolute left-[16px] top-[22px] text-base font-bold text-redMain'
                          htmlFor='r5'
                        >
                          0-
                        </Label>
                      </div>
                    </FormItem>
                    <FormItem>
                      <div className='relative flex items-center space-x-2'>
                        <RadioGroupItem
                          value='A-'
                          id='r6'
                          className='relative
            h-[68px] w-[68px] rounded-2xl border-2 border-redMain bg-redMain
             bg-opacity-5 [&_span]:h-[100%] [&_span]:rounded-xl
              [&_span]:bg-redMain [&_span]:opacity-15 [&_span_svg]:hidden'
                        ></RadioGroupItem>
                        <Label
                          className='absolute left-[16px] top-[22px] text-base font-bold text-redMain'
                          htmlFor='r6'
                        >
                          A-
                        </Label>
                      </div>
                    </FormItem>
                    <FormItem>
                      <div className='relative flex items-center space-x-2'>
                        <RadioGroupItem
                          value='B-'
                          id='r7'
                          className='relative
            h-[68px] w-[68px] rounded-2xl border-2 border-redMain bg-redMain
            bg-opacity-5 [&_span]:h-[100%] [&_span]:rounded-xl
            [&_span]:bg-redMain [&_span]:opacity-15 [&_span_svg]:hidden'
                        ></RadioGroupItem>
                        <Label
                          className='absolute left-[16px] top-[22px] text-base font-bold text-redMain'
                          htmlFor='r7'
                        >
                          B-
                        </Label>
                      </div>
                    </FormItem>
                    <FormItem>
                      <div className='relative flex items-center space-x-2'>
                        <RadioGroupItem
                          value='AB-'
                          id='r8'
                          className='relative
            h-[68px] w-[68px] rounded-2xl border-2 border-redMain bg-redMain
            bg-opacity-5 [&_span]:h-[100%] [&_span]:rounded-xl
            [&_span]:bg-redMain [&_span]:opacity-15 [&_span_svg]:hidden'
                        ></RadioGroupItem>
                        <Label
                          className='absolute left-[14px] top-[22px] text-base font-bold text-redMain'
                          htmlFor='r8'
                        >
                          AB-
                        </Label>
                      </div>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='mt-3 w-full rounded-xl  text-base font-semibold'>
            Запланировать донацию
          </Button>
        </form>
      </Form>
      <p className='mt-3 text-sm font-bold'>Выбранная группа — {rh}</p>
      <p className='text-xs font-normal'>
        Готовы принять с данной группой крови
      </p>
    </div>
  );
};

export default WhereTurnCard;
