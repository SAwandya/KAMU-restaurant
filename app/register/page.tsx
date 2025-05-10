"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { registerRestaurant, RegisterRestaurantData } from "@/services/restaurantService";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(2, "Restaurant name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  images: z.array(z.string()).optional(),
  isAvailable: z.boolean().optional(),
  status: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function RegisterRestaurantForm() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      address: "",
      images: [],
      isAvailable: true,
      status: "Pending",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to register a restaurant.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await registerRestaurant(user.id, data);
      toast({
        title: "Success",
        description: "Restaurant registered successfully.",
      });
      router.push("/dashboard"); // or wherever you want to redirect
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register restaurant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto p-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Restaurant Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter restaurant name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter restaurant address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Optional fields like images, status, isAvailable can be added here */}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Submitting..." : "Register Restaurant"}
        </Button>
      </form>
    </Form>
  );
}
