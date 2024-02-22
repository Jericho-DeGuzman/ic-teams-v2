import TargetTitleHeader from "@/app/components/header/targetTitleHeader";

async function loadTitle(uuid) {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/targets?id=${uuid}`, {
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
    const { targetId } = params;
    const target = await loadTitle(targetId);

    return (
        <TargetTitleHeader key={targetId} uuid={targetId} title={target?.title} />
    )
}