export default async function updatateTaskStatus(uuid) {
    try {
        const response = await fetch(`/api/tasks?uuid=${uuid}`, {
            method: 'put', 
            headers: {'Content-Type': 'application/json'}
        })

        const result = await response.json();

        if(result?.status !== 200) throw new Error(result?.message);

        return result?.data;
    } catch(error) {
        throw new Error(error)
    }
} 