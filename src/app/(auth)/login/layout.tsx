"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ErrInvalidPassword,
  ErrInvalidPasswordCharacters,
  ErrInvalidUserName,
  ErrInvalidUserNameCharacters,
} from "@/shared/const";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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

const formSchema = z.object({
  username: z
    .string()
    .min(2, ErrInvalidUserName)
    .max(50, ErrInvalidUserName)
    .regex(/^[a-zA-Z0-9_-]+$/, ErrInvalidUserNameCharacters),
  password: z
    .string()
    .min(8, ErrInvalidPassword)
    .max(50, ErrInvalidPassword)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      ErrInvalidPasswordCharacters
    ),
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
}
