import Modal from "@/app/components/modal/modal";

export default function TaskModal({ params }) {
    return (
        <Modal>
            <div className="modal modal-open">
                <div className="modal-box">
                    Hello
                    <>{params.taskId}</>
                </div>
            </div>
        </Modal>
    )
}