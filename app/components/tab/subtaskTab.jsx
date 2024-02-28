'use client'
import { faDiagramProject, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SubtaskCard from "../card/subtaskCard";

// TODO: Adding new subtask should be base on microservice response.

const initialNewSubtask = {
    title: '',
    is_done: false,
}

export default function SubtaskTab() {
    const [subtasks, setSubtasks] = useState([]);

    const [newSubtask, setNewSubtask] = useState(initialNewSubtask)

    // on save new task.
    const onSaveHandler = () => {
        if (newSubtask.title == '') return;
        setSubtasks([...subtasks, newSubtask])
        setNewSubtask(initialNewSubtask);
    }

    // on change in input.
    const onChangeHandler = (ev) => {
        const { value } = ev.target;
        setNewSubtask((prev) => ({
            ...prev,
            title: value
        }));
    }

    return (
        <section className="w-full border-[1px] border-gray-300 rounded-md ">
            <div className="flex items-center p-2 text-gray-400 gap-1 border-b-[1px] border-gray-300">
                <FontAwesomeIcon icon={faDiagramProject} className="h-4 w-4 " />
                Subtasks {subtasks.length}
            </div>
            <div className="w-full overflow-y-scroll" style={{ maxHeight: '154px', minHeight: '154px' }}>
                {subtasks.length ? (
                    subtasks.map((subtask, index) => (
                        <SubtaskCard key={index} title={subtask.title} is_done={subtask.is_done} />
                    ))
                ) : (
                    <div className="w-full flex items-center justify-center italic text-gray-400" style={{minHeight: '154px'}}>
                        No subtask available.
                    </div>
                )}
            </div>
            <div className="grid grid-cols-12 gap-1 p-2 border-t-[1px] border-gray-300">
                <div className="col-span-11 flex items-center gap-1">
                    <div className="w-4 h-4 flex items-center justify-center">
                        <FontAwesomeIcon icon={faPlus} className="w-3 h-3 text-gray-400" />
                    </div>
                    <input placeholder="Add subtask" className="bg-transparent outline-none w-full"
                        value={newSubtask.title} onChange={onChangeHandler} />
                </div>
                <div className="col-span-1 flex items-cente justify-end">
                    <button className={`bg-blue-500 text-white py-1 px-2 rounded-sm ${newSubtask.title == '' && 'invisible'} duration-300`}
                        onClick={onSaveHandler}>
                        Save
                    </button>
                </div>
            </div>
        </section>
    )
}