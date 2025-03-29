"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useDynamicContext } from "../../../lib/dynamic";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Button from "../Button";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  wallet: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Please enter a valid Berachain wallet address."),
});

export function CreateCode() {
  const { primaryWallet } = useDynamicContext();
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      wallet: "",
    },
  });

  // Effect to autofill wallet address when a wallet is connected
  useEffect(() => {
    if (primaryWallet?.address) {
      form.setValue('wallet', primaryWallet.address);
    }
  }, [primaryWallet, form]);

  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [postStatus, setPostStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  console.log(postStatus);
  const onSubmit = async (values: { username: string; wallet: string }) => {
    setPostStatus("loading");

    // Generate the referral code
    const combinedString = `${values.username}-${values.wallet}`;
    const hash = hashStringTo6DigitCode(combinedString);

    // Take the first 3 letters of the username
    const prefix = values.username.substring(0, 3).toUpperCase();
    const finalCode = prefix + hash;

    // Update local state
    setGeneratedCode(finalCode);

    const formData = {
      username: values.username,
      wallet: values.wallet,
      referral: finalCode
    };


    // Post the data to Google Apps Script
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzZEff1a83UaaJegLnSjf20Fl77plaooTc0RuNJju8n63ErBe57anzeStaPzNR1xYm8hA/exec",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(formData).toString(),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      // If you expect a JSON response, you can parse it here:
      // const result = await response.json();

      setPostStatus("success");
    } catch (error) {
      console.error(error);
      setPostStatus("error");
    }
  };

  const hashStringTo6DigitCode = (input: string): string => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = (hash * 31 + input.charCodeAt(i)) % 1000000; // Simple hash function
    }
    return hash.toString().padStart(6, "0"); // Ensure the code is 6 digits
  };

  const copyToClipboard = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} className="" />
              </FormControl>
              <FormDescription>
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
              <FormLabel className="text-[#2C3034]">Wallet Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your Berachain wallet address"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter a valid Berachain wallet address (starting with 0x).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button buttonType="submit" label="GENERATE CODE" className="w-[200px] mx-auto" />

        {generatedCode && (
          <div className="text-center mt-36 block">
            <p className="text-lg font-bold mt-20 mb-5">Referral Code: {generatedCode}</p>
            <div className="flex justify-center">
              <Button
                type="primary"
                onClick={copyToClipboard}
                label="COPY"
                className="w-[200px] mt-2 mr-2"
                buttonType="button"
              />
              <Button
                type="secondary"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `I've preregistered to mint Bera Horses! My referral code is: ${generatedCode}. Get yours here... and earn 5% on each mint. https://Bera Horses.xyz/register`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[200px] mt-2 ml-2"
                label="TWEET IT!"
              />
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}
