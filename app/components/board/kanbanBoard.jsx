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

// list on kanban board.
const boards = [
    { id: 'todo', title: 'To Do', color: "bg-yellow-500" },
    { id: 'inprogress', title: 'In Progress', color: "bg-blue-500" },
    { id: 'review', title: 'For Review', color: "bg-red-500" },
    { id: 'done', title: 'Done', color: "bg-green-500" },
]

export default function KanbanBoard({ tasks, uuid }) {
    const initialState = {
        target_uuid: uuid,
        title: '',
        description: '',
        due_date: '',
        assigned_members: []
    }

    const draggingCard = useKanbanStore((state) => state.draggingCard) // active dragging card.
    const taskForm = useAppSelector((state) => state.taskFormSlice.value);
    const [cards, setCards] = useState(tasks);

    const [error, setError] = useState(null);

    const [newTask, setNewTask] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const onDrop = async (board, index) => {
        if (!draggingCard) return;
        const prevCards = cards;

        try {
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

            if (result?.status !== 200) throw new Error(result?.message);

        } catch (error) {
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

    if (error) return <CustomError status={error} /> 

    return (
        <>
            {taskForm && <TargetTaskModal key={0} uuid={uuid} onsubmit={onSubmitHandler} inputchange={inputChangeHandler}
                oncancel={onCancelHandler} onassigneeschange={onAssigneesHandler} newTask={newTask} disabled={loading} />}
            <main className='min-h-screen w-full flex gap-2' >
                {boards.map((board, index) => (
                    <TaskBoard key={index} id={board.id} title={board.title} onDrop={onDrop}
                        cards={cards[board.id]} color={board.color} ondelete={onDeleteTask} />))}
            </main>
        </>
    )
}