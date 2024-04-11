'use client'
import { DefaultPhoto } from "@/utils/imageUtils";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CustomError from "../errors/error";
import AvatarSm from "./avatarSm";
import Select from 'react-select';


const OutsideClickListener = ({ children, onOutsideClick }) => {
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                onOutsideClick();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onOutsideClick]);

    return <div ref={wrapperRef}>{children}</div>;
};


export default function AssigneesAvatar({ uuid, target_uuid }) {
    const [assignees, setAssignees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [visible, setVisible] = useState(false);
    const [selection, setSelection] = useState([]);

    useEffect(() => {
        const loadAssignees = async () => {
            const at = Cookies.get('at');
            setLoading(true);
            try {
                const response = await fetch(`/api/task-assignees?uuid=${uuid}`, {
                    method: 'get',
                    headers: { 'Content-Type': 'application/json', 'at': at }
                })

                const result = await response.json();
                if (result?.status !== 200) throw new Error(error?.status);

                const assignedMembers = [];
                const { data } = result;

                data.map((member) => assignedMembers.push({ value: member?.id, label: `${member.first_name} ${member.middle_name} ${member.last_name}` }))

                setAssignees(assignedMembers);
            } catch (error) {
                setError(error?.message);
            } finally {
                setLoading(false);
            }
        }

        const loadSelection = async () => {
            try {
                const response = await fetch(`/api/target-members?uuid=${target_uuid}`, {
                    method: 'get',
                })

                const result = await response.json();
                const { data } = result;
                setSelection(data);
            } catch (error) {
                throw new Error(error);
            } finally {
                setLoading(false);
            }
        }

        loadAssignees();
        loadSelection();
    }, [])

    const removeAssignee = async (id) => {
        const prevAssignees = assignees;
        setAssignees(assignees.filter((assignee) => assignee.value !== id));
        try {
            const updatedAssignees = assignees.filter((assignee) => assignee.value !== id);

            const response = await fetch('/api/task-assignees', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    task_uuid: uuid,
                    updatedAssignees: updatedAssignees
                })
            })

            const result = await response.json();

            if (result?.status !== 200) throw new Error(result?.message);

        } catch (error) {
            setAssignees(prevAssignees);
        }
    }

    const addAssignee = async (ev) => {
        const { value, label } = ev;
        const prevAssignees = assignees;

        setVisible(false);

        try {
            setAssignees([...assignees, { value, label }])

            const response = await fetch('/api/task-assignees', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task_uuid: uuid, updatedAssignees: [...assignees, { value, label }] })
            })

            const result = await response.json();
            if (result?.status !== 200) throw new Error(result?.status);
            console.log(result?.data);
        } catch (error) {
            setError(error)
            setAssignees(prevAssignees);
        } 
    };

    const handleClickOutside = () => {
        setVisible(false);
    };

    const handleMembers = () => {
        const assignedMembers = assignees.map(item => item.value);
        return selection.filter((item) => !assignedMembers.includes(item.value));
    }

    if (loading) return <div className="w-full bg-gray-200 h-9 animate-pulse " />
    if (error) return <div className="text-gray-300">Oops! Something went wrong!</div>

    return (
        <OutsideClickListener onOutsideClick={handleClickOutside}>
            <div className="dropdown dropdown-bottom  w-full">
                {assignees.length > 0 ? (
                    <button className='w-full flex gap-1 p-1 rounded-md items-center hover:bg-gray-200 duration-300 cursor-pointer' onClick={() => setVisible(!visible)}>
                        {assignees.map((member, index) => (
                            <AvatarSm key={index} id={member.value} remove={removeAssignee}
                                username={member.label} />
                        ))}
                    </button>
                ) : (
                    <button className='w-full flex gap-1 px-1 py-3 rounded-md items-center hover:bg-gray-200 duration-300' onClick={() => setVisible(!visible)}>
                        <div className="text-gray-400 font-semibold cursor-default">Task Unassigned</div>
                    </button>
                )}

                {visible && (
                    <div className="w-full dropdown-content bg-white z-10">
                        <Select placeholder={'Assign member'} options={handleMembers()} onChange={addAssignee} />
                    </div>
                )}
            </div>

        </OutsideClickListener>

    )
}