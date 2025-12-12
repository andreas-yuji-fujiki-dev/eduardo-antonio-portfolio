import AppHeaderWithoutNav from "@/components/AppheaderWithoutNav";
import "@/styles/global.css"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-gray-50">
                {/* <AppHeaderWithoutNav /> */}
                { children }
            </body>
        </html>
    );
}