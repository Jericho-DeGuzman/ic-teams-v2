'use client'
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmationDialog from "../dialog/Confirmation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { convertHashed } from "@/utils/cryptoJs";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DownloadFromBase64 from "../button/downloadButton";

export default function FileUpload({ uuid, title, isRequired, taskId }) {
    const [showDialog, setShowDialog] = useState(false);
    const [fileTitle, setFileTitle] = useState(null);
    const [fileUpload, setFileUpload] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadFile = async () => {
            setLoading(true);
            try {
                const at = Cookies.get('at');

                const response = await fetch(`/api/task-uploaded-file-requirements?uuid=${uuid}&taskUuid=${taskId}`, {
                    method: 'get',
                    headers: { 'at': at }
                })

                const result = await response.json();

                if (result?.status !== 200) throw new Error(result?.message);
                const parsed = JSON.parse(result?.data);
                console.log(parsed.file)
                setUploadedFile(parsed.file)
            } catch (error) {
                setUploadedFile(null)
            } finally {
                setLoading(false)
            }
        }

        loadFile();
    }, [uuid])

    const handleFileChange = (ev) => {
        const filename = ev.target.files[0]?.name;
        const file = ev.target.files[0];
        setFileUpload(file);
        setFileTitle(filename);

        if (!file) return;

        setShowDialog(true);
    }

    const fileToBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        })
    }

    const confirmUpload = async () => {
        setUploading(true);
        try {
            if (!fileUpload) return uploadFailed();
            const base64 = await fileToBase64(fileUpload);
            setShowDialog(false);

            const response = await fetch('/api/task-uploaded-file-requirements', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    file: base64,
                    task_uuid: taskId,
                    file_requirement_item_uuid: uuid,
                    checksum: convertHashed(fileUpload)
                })
            })

            const result = await response.json();

            if (result?.response != 200) throw new Error(response?.messsage);

        } catch (error) {
            return uploadFailed();
        } finally {
            setUploading(false);
        }
    }

    const uploadFailed = () => {
        const title = fileTitle;
        setFileTitle(null);
        setFileTitle(null);
        toast.error(`Failed to upload ${title}`);
    }

    return (
        <>
            {showDialog && <ConfirmationDialog title={`Confirm File Upload`} description={`Are you sure you want to upload <b>${fileTitle}</b> ?`}
                oncancel={() => setShowDialog(false)} confirmName={'Upload'} cancelName={'Cancel'} onconfirm={confirmUpload}
            />}
            <div className="w-full p-2 hover:bg-gray-200 duration-200 grid cursor-pointer">
                <div className="grid grid-cols-12 items-center col-span-11">
                    <div className="col-span-10 flex items-center">
                        <FontAwesomeIcon icon={faFile} className="h-4 w-4 text-blue-500 px-1" />
                        <p className="text-[14px] px-1" dangerouslySetInnerHTML={{ __html: title }} />
                    </div>
                    {loading ? (
                        <div className="col-span-2 bg-gray-200 animate-pulse h-6" />
                    ) : (
                        isRequired ? (
                            uploadedFile ? (
                                <div className="col-span-2 overflow-hidden relative tooltip tooltip-right" data-tip="Upload attachment for this task">
                                    <DownloadFromBase64 base64String={uploadedFile} filename={title} />
                                </div>
                            ) : (
                                <div className="col-span-2 overflow-hidden relative tooltip tooltip-right" data-tip="Upload attachment for this task">
                                    <input type="file" className="w-full opacity-0 absolute cursor-pointer" accept=".png, .jpeg, .docs, .docx, .pdf" onChange={handleFileChange} disabled={uploading} />
                                    <button className="w-full p-1 bg-blue-500 rounded-sm text-white cursor-pointer hover:bg-blue-600 duration-100" disabled={uploading}>
                                        {uploading ? (
                                            <>Uploading...</>
                                        ) : (
                                            <>Upload</>
                                        )}
                                    </button>
                                </div>
                            )
                        ) : (
                            <div className="col-span-2 tooltip tooltip-right" data-tip="Mark as required">
                                <button className="w-full p-1 bg-blue-500 rounded-sm text-white cursor-pointer hover:bg-blue-600 duraiton-100">
                                    Require
                                </button>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    )
}