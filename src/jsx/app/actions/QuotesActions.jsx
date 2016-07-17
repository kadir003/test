import dispatcher from "../dispatcher";

export function filterQuotes(text){
    console.log("Dispatching ....");
    dispatcher.dispatch({
        type:"FILTER_QUOTES",
        text,
    });
}