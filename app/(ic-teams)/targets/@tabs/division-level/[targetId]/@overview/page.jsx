import TargetStatusLabel from "@/app/components/label/targetStatus";
import formatDate from "@/utils/formatDate";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { baseUrl } from "@/app/constant/url";
import { cookies } from "next/headers";
import { decryptToken } from "@/utils/cryptoJs";
import microserviceCaller from "@/app/(ic-teams)/lib/ApiCaller/microserviceCaller";
import LinearProgress from "@/app/components/progress/linearPrgoress";

//TODO: Create a better data fetching and connect to IC microservice.
async function loadTarget(uuid) {
    const at = cookies().get('at').value;

    const decryptedToken = decryptToken(at);
    const { token } = decryptedToken;

    const microservice = microserviceCaller(token);

    try {
        const response = await microservice.get(`/ic-teams/targets/${uuid}`);
        return response?.data;
    } catch (error) {
        throw new Error(error);
    }

}

export default async function OverviewPage({ params }) {
    const target = await loadTarget(params.targetId);

    const functional = [];

    target?.distribution_groups.map((group) => {
        if (functional.indexOf(group.distribution_group.parent?.short_name) == -1) functional.push(group.distribution_group.parent?.short_name);
    })
    return (
        <section className="text-[12px] border-[1px] border-gray-400 text-black">
            <div className="w-full space-y-1 p-2 ">
                <label className="font-semibold gap-1 flex items-center">
                    <FontAwesomeIcon icon={faFileAlt} className="w-3 h-3" />
                    Description
                </label>
                <p className="p-2 bg-gray-200 rounded-md" style={{ lineHeight: 1.2 }} dangerouslySetInnerHTML={{ __html: target.description }} />
                <LinearProgress status={target?.status.color || '#bab6b3'} progress={target.progress} />
            </div>
            <div className="w-full flex px-2 py-1 border-gray-400 justify-between" style={{ borderWidth: '1px 0 0 0' }}>
                <label className="font-semibold">Type:</label>
                <p>{target.type == 1 ? 'INTERNAL' : 'EXTERNAL'}</p>
            </div>
            <div className="w-full flex px-2 py-1 border-gray-400 justify-between" style={{ borderWidth: '1px 0 0 0' }}>
                <label className="font-semibold">Category:</label>
                <p>{target.category.name}</p>
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
                <div className="flex gap-1">
                    {functional.map((group, index) => (
                        <span key={index} className="text-end">{group}</span>
                    ))}
                </div>
            </div>
            <div className="w-full flex px-2 py-1 border-gray-400 justify-between" style={{ borderWidth: '1px 0 0 0' }}>
                <label className="font-semibold">Division/TWG:</label>
                <div className="flex gap-1">
                    {target.distribution_groups.map((group, index) => (
                        <span key={index} className="text-end">{group.distribution_group.short_name} </span>
                    ))}
                </div>
            </div>
            <div className="w-full flex px-2 py-1 border-gray-400 justify-between" style={{ borderWidth: '1px 0 0 0' }}>
                <label className="font-semibold">Status:</label>
                <TargetStatusLabel status={target.status} />
            </div>
        </section>
    )
}