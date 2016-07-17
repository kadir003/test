
import React from "react";



import Quote from "../components/quote";
import * as QuotesActions from "../actions/QuotesActions";
import QuotesStore from "../stores/QuotesStore";


export default class Search extends  React.Component{

    constructor(){
        super();

        this.getResult = this.getResult.bind(this);
        this.state={
            quotes: QuotesStore.getAll(),
        };

    }

    searchQuotes(text)
    {

        QuotesActions.filterQuotes(text);
    }

    componentWillMount(){

        QuotesStore.on("searchDone",this.getResult);
    }
    componentWillUnmount(){
        QuotesStore.removeListener("searchDone",this.getResult);
    }
    handleChange(e){
        const value = e.target.value;
        this.searchQuotes(value);
    }

    getResult(){
        this.setState({
            quotes:QuotesStore.getResult()
        });
    }

    render(){
        const { quotes } = this.state;

        const QuoteComponenents = quotes.map((quote)=>{
            return <Quote key={quote.id} {...quote}/>
        });

        return(
            <Container id='body'>
                <PanelContainer plain={true}>
                    <Panel>
                        <Grid className='gallery-item'>
                            <Row>
                                <Col xs={12} style={{padding: 12.5}}>
                                    <div className="container">
                                        <input id="search-input" className="form-control input-lg" placeholder="Search comments" onChange={this.handleChange.bind(this)}/>
                                    </div>
                                </Col>
                            </Row>
                        </Grid>
                    </Panel>
                </PanelContainer>
                <Grid>
                    <Row>
                        <Col sm={6} collapseRight>
                            {QuoteComponenents}
                        </Col>
                    </Row>
                </Grid>
            </Container>
        );
    }
}