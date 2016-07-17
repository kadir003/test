/**
 * Created by gaspergracner on 15/06/16.
 */

import  { EventEmitter } from "events";

import dispatcher from "../dispatcher"

class QuotesStore extends EventEmitter{
    constructor() {

        super();
        this.quotes = [{"id":1, "quote":"To je lepa misel", "author":"Ljudska"}];
        this.result = [];

    }


    getAll()
    {
        return this.quotes;
    }

    setQuote (q)
    {
        this.quotes = q;
    }



    getResult()
    {
        return this.quotes;
    }

    isSuccess(data) {
        console.log("YEA");
        console.log(data);
        console.log("this.quotes prije petlje");
        console.log(this.quotes);
        this.quotes = [];
        var array = [];
        for (var i = 0; i < data.result.data.length; i++) {
            var item = {};
            item.id = i;
            item.quote = data.result.data[i]._source.quote;
            item.author = data.result.data[i]._source.author;
            array.push(item);
        }
        this.quotes = array;
        console.log("nakon for petlje");
        console.log(this.quotes);
        this.emit("searchDone");
    }

    searchFor(text){
        console.log("Searching ...");
        if(text=="")
        {
            this.result=[];
        }
        else{
            //TODO: Replace Ajax with another architecture http://andrewhfarmer.com/react-ajax-best-practices/
            this.result=[];
            console.log("Ajax SEND!");
            //AJAX CALL
            $.ajax({
                url: 'http://localhost:8000/_/_api_/search/',
                data: {
                    query: text,
                    from: 0,
                    size: 100
                },
                error: function() {
                    console.log("ERROR!!!!!!");
                },
                success:  this.isSuccess.bind(this),
                type: 'GET'
            });
        }

    }


    handleActions(action){
        switch(action.type){
            case "FILTER_QUOTES":
                console.log("handleActions");
                console.log(this.searchFor(action.text));
                break;
        }
    }
}

const quotesStore =  new QuotesStore;
dispatcher.register(quotesStore.handleActions.bind(quotesStore));

window.dispatcher = dispatcher;

export default quotesStore;