import FileUpload from "../card/fileUpload";

export default function AttachmentTab({ fileRequirement, taskId }) {
    return (
        <section className="w-full border-[1px] border-gray-300 rounded-md relative" style={{ minHeight: "154px" }}>
            <div className="w-full p-2 border-b-[1px] border-gray-300 text-gray-400">
                File Requirements
            </div>
            {fileRequirement.length > 0 ? (
                <div className="w-full" style={{ height: "154px" }}>
                    {fileRequirement.map((item, index) => (
                        <FileUpload key={index} taskId={taskId} uuid={item?.file_requirement_item?.uuid} title={item?.file_requirement_item?.title} isRequired={item?.is_required} />
                    ))}
                </div>
            ) : (
                <div className="w-full flex items-center justify-center text-gray-400 italic" style={{ height: "154px" }}>
                    File are not required on this task.
                </div>
            )}
            <div className="flex items-center p-2 gap-1 border-t-[1px] border-gray-300">
                <p className="italic text-[12px] text-gray-400"><b>File Upload:</b> Only JPEG, PNG, PDF, WORD and EXCEL with max size of 100 MB.</p>
            </div>
        </section>
    )
}