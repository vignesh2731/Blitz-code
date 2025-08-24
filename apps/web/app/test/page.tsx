import { JoinContest } from "@lib/lib";

export default async function Test()
{
    const data=await JoinContest("random","random");
    return <div>
        {JSON.stringify(data)}
    </div>
}