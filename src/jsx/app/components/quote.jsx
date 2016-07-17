import React from "react";
import Like from 'common/Like';

export default class Comment extends  React.Component{
    constructor(props)
    {
        super();
    }

    render(){
        const { quote, author, date } = this.props;

        return(
            <PanelContainer>
                <PanelBody style={{padding: 25, paddingTop: 12.5}}>

                    <div className='inbox-avatar-name'>
                        <div className='fg-darkgrayishblue75'> {author}</div>

                    </div>
                    <div className='inbox-date hidden-sm hidden-xs fg-text text-right'>
                        <div style={{position: 'relative', top: -10}}><small><strong>{date}</strong></small></div>

                    </div>
                    <div>
                        <div className='fg-text'>
                            {quote}
                        </div>
                    </div>

                </PanelBody>
                <PanelFooter noRadius className='fg-black75 bg-gray' style={{padding: '12.5px 25px', margin: 0}}>
                    <Grid className='fg-text'>
                        <Row>
                            <Like />
                        </Row>
                    </Grid>
                </PanelFooter>


            </PanelContainer>

        );
    }
}