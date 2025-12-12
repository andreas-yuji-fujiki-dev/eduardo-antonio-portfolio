import Link from 'next/link';

import CustomButton from '../CustomButton';

export default function AppHeaderWithNav() {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
            <Link href="/">
                <h2>
                    <span className="hidden md:flex">
                        &lt;/&gt; Portfolio Management
                    </span>
                    <span className="flex md:hidden ">
                        &lt;/&gt; P.M.P
                    </span>
                </h2>
            </Link>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <CustomButton variant='default'>
                            <Link href="/images">
                                Images
                            </Link>
                        </CustomButton>
                    </li>
                    <li>
                        <CustomButton variant='default'>
                            <Link href="/stacks">
                                Stacks
                            </Link>
                        </CustomButton>
                    </li>
                    <li>
                        <CustomButton variant='highlighted'>
                            <Link href="/projects">
                                Projects
                            </Link>
                        </CustomButton>
                    </li>
                </ul>
            </nav>
        </nav>
    );
}