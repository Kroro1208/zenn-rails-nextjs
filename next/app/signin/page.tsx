"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from 'react-hook-form'

type SignInFormData = {
    email: string;
    password: string;
}

const SignInPage: NextPage = () => {
    const router = useRouter();
    const { handleSubmit, register, formState: { errors } } = useForm<SignInFormData>({
        defaultValues: { email: '', password: ''}
    });

    const onSubmit: SubmitHandler<SignInFormData> = (data) => {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/sign_in`
        const headers = { 'Content-Type': 'application/json' }

        axios({
            method: 'POST',
            url: url,
            data: data,
            headers: headers
        }).then((res: AxiosResponse) => {
            localStorage.setItem('access-token', res.headers['access-token'])
            localStorage.setItem('client', res.headers.client)
            localStorage.setItem('uid', res.headers.uid)
            router.push('/');
        }).catch((error: AxiosError<{error: string}>) => {
            console.log(error.message);
        });
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
          <Card className="w-full max-w-md mt-8 sm:mt-12 md:mt-16">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register('email', { required: 'Email is required' })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...register('password', { required: 'Password is required' })}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      );
    };

export default SignInPage