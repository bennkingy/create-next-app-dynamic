"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Button from "../Button"

// Validation schema for username, wallet address, and referral code
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  wallet: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Please enter a valid Berachain wallet address."),
  referralCode: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>;

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      wallet: "",
      referralCode: "",
    },
  });

  async function onSubmit(values: FormValues) {
    console.log("Form Submitted:", values);

    const formData = {
      username: values.username,
      wallet: values.wallet,
      referral: values.referralCode || "",
    };

    setIsLoading(true);

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbx_wod_kbzumWCX7kePDt8O4yX3I2djisOYF_4Vxf5S528zlFtLmiXH-NQrnNGp0fEiBQ/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        setSubmitted(true);
        console.log('Form submitted successfully!');
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} className="bg-white" />
              </FormControl>
              <FormDescription className="text-white">
                This is your public username.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="wallet"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Wallet Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Berachain wallet address" {...field} className="bg-white" />
              </FormControl>
              <FormDescription className="text-white">
                Enter a valid Berachain wallet address (starting with 0x).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="referralCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Referral Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter your referral code (optional)" {...field} className="bg-white" />
              </FormControl>
              <FormDescription className="text-white">
                If you have a referral code, you can enter it here.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          buttonType="submit"
          label={isLoading ? "Submitting..." : "SUBMIT"}
          className="w-[200px] mx-auto"
          disabled={isLoading}
        />
        {submitted && (
          <p className="text-white text-center mt-4 font-openSans font-semibold">
            You have been added to whitelist successfully!
          </p>
        )}
      </form>
    </Form >
  )
}
