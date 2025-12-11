export default function DynamicQuote(params){
    console.log("Params", params.id);
    return(
        <>
            <h1 className="text-white">Params Are {params.id}</h1>
        </>
    )
}