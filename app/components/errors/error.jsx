'use client'

import { ICLogo, Wrong } from "@/utils/imageUtils"
import Image from "next/image"

export default function CustomError({status}) {
    let error_message = '';

    switch(status) {
        case "Error: 404" : error_message = 'Not Found';
            break;
        case "Error: 401": error_message = 'Unauthorized Access';
            break;
        case "Error: 500": error_message = 'Something went wrong';
            break;
        default: error_message = 'Something went wrong';
            break;
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center space-y-2">
            <Image src={Wrong} height={72} width={72} alt="image.png" />
            <div className="space-y-1">
                <h2 className="text-[24px] font-semibold">Oops! {error_message}</h2>
                <div className="flex gap-1 justify-center items-center">
                    <Image src={ICLogo} height={24} width={24} />
                    <p className="text-[12px] italic">Insurance Commission.</p>
                </div>
            </div>
        </div>
    )
}