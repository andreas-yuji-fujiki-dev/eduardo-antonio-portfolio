import Link from 'next/link';

export default function AppHeaderWithoutNav() {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
            <Link href="/">
                <h1>
                    <span className="hidden md:flex">
                        &lt;/&gt; Portfolio Management
                    </span>
                    <span className="flex md:hidden ">
                        &lt;/&gt; P.M.P
                    </span>
                </h1>
            </Link>
        </nav>
    );
}