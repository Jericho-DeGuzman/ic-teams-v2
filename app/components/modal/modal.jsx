'use client'
import *  as Dialog from '@radix-ui/react-dialog'

export default function Modal({children}){
    return (
        <Dialog.Root open={true}>
            <Dialog.Portal>
                <Dialog.DialogContent>
                    {children}
                </Dialog.DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    )
}