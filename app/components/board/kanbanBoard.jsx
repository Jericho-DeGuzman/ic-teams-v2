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

// list on kanban board.
const boards = [
    { id: 'todo', title: 'To Do' },
    { id: 'inprogress', title: 'In Progress' },
    { id: 'review', title: 'For Review' },
    { id: 'done', title: 'Done' },
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

    const [newTask, setNewTask] = useState(initialState);
    const dispatch = useAppDispatch();

    // function when cards is drop and move.
    // TODO: add a function that also update the task on microservice.
    const onDrop = (board, index) => {
        if (!draggingCard) return;
        const newCards = moveCardTask({
            cards,
            cardId: draggingCard,
            board,
            index
        })
        setCards(newCards);
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

        try {
            await validateTaskForm(newTask);
            
            const response = await fetch('/api/tasks', {
                method: 'post',
                body: JSON.stringify(newTask)
            })

            const result = await response.json();

            if (response.status !== 200) throw new Error(result?.message);

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
        }
    }

    const onAssigneesHandler = async (ev) => {
        setNewTask((prev) => ({
            ...prev,
            assigned_members: ev
        }))
    }


    return (
        <>
            {taskForm && <TargetTaskModal key={0} uuid={uuid} onsubmit={onSubmitHandler} inputchange={inputChangeHandler}
                oncancel={onCancelHandler} onassigneeschange={onAssigneesHandler} newTask={newTask} />}
            <main className='min-h-screen w-full flex gap-2' >
                {boards.map((board, index) => (
                    <TaskBoard key={index} id={board.id} title={board.title} onDrop={onDrop}
                        cards={cards[board.id]} />))}
            </main>
        </>
    )
}