'use client'
import AddTargetButton from '@/app/components/button/targetButton'
import SearchInput from '@/app/components/input/searchInput'
import SelectInput from '@/app/components/input/distributionSelectInput'
import PaginationButton from '@/app/components/button/paginationButton'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Loading from './loading'
import { useSearchParams } from 'next/navigation'
import Targets from '@/app/components/targets/targets'
import CustomError from '@/app/components/errors/error'
import SelectCategories from '@/app/components/input/categorySelectInput'

async function loadTargets(page) {
    const at = Cookies.get('at');
    try {
        const response = await fetch(`/api/targets?page=${page || 1}`, {
            method: 'get',
            headers: { 'at': at },
            cache: 'no-cache'
        })

        const result = await response.json();
        if (result?.status !== 200) throw new Error(result?.status);

        return result?.data?.data;
    } catch (error) {
        throw new Error (error);
    }
}

async function loadUserPermission() {
    const at = Cookies.get('at');

    try {
        const response = await fetch(`/api/permissions`, {
            method: 'get',
            headers: { 'at': at },
        })

        const result = await response.json();
        if (result?.status !== 200) throw new Error(500);

        return result?.data;
    } catch (error) {
        throw new Error(error);
    }
}

export default function DivisionLevel() {
    const searchParams = useSearchParams();
    const [targets, setTargets] = useState([]);
    const [role_permissions, setRolePermission] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const page = searchParams.get('page') ?? '1';
 
                const [targets, userPermission] = await Promise.all([loadTargets(page), loadUserPermission()]);
                const { role_permissions } = userPermission;

                setTargets(targets);
                setRolePermission(role_permissions);
            } catch(error) {
                setError(error?.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [searchParams])
    

    if(loading) {
        return <Loading />  
    }

    if(error) {
        return <CustomError status={error}/>
    }

    return (
        <section className="w-full min-h-screen p-6 text-[12px]">
            <AddTargetButton key={'add-button'} visible={role_permissions.includes('targets.create')} />
            <header className='flex w-full gap-2 items-center text-gray-400'>
                <span className='text-[14px]'>Filter:</span>
                <div className='w-3/12'>
                    <SearchInput key={'filter_search'} placeholder={'Search target'} />
                </div>
                <div className='w-3/12'>
                    <SelectCategories key={'filter_catergory'} placeholder={'Target Catergory'} />
                </div>
                <div className='w-3/12'>
                    <SelectInput key={'filter_status'} placeholder={"Target Status"} />
                </div>
            </header>
            <section className='min-h-screen w-full my-4 border-gray-400'>
                <Targets data={targets.filter((target) => target.level.name === 'Division')} role_permissions={role_permissions} level={'division-level'}/>
            </section>
            <hr className='border-[1px] my-2' />
            <footer className='w-full flex justify-center'>
                <PaginationButton />
            </footer>
        </section>
    )
}