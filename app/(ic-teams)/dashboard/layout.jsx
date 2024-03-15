import authenticate from "@/utils/auth";
import { DefaultPhoto } from "@/utils/imageUtils";
import Image from "next/image";
import { permanentRedirect } from "next/navigation";

export const metadata = {
    title: 'Dashboard'
}

export default function DashboardLayout({ children, welcome, targetSummary }) {
    const isAuth = authenticate();

    if (!isAuth) permanentRedirect('/unauthorized')

    return (
        <section className="w-full min-h-screen text-black">
            <header className="w-full p-4 grid lg:grid-cols-3 gap-2">
                <div className="w-full flex gap-4 items-center col-span-1">
                    {welcome}
                </div>
                <div className="col-span-2">
                    {targetSummary}
                </div>
            </header>
        </section>
    )
}