'use client'
import { useEffect, useState } from "react"
import TaskBoard from "./taskBoard";
import { useKanbanStore } from "@/app/zustand/kanban-store";
import { moveCardTask } from "@/utils/moveCardTaks";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import TargetTaskModal from "../modal/taskModal";
import toast from "react-hot-toast";
import { closeTaskForm } from "@/app/redux/features/taskForm";
import { validateTaskForm } from "@/utils/validateFormInput";
import CustomError from "../errors/error";
import CustomAlertDialog from "../dialog/customAlert";

// list on kanban board.
const boards = [
    { id: 'todo', title: 'To Do', color: "bg-yellow-500" },
    { id: 'inprogress', title: 'In Progress', color: "bg-blue-500" },
    { id: 'review', title: 'For Review', color: "bg-red-500" },
    { id: 'done', title: 'Done', color: "bg-green-500" },
]

export default function KanbanBoard({ tasks, uuid, permissions }) {
    const initialState = {
        target_uuid: uuid,
        title: '',
        description: '',
        due_date: '',
        assigned_members: [],
        file_requirement_items: []
    }

    const draggingCard = useKanbanStore((state) => state.draggingCard) // active dragging card.
    const taskForm = useAppSelector((state) => state.taskFormSlice.value);
    const [cards, setCards] = useState(tasks);

    const [error, setError] = useState(null);

    const [newTask, setNewTask] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    
    const [fileReq, setFileReq] = useState(null);
    const itemSelection = useAppSelector((state) => state.selectionDataSlice.data.fileRequirements);
    const [fileItems, setFileItems] = useState([]);

    const [showAlert, setShowAlert] = useState({
        show: false,
        error: null,
    });

    const onDrop = async (board, index) => {
        if (!draggingCard) return;
        const prevCards = cards;

        try {
            if (board == 'done' && !permissions.role_permissions.includes('tasks.change.status.done')) throw new Error('422'); 

            const newCards = moveCardTask({
                cards,
                cardId: draggingCard,
                board,
                index
            })
            setCards(newCards);
            const response = await fetch(`/api/task-statuses?uuid=${draggingCard}`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(board)
            })

            const result = await response.json();

            if (result?.status !== 200) throw new Error(result?.status);

        } catch (error) {
            setShowAlert({
                show: true,
                error: error?.message
            })
            setCards(prevCards);
        }
    }

    const inputChangeHandler = (ev) => {
        const { name, value } = ev.target;

        setNewTask((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const onCancelHandler = () => {
        dispatch(closeTaskForm());
        setNewTask(initialState)
        setFileItems([]);
        setFileReq(null);
    }

    const onSubmitHandler = async (ev) => {
        ev.preventDefault();

        setLoading(true);
        try {
            await validateTaskForm(newTask);

            const response = await fetch('/api/tasks', {
                method: 'post',
                body: JSON.stringify(newTask)
            })

            const result = await response.json();

            if (result.status !== 200) throw new Error(result?.message);

            const { data } = result;

            setCards((prev) => ({
                ...prev,
                todo: [...prev?.todo, data]
            }))

            setNewTask(initialState);
            setFileItems([]);
            setFileReq(null);
            dispatch(closeTaskForm());
            toast.success('Task added');
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setLoading(false);
        }
    }

    const onAssigneesHandler = async (ev) => {
        setNewTask((prev) => ({
            ...prev,
            assigned_members: ev
        }))
    }


    const onDeleteTask = async (uuid, board) => {
        try {
            const response = await fetch(`/api/tasks?uuid=${uuid}`, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' }
            })

            const result = await response.json();

            if (result?.status !== 200) {
                console.log(result?.message);
                throw new Error(result?.status)
            };

            setCards((prev) => ({
                ...prev,
                [board]: cards[board].filter(task => task.uuid !== result?.data.uuid)
            }))

        } catch (error) {
            console.log(error);
            setError(error?.message);
        }
    }

    const handleConfirmAlertDialog = () => {
        setShowAlert({
            show: false,
            error: null
        })
    }

    const onFileReqHandler = (ev) => {
        setFileReq(ev.value);
    }

    useEffect(() => {
        if(newTask.file_requirement_items.length > 0) {
            setNewTask((prev) => ({
                ...prev,
                file_requirement_items: []
            }))
        }

        let items = [];
        const tempItems = [];
        const itemsToSave = [];

        itemSelection.map((item) => {
            if (item.uuid === fileReq) items = item.file_requirement_items;
        })

        items.map((item) => {
            tempItems.push({ value: item.uuid, label: item.title, isRequired: 0 })
            itemsToSave.push({
                file_requirement_item_uuid: item.uuid,
                is_required: 0
            })
            
        })

        setNewTask((prev) => ({
            ...prev,
            file_requirement_items: itemsToSave
        }))

        setFileItems(tempItems);
    }, [fileReq]);

    const fileItemChangeHandler = (ev) => {
        const {name, checked} = ev.target;

        const updated = [];

        newTask.file_requirement_items.map((item) => {
            if(item.file_requirement_item_uuid == name) {
                updated.push({file_requirement_item_uuid: item.file_requirement_item_uuid, is_required: checked ? 1 : 0})
            } else {
                updated.push(item);
            }
        })

        setNewTask((prev) => ({
            ...prev,
            file_requirement_items: updated
        }))

    }

    if (error) return <CustomError status={error} /> 

    return (
        <>
            {showAlert.show && <CustomAlertDialog error={showAlert.error} onconfirm={handleConfirmAlertDialog}/>}
            {taskForm && <TargetTaskModal key={0} uuid={uuid} onsubmit={onSubmitHandler} inputchange={inputChangeHandler}
                oncancel={onCancelHandler} onassigneeschange={onAssigneesHandler} newTask={newTask} disabled={loading} fileReqChange={onFileReqHandler}
                fileItems={fileItems} fileItemChange={fileItemChangeHandler} />}
            <main className='min-h-screen w-full flex gap-2' >
                {boards.map((board, index) => (
                    <TaskBoard key={index} id={board.id} title={board.title} onDrop={onDrop}
                        cards={cards[board.id]} color={board.color} ondelete={onDeleteTask}  permissions={permissions}/>))}
            </main>
        </>
    )
}