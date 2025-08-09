export default function ParticipantsBox({name}:{name:string})
{   return <div className="bg-slate-200 h-52 w-64 flex justify-center">
        <div className="flex flex-col justify-center gap-10">
            <div>
            <div className="rounded-full h-20 w-20 flex justify-center items-center bg-slate-50">
                <div className="text-2xl">
                    {name[0]}
                </div>
            </div>
            </div>
            <div className="text-xl font-semibold flex justify-center">
                {name}
            </div>
        </div>
        
    </div>
}