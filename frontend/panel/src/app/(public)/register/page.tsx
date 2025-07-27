'use client';

import Link from "next/link";
import { useRouter } from 'next/navigation';

import { useState } from "react";

import PageContainer from "@/components/PageContainer";
import CustomTitle from "@/components/CustomTitle";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

import { registerRequest } from "@/utils/api/routes/auth";

export default function RegisterPage(){
    // router
    const router = useRouter();

    // given by user credentials
    const [ userName, setUserName ] = useState<string>('');
    const [ userPassword, setUserPassword ] = useState<string>('');
    const [ userPasswordConfirm, setUserPasswordConfirm ] = useState<string>('');

    // register handler
    async function registerButtonHandler(){
        // required fields existance
        if(!userName) return alert('You must enter user name!');
        if(!userPassword) return alert('You must enter a password!');
        if(!userPasswordConfirm) return alert('You must confirm your password!');

        // both password inputs must match
        if(!(userPassword === userPasswordConfirm)) return alert("Passwords don't match!");

        // constructing request object
        const registerCredentialsObject = { user: userName, password: userPassword };

        // registering
        try {
            // api post 
            const response = await registerRequest( registerCredentialsObject );
            
            // success case
            if(response.status === 201){
                alert(`Hi ${userName}, you has been registered successfully! Now make login.`)

                router.push('/login')
            };

        } catch ( err: any ) {
            if(err.response){
                if(err.response.status === 409){
                    return alert(`User '${userName}' already exists!`);
                } else {
                    return alert('Unknown error occurred, please try again later!')
                }
            };
        };
    };

    // jsx
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
                        type="password"
                        placeholder="Enter your new password"

                        className="py-4"
                        onChange={(e)=> setUserPassword(e.target.value)}
                        value={userPassword}
                    />

                    {/* user password confirm */}
                    <CustomInput
                        type="password"
                        placeholder="Confirm password"

                        className="py-4"
                        value={ userPasswordConfirm }
                        onChange={ (e) => setUserPasswordConfirm(e.target.value) }
                    />
                </div>

                {/* submit */}
                <div className="flex flex-col gap-2">
                    <CustomButton 
                        variant="secondary" 
                        className="py-4 w-full"
                        onClick={ () => registerButtonHandler() }
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