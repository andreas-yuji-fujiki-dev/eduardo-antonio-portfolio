'use client';

import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import CustomTitle from "@/components/CustomTitle";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";

export default function RegisterPage(){
    const [ userName, setUserName ] = useState<string>('');
    const [ userPassword, setUserPassword ] = useState<string>('');

    return(
        <PageContainer className="flex justify-center items-center">
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
                    Register
                </CustomTitle>
                <div
                    className="flex flex-col gap-2"
                >
                    {/* user name input */}
                    <CustomInput
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                        placeholder="Enter your new username"
                        className="py-4"
                    />

                    {/* user password input */}
                    <CustomInput
                        onChange={(e)=> setUserPassword(e.target.value)}
                        value={userPassword}
                        placeholder="Enter your new password"
                        className="py-4"
                    />
                </div>

                {/* submit */}
                <div className="flex flex-col gap-2">
                    <CustomButton 
                        variant="secondary" 
                        className="py-4 w-full"
                    >
                        Register!
                    </CustomButton>

                    <Link href="/login">
                        <p
                            className={`
                                text-center
                                opacity-70
                                text-blue-500
                                hover:opacity-100
                                cursor-pointer
                            `}
                        >
                            or login
                        </p>
                    </Link>
                </div>
            </div>
        </PageContainer>
    );
};