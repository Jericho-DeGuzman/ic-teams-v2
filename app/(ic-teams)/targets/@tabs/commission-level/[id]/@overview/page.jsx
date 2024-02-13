import TargetStatusLabel from "@/app/components/label/targetStatus";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OverviewPage() {
    return (
        <section className="text-[12px] border-[1px] border-gray-400">
            <div className="w-full space-y-1 p-2">
                <label className="font-semibold gap-1 flex items-center">
                    <FontAwesomeIcon icon={faFileAlt} className="w-3 h-3" />
                    Description
                </label>
                <p className="p-2 bg-gray-200 rounded-md" style={{ lineHeight: 1.2 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
            <div className="w-full flex px-2 py-1 border-gray-400 justify-between" style={{ borderWidth: '1px 0 0 0' }}>
                <label className="font-semibold">Type:</label>
                <p>INTERNAL</p>
            </div>
            <div className="w-full flex px-2 py-1 border-gray-400 justify-between" style={{ borderWidth: '1px 0 0 0' }}>
                <label className="font-semibold">Category:</label>
                <p>Software</p>
            </div>
            <div className="w-full flex px-2 py-1 border-gray-400 justify-between" style={{ borderWidth: '1px 0 0 0' }}>
                <label className="font-semibold">Start Date:</label>
                <p>December 03, 2023</p>
            </div>
            <div className="w-full flex px-2 py-1 border-gray-400 justify-between" style={{ borderWidth: '1px 0 0 0' }}>
                <label className="font-semibold">End Date:</label>
                <p>March 03, 2024</p>
            </div>
            <div className="w-full flex px-2 py-1 border-gray-400 justify-between" style={{ borderWidth: '1px 0 0 0' }}>
                <label className="font-semibold">Functional Group:</label>
                <p className="text-end">Management Support Services Group</p>
            </div>
            <div className="w-full flex px-2 py-1 border-gray-400 justify-between" style={{ borderWidth: '1px 0 0 0' }}>
                <label className="font-semibold">Division/Distribution Group:</label>
                <p className="text-end">Information Systems</p>
            </div>
            <div className="w-full flex px-2 py-1 border-gray-400 justify-between" style={{ borderWidth: '1px 0 0 0' }}>
                <label className="font-semibold">Status:</label>
                <TargetStatusLabel status={'pending'} />
            </div>
        </section>
    )
}