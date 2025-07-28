'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

import PageContainer from "@/components/PageContainer";
import CustomTitle from "@/components/CustomTitle";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

import Cookies from "js-cookie";

import { loginRequest } from "@/utils/api/routes/auth";

export default function LoginPage(){
    // given credentials data 
    const [ userName, setUserName ] = useState<string>('');
    const [ userPassword, setUserPassword ] = useState<string>('');

    const router = useRouter();

    // login action handler
    async function loginButtonHandler() {
        if (!userName) return alert('You must enter a user!');
        if (!userPassword) return alert('You must enter the password!');

        try {
            const loginCredentialsObject = { user: userName, password: userPassword };
            const response = await loginRequest(loginCredentialsObject);

            if (response.status === 200) {
                const token = response.data.token;

                // saving on cookies
                token && Cookies.set('token', token, {
                    expires: 2 / 24, // days
                    path: '/', // scope
                    secure: false, // https only
                    sameSite: 'Strict' 
                });

                // redirect to login
                router.push('/');
            };
        } catch (err: any) {
            console.error('Login error:', err);

            if (err.response) {
                if (err.response.status === 404) {
                    alert('User not found!');
                } else {
                    alert(`Error ${err.response.status}: ${err.response.data.message}`);
                }
                } else {
                    alert('Unknown error occurred');
            };
        };
    };

    // jsx
    return(
        <PageContainer
            className={`
                flex
                justify-center
                items-center
            `}
        >
            <div
                className={`
                    flex
                    flex-col
                    justify-evenly
                    gap-2

                    p-5
                    h-100
                    w-100
                    bg-gray-100
                    rounded
                    border-1
                `}
            >
                <CustomTitle variant="secondary" className="font-bold">
                    Login
                </CustomTitle>
                <div
                    className={`
                        flex
                        flex-col
                        gap-2    
                    `}
                >
                    {/* user name input */}
                    <CustomInput
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                        placeholder="Enter your username"
                        className="py-4"
                    />

                    {/* user password input */}
                    <CustomInput
                        type="password"
                        onChange={(e)=> setUserPassword(e.target.value)}
                        value={userPassword}
                        placeholder="Enter your password"
                        className="py-4"
                    />
                </div>

                {/* submit */}
                <div className="flex flex-col gap-2">
                    <CustomButton 
                        variant="secondary" 
                        className="py-4 w-full"
                        onClick={ () => loginButtonHandler() }
                    >
                        Login!
                    </CustomButton>
                    <Link href="/register">
                        <p
                            className={`
                                text-center
                                opacity-70
                                text-blue-500
                                hover:opacity-100
                                cursor-pointer
                            `}
                        >
                            or register
                        </p>
                    </Link>
                </div>
            </div>
        </PageContainer>
    );
};