export default function FileItem({uuid, title, isChecked, onchange}) {
    return (
        <div className="w-full flex gap-2">
            <input name={uuid} defaultChecked={isChecked} type="checkbox" className="h-4 w-4" onChange={onchange}/>
            <p dangerouslySetInnerHTML={{__html: title}}/>
        </div>
    )
}