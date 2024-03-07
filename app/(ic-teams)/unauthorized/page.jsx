import { ICLogo } from "@/utils/imageUtils"
import Image from "next/image"

export const metadata = {
    title: 'Unauthorized'
}

export default function UnauthorizedPage() {
    return (
        <div className="w-full flex flex-col min-h-screen items-center justify-center space-y-2">
            <Image src={ICLogo} height={72} width={72} alt="ic_logo"/>
            <h1 className="text-[16px] italic">
                Unauthorized Access!
            </h1>
        </div>
    )
}