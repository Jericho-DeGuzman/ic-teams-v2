import TargetCard from '@/app/components/card/targetCard'
import AddTargetButton from '@/app/components/button/targetButton'
import { EmptyFolder } from '@/utils/imageUtils'
import Image from 'next/image'
import SearchInput from '@/app/components/input/searchInput'
import SelectInput from '@/app/components/input/distributionSelectInput'
import { cookies } from 'next/headers'
import { decryptToken } from '@/utils/cryptoJs'
import microserviceCaller from '@/app/(ic-teams)/lib/ApiCaller/microserviceCaller'
import Targets from './targets'

// TODO: missing category & Distribution Group.
// TODO: handle error properly

async function loadTargets() {
    const at = cookies().get('at').value;

    try {
        const decryptedToken = decryptToken(at);
        const { token } = decryptedToken;

        const microservice = microserviceCaller(token);

        const response = await microservice.get('/ic-teams/targets',)

        return response.data.data;

    } catch (error) {
        throw new Error(error?.response?.data)
    }
}

async function loadUserPermission() {
    const at = cookies().get('at').value;

    try {
        const decryptedToken = decryptToken(at);
        const { token } = decryptedToken;

        const microservice = microserviceCaller(token);

        const response = await microservice.get('/core-v3/users', {
            params: { 'app_id': process.env.APP_ID }
        })

        const { roles: [role_persmissions] } = response.data

        return role_persmissions;
    } catch (error) {
        
    }
}

export default async function CommissionLevel() {
    // TODO: make separate component for search.
    const targetsData = loadTargets() || [];
    const userPermissionData = loadUserPermission();

    const [targets, userPermission] = await Promise.all([targetsData, userPermissionData]);
    const { role_permissions } = userPermission;

    return (
        <section className="w-full min-h-screen p-6 text-[12px]">
            <AddTargetButton key={'add-button'} visible={role_permissions.includes('targets.create')} />
            <header className='flex w-full gap-2 items-center text-gray-400'>
                <span className='text-[14px]'>Filter:</span>
                <div className='w-3/12'>
                    <SearchInput key={'filter_search'} placeholder={'Search target'} />
                </div>
                <div className='w-3/12'>
                    <SelectInput key={'filter_catergory'} placeholder={'Target Catergory'} />
                </div>
                <div className='w-3/12'>
                    <SelectInput key={'filter_status'} placeholder={"Target Status"} />
                </div>
            </header>
            <section className='min-h-screen w-full my-4 border-gray-400'>
                <Targets data={targets} role_permissions={role_permissions} />
            </section>
            <hr className='border-[1px] my-2' />
            <footer className='w-full flex justify-center'>
                <div className='join grid grid-cols-2 w-4/12 text-gray-400'>
                    <button className='join-item p-2 border-[1px] rounded-l-md 
                    border-gray-400 hover:bg-blue-500 hover:border-blue-500 duration-300
                        hover:text-white'>
                        Previous page</button>
                    <button className='join-item p-2 border-[1px] rounded-r-md 
                    border-gray-400 hover:bg-blue-500 hover:border-blue-500 duration-300
                        hover:text-white'>
                        Next page</button>
                </div>
            </footer>
        </section>
    )
}