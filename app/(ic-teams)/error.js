'use client'

import { ICLogo, Wrong } from "@/utils/imageUtils"
import Image from "next/image"

export default function Error({ error, reset }) {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center space-y-2">
            <Image src={Wrong} height={72} width={72} alt="image.png" />
            <div className="space-y-1">
                <h2 className="text-[24px] font-semibold">Oops! {error?.message}</h2>
                <div className="flex gap-1 justify-center items-center">
                    <Image src={ICLogo} height={24} width={24} />
                    <p className="text-[12px] italic">Insurance Commission.</p>
                </div>
            </div>
        </div>
    )
}