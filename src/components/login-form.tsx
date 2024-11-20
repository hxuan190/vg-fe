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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

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

export default function LoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
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
        <h1 className="text-4xl text-center">Sign In</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-full h-[3.125rem] my-[1.875rem] ">
                      <Input
                        placeholder="Username"
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
              name="password"
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
            <div className="flex items-center justify-between mt-4 mb-6">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm text-white cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-white no-underline hover:underline"
              >
                Forgot Password?
              </a>
            </div>
            <Button
              type="submit"
              className="w-full bg-white  focus:outline-none rounded-full shadow-md cursor-pointer text-base text-gray-700 font-semibold"
            >
              Log in
            </Button>
            <div className="mt-5 mb-4 text-sm text-center">
              <p>
                Dont have an account?{" "}
                <a
                  href="#"
                  className="text-white no-underline font-semibold hover:underline"
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
