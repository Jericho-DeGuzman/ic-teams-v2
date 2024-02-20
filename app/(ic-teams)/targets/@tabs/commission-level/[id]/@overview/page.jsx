import TargetStatusLabel from "@/app/components/label/targetStatus";
import formatDate from "@/utils/formatDate";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { baseUrl } from "@/app/constant/url";

//TODO: Create a better data fetching and connect to IC microservice.
async function loadTarget(uuid) {
    const response = await fetch(`${baseUrl}/api/targets?id=${uuid}`, {
        method: 'get'
    })
    const result = await response.json();

    if (result?.status == 200) return result?.data;
}

export default async function OverviewPage({params}) {
    const target = await loadTarget(params.id);

    return (
        <section className="text-[12px] border-[1px] border-gray-400 text-black">
            <div className="w-full space-y-1 p-2 ">
                <label className="font-semibold gap-1 flex items-center">
                    <FontAwesomeIcon icon={faFileAlt} className="w-3 h-3" />
                    Description
                </label>
                <p className="p-2 bg-gray-200 rounded-md" style={{ lineHeight: 1.2 }}>
                    {target.description}
                </p>
            </div>
            <div className="w-full flex px-2 py-1 border-gray-400 justify-between" style={{ borderWidth: '1px 0 0 0' }}>
                <label className="font-semibold">Type:</label>
                <p>{target.type.toUpperCase()}</p>
            </div>
            <div className="w-full flex px-2 py-1 border-gray-400 justify-between" style={{ borderWidth: '1px 0 0 0' }}>
                <label className="font-semibold">Category:</label>
                <p>{target.category}</p>
            </div>
            <div className="w-full flex px-2 py-1 border-gray-400 justify-between" style={{ borderWidth: '1px 0 0 0' }}>
                <label className="font-semibold">Start Date:</label>
                <p>{formatDate(target.start_date)}</p>
            </div>
            <div className="w-full flex px-2 py-1 border-gray-400 justify-between" style={{ borderWidth: '1px 0 0 0' }}>
                <label className="font-semibold">End Date:</label>
                <p>{formatDate(target.end_date)}</p>
            </div>
            <div className="w-full flex px-2 py-1 border-gray-400 justify-between" style={{ borderWidth: '1px 0 0 0' }}>
                <label className="font-semibold">Functional Group:</label>
                <p className="text-end">{target.functional_group}</p>
            </div>
            <div className="w-full flex px-2 py-1 border-gray-400 justify-between" style={{ borderWidth: '1px 0 0 0' }}>
                <label className="font-semibold">Division/Distribution Group:</label>
                <p className="text-end">{target.group_division}</p>
            </div>
            <div className="w-full flex px-2 py-1 border-gray-400 justify-between" style={{ borderWidth: '1px 0 0 0' }}>
                <label className="font-semibold">Status:</label>
                <TargetStatusLabel status={target.status} />
            </div>
        </section>
    )
}