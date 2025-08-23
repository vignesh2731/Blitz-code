import { WebSocketServer, WebSocket } from "ws"
const wss = new WebSocketServer({port:8080});
console.log("Listening to wss");
const contest_room=new Map<string,WebSocket[]>();
const user_ws=new Map<string,WebSocket>();
wss.on('connection',(ws,req)=>{
    if(!req.url)return;
    const url=new URL(req.url,'ws://localhost:8080');
    const userId=url.searchParams.get('userId');
    const contestCode=url.searchParams.get('contestCode');
    if(!contestCode || !userId)return;
    if(!contest_room.has(contestCode))contest_room.set(contestCode,[]);
    contest_room.get(contestCode)?.push(ws);
    user_ws.set(userId,ws);

    ws.on('message',(data)=>{
        const req=JSON.parse(data.toString());
        user_ws.get(userId)?.send(JSON.stringify({method:"submission",codeStatus:req.codeStatus}));
        if(req.codeStatus===true)
        {
            contest_room.get(contestCode)?.forEach((cc)=>{
                cc.send(JSON.stringify({method:"overall",winner:userId}));
            })
        }
    })
    ws.send(JSON.stringify({msg:"Connected"}));
})