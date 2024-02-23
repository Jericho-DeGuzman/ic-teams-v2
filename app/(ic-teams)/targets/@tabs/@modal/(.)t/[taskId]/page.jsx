'use client'
import TargetStatusLabel from "@/app/components/label/targetStatus";
import EditTaskModal from "@/app/components/modal/editTaskModal";
import Modal from "@/app/components/modal/modal";
import { DefaultPhoto, ICLogo } from "@/utils/imageUtils";
import { faCalendar, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

//TODO: Create a client side component for modal.
//TODO: Re-create the ui for status, assigne to and due date.

export default function TaskModal({ params }) {
    return (
        <>
            <EditTaskModal />
        </>
    )
}