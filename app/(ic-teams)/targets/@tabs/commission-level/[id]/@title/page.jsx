import { baseUrl } from "@/app/constant/url";
import TargetTitleHeader from "@/app/components/header/targetTitleHeader";

async function loadTitle(id) {
    try {
        const response = await fetch(`${baseUrl}/api/targets?id=${id}`, {
            method: 'get',
        })

        const result = await response.json();
        const { status, data } = result;

        //TODO: handle it properly
        if (status !== 200) console.log(result)
        
        return data;

    } catch (error) {
        console.log(error)
    }
}

export default async function TitlePage({ params }) {
    const {id} = params;
    const target = await loadTitle(id);

    return (
        <TargetTitleHeader key={id} uuid={id} title={target?.title}/>
    )
}