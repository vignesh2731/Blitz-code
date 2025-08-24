import WinnerPage from "@components/Winner";

export default async function Winner({params}:{params:{code:string}}){
    const {code}=params
    const {winner}={winner:"Vignesh"}/*fetchWinner(code)*/;
    return(
        <div>
            <WinnerPage winner={winner} code={code}/>
        </div>
    )
}