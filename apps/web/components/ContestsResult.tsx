export function ContestsResult({code,winner}:{code:string,winner:string})
{
    return <div className="border-2 border-slate-500 h-32 w-[600px] flex flex-col justify-center">
        <div className="flex justify-evenly">
            <div className="text-xl font-semibold">
                Contest Name : &nbsp;{code}
            </div>
            <div className="text-xl font-semibold pt-20">
                Winner : &nbsp; {winner}
            </div>
        </div>
    </div>
}