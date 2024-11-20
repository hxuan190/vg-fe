"use client";

import {
  ErrInvalidConfirmPassword,
  ErrInvalidEmail,
  ErrInvalidFullName,
  ErrInvalidPassword,
  ErrInvalidPasswordCharacters,
  ErrInvalidPhoneNumber,
  ErrInvalidUserName,
  ErrInvalidUserNameCharacters,
} from "@/shared/const";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { z } from "zod";

const formSchema = z
  .object({
    fullName: z.string().min(1, ErrInvalidFullName),
    email: z.string().email(ErrInvalidEmail),
    phoneNumber: z.string().regex(/^\d{10}$/, ErrInvalidPhoneNumber),
    userName: z
      .string()
      .min(2, ErrInvalidUserName)
      .max(50, ErrInvalidUserName)
      .regex(/^[a-zA-Z0-9_-]+$/, ErrInvalidUserNameCharacters),
    passWord: z
      .string()
      .min(8, ErrInvalidPassword)
      .max(50, ErrInvalidPassword)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        ErrInvalidPasswordCharacters
      ),
    confirmPassword: z.string().min(6, ErrInvalidConfirmPassword),
  })
  .refine((data) => data.passWord === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      userName: "",
      passWord: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className=" w-screen h-screen flex items-center justify-center bg-no-repeat bg-cover opacity-80 bg-[url('/images/nui_lua_chu_dang_ya__gia_lai_1572025654_resize.jpeg')]">
      <div className="px-10 py-8 w-[420px] rounded-xl bg-transparent border-2 border-white/20 backdrop-blur-md text-white ">
        <h1 className="text-4xl text-center">Create Account</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-full h-[3.125rem] my-[1.875rem] ">
                      <Input
                        placeholder="Full Name"
                        type="text"
                        {...field}
                        className="w-full h-full bg-transparent  focus:outline-none border-2 border-white/20 rounded-[40px] text-base text-white px-5 pr-[45px] py-5 "
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-full h-[3.125rem] my-[1.875rem] ">
                      <Input
                        type="email"
                        placeholder="Email"
                        {...field}
                        className="w-full h-full bg-transparent  focus:outline-none border-2 border-white/20 rounded-[40px] text-base text-white px-5 pr-[45px] py-5 "
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-full h-[3.125rem] my-[1.875rem] ">
                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        {...field}
                        className="w-full h-full bg-transparent  focus:outline-none border-2 border-white/20 rounded-[40px] text-base text-white px-5 pr-[45px] py-5 "
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-full h-[3.125rem] my-[1.875rem] ">
                      <Input
                        type="text"
                        placeholder="User Name"
                        {...field}
                        className="w-full h-full bg-transparent  focus:outline-none border-2 border-white/20 rounded-[40px] text-base text-white px-5 pr-[45px] py-5 "
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passWord"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-full h-[3.125rem] my-[1.875rem] ">
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        className="w-full h-full bg-transparent  focus:outline-none border-2 border-white/20 rounded-[40px] text-base text-white px-5 pr-[45px] py-5 "
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-full h-[3.125rem] my-[1.875rem] ">
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        {...field}
                        className="w-full h-full bg-transparent  focus:outline-none border-2 border-white/20 rounded-[40px] text-base text-white px-5 pr-[45px] py-5 "
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-white  focus:outline-none rounded-full shadow-md cursor-pointer text-base text-gray-700 font-semibold"
            >
              Sign Up
            </Button>
            <Button
              type="submit"
              className="w-full mt-4 bg-white  focus:outline-none rounded-full shadow-md cursor-pointer text-base text-gray-700 font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Sign Up With Google
            </Button>
            <div className="mt-5 mb-4 text-sm text-center">
              <p>
                You have an account?{" "}
                <a
                  href="#"
                  className="text-white no-underline font-semibold hover:underline"
                >
                  <Link href="/login"> Sign in, here!</Link>
                </a>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
