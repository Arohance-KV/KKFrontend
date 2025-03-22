import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { Checkbox } from '../../ui/checkbox';
import { cn } from '../../../lib/utils';

const GIFTCARDS = [
    {
        name: "diwali"
    },
    {
        name: "valentines"
    },
    {
        name: "diwali"
    },
    {
        name: "valentines"
    },
    {
        name: "diwali"
    },
    {
        name: "valentines"
    },
];

const shapeOptions = [
    {
      value: 'Round',
      label: 'Round',
      imgSrc: '../../../../public/solitare-shapes/gemstone_10582460.png',
      gradient: 'from-[#C8C8C8] to-[#E9E9E9]',
    },
    {
      value: 'Pear',
      label: 'Pear',
      imgSrc: '../../../../public/solitare-shapes/pear.png',
      gradient: 'from-[#C8C8C8] to-[#E9E9E9]',
    },
    {
      value: 'Heart',
      label: 'Heart',
      imgSrc: '../../../../public/solitare-shapes/heart.png',
      gradient: 'from-[#C8C8C8] to-[#E9E9E9]',
    },
    {
      value: 'Princess',
      label: 'Princess',
      imgSrc: '../../../../public/solitare-shapes/princess.png',
      gradient: 'from-[#C8C8C8] to-[#E9E9E9]',
    },
    {
      value: 'Marquise',
      label: 'Marquise',
      imgSrc: '../../../../public/solitare-shapes/marquise.png',
      gradient: 'from-[#C8C8C8] to-[#E9E9E9]',
    },
    {
      value: 'Oval',
      label: 'Oval',
      imgSrc: '../../../../public/solitare-shapes/oval.png',
      gradient: 'from-[#C8C8C8] to-[#E9E9E9]',
    },
    {
      value: 'Emerald',
      label: 'Emerald',
      imgSrc: '../../../../public/solitare-shapes/emerald.png',
      gradient: 'from-[#C8C8C8] to-[#E9E9E9]',
    },
    {
      value: 'Radiant',
      label: 'Radiant',
      imgSrc: '../../../../public/solitare-shapes/radiant.png',
      gradient: 'from-[#C8C8C8] to-[#E9E9E9]',
    },
    {
      value: 'Cushion',
      label: 'Cushion',
      imgSrc: '../../../../public/solitare-shapes/cushion.png',
      gradient: 'from-[#C8C8C8] to-[#E9E9E9]',
    },
];
  
enum Shapes {
    Round = 'Round',
    Pear = 'Pear',
    Heart = 'Heart',
    Princess = 'Princess',
    Marquise = 'Marquise',
    Oval = 'Oval',
    Emerald = 'Emerald',
    Radiant = 'Radiant',
    Cushion = 'Cushion',
};
  
enum Colour {
    D = 'D',
    E = 'E',
    F = 'F',
};
  

const formSchema = z.object({
    email: z.string().email('Enter a valid email address!').min(0), // Add email validation
    shape: z.nativeEnum(Shapes, {
      required_error: 'Shape is required!',
    }),
    carat: z.coerce.number({
      required_error: 'Carat is required!',
      invalid_type_error: 'Enter a valid number!',
    }),
    colour: z.nativeEnum(Colour, {
      required_error: 'Colour is required!',
    }),
    goldWeight: z.coerce.number({
      required_error: 'Gold weight is required!',
      invalid_type_error: 'Enter a valid number!',
    }),
    phoneNo: z.coerce
      .number({
        required_error: 'Phone number is required!',
        invalid_type_error: 'Enter a valid number!',
      })
      .refine(
        (value) => {
          // Ensure the phone number contains only digits and is of valid length
          const phoneRegex = /^[0-9]{10}$/;
          return phoneRegex.test(value + '');
        },
        {
          message: 'Invalid phone number. It must only contain 10 digits!.',
        }
      ),
    multiDiamonds: z.boolean().default(false),
    noOfDiamonds: z.coerce
      .number()
      .min(2, { message: 'No of stones cannot be less than 2!' })
      .optional(),
    additionalRequirements: z.string().optional(),
});
  
export const UIsideBar = ({ side } : { side : "left" | "right" }) => {
    return (
        <>
            <div className={cn('w-[50px] sm:block hidden -top-[5%] absolute bottom-0 bg-[#BFA6A173] rounded-tr-full z-[5]', side == "left" ? "left-0 " : "right-0 -scale-x-[1]")} />
            <div className={cn('w-[calc(0.75*50px)] sm:block hidden -top-[5%] bottom-0 absolute bg-[#BFA6A1A6] rounded-tr-full z-[10]', side == "left" ? "left-0" : "right-0 -scale-x-[1]")} />
            <div className={cn('w-[calc(0.5*50px)] -top-[5%] bottom-0 sm:block hidden absolute bg-[#BFA6A1] rounded-tr-full z-[15]', side == "left" ? "left-0" : "right-0 -scale-x-[1]")} />
        </>
    );
}

export const GiftCards = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          shape: Shapes.Round, // Default value
        },
    });
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    return (
        <div className='w-full relative pb-28 sm:text-white!'>
            <UIsideBar side="left"/>
            <UIsideBar side="right"/>
            <div className="sm:bg-[#E1C6B3] sm:mt-56 mt-14 gap-4 flex flex-col items-center w-full sm:w-[80%] justify-self-center rounded-tr-[100px] aspect-video">
                <div className="w-full mt-14 text-center sm:text-white text-[#E1C6B3]">
                    <p className="inria-serif-regular text-3xl">
                        Gift cards                   
                    </p>
                </div>
                <Form {...form}>
                    <form className="flex-1 inria-serif-regular gap-8 sm:text-white text-[#E1C6B3] w-full p-[5%] flex-col sm:flex-row flex" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex-[0.75]">
                            <FormField
                                control={form.control}
                                name="shape"
                                render={({ field }) => (
                                <FormItem className='h-full'>
                                    <FormControl>
                                    <div id="card" className="flex h-full gap-5 flex-col">
                                        <p className='text-center'>Select a gift card</p>
                                        <div className='grid grid-cols-2 max-h-full h-full gap-4'>
                                            {GIFTCARDS.map(card => {
                                                return (
                                                    <div className='bg-white sm:border-white border border-[#E1C6B3] rounded-lg aspect-video col-span-1'>
                                                        {card.name}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    </FormControl>
                                    <FormMessage className="" />
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex-1 col-start-3 grid grid-rows-5 row-start-1 col-span-1 row-span-2">
                            <FormField
                                control={form.control}
                                name="colour"
                                render={({ field }) => (
                                <FormItem className="flex flex-col justify-center relative items-center">
                                    <FormControl>
                                    <div
                                        id="colour"
                                        className="grid grid-cols-4 w-full  gap-4"
                                    >
                                        <p className='col-span-1 flex items-center'>Amount :</p>
                                        <Input {...field} placeholder="" className='col-span-3 sm:border-white border-[#E1C6B3]' type="number" />
                                    </div>
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage className="" />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="colour"
                                render={({ field }) => (
                                <FormItem className="flex flex-col justify-center relative items-center">
                                    <FormControl>
                                    <div
                                        id="colour"
                                        className="grid grid-cols-4 w-full  gap-4"
                                    >
                                        <p className='col-span-1 flex items-center'>Name :</p>
                                        <Input {...field} placeholder="" className='col-span-3' type="text" />
                                    </div>
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage className="" />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="colour"
                                render={({ field }) => (
                                <FormItem className="flex flex-col justify-center relative items-center">
                                    <FormControl>
                                    <div
                                        id="colour"
                                        className="grid grid-cols-4 w-full  gap-4"
                                    >
                                        <p className='col-span-1 flex items-center'>Phone no :</p>
                                        <Input {...field} placeholder="" className='col-span-3' type="number" />
                                    </div>
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage className="hidden" />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="carat"
                                render={({ field }) => (
                                <FormItem className="flex justify-center items-center w-full flex-col">
                                    <FormControl>
                                    <div
                                        id="carat"
                                        className="grid gap-4 grid-cols-4 w-full"
                                    >
                                        <p className='col-span-1 flex items-center'>Email address</p>
                                        <Input {...field} placeholder="" className='col-span-3' type="email" />
                                    </div>
                                    </FormControl>
                                    <FormMessage className="hidden" />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="goldWeight"
                                render={({ field }) => (
                                    <FormItem className="flex justify-center items-center flex-col w-full">
                                        <FormControl>
                                        <div
                                            id="gold-weight"
                                            className="grid gap-4 grid-cols-4 w-full"
                                        >
                                            <p className='col-span-1 flex items-center'>Message</p>
                                            <Textarea {...field} placeholder="" className='col-span-3 resize-none' />
                                        </div>
                                        </FormControl>
                                        <FormMessage className="hidden" />
                                    </FormItem>
                                )}
                            />
                            <div className='mt-14 flex justify-end items-center'>
                                <Button type='submit' className='bg-transparent border sm:border-white border-[#E1C6B3] text-[#E1C6B3] sm:text-white rounded-md'>
                                    Proceed to pay
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}