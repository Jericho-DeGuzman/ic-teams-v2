import { DefaultPhoto } from "@/utils/imageUtils";
import Image from "next/image";

export default function DashboardLayout({ children, welcome }) {
    return (
        <section className="w-full min-h-screen text-black">
            <header className="w-full p-4">
                <div className="w-full flex gap-2 items-center">
                    <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center">
                        <Image src={DefaultPhoto} height={48} width={48} className="rounded-full" />
                    </div>
                    <div>
                        {welcome}
                    </div>
                </div>
            </header>
        </section>
    )
}