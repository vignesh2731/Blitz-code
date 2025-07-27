export default function InputBox({label,placeholder,type,onChange}:{label:string,placeholder:string,type:string,onChange:(value:string)=>void})
{
    return <div className="flex gap-10">
        <p className="text-2xl font-bold">{label}</p>
        <input placeholder={placeholder} type={type} onChange={(e)=>{
            onChange(e.target.value)
        }} className="border-2 border-black w-96 pl-3" />
    </div>
}