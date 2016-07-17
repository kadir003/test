
import React from 'react';



class Like extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.active || false,
            counts: (Math.round(Math.random() * 20) + 4)
        };
    }
    handleIncrement(e) {
        if(this.state.active) return;
        this.setState({
            active: true,
            counts: this.state.counts+1
        });
    }
    render() {
        return (
            <Grid className='fg-text'>
                <Row>

                    <Col xs={6} collapseLeft collapseRight>
                        <a href='#' className='fg-text' style={{border: 'none', marginRight: 25}} active={this.state.active} onClick={this.handleIncrement.bind(this)}><Icon glyph='icon-dripicons-thumbs-up icon-1-and-quarter-x' /><span style={{position: 'relative', top: -2, left: 3}}>Like</span></a>
                    </Col>
                    <Col xs={6} className='text-right' collapseLeft collapseRight>
                        <span style={{top: 5, position: 'relative'}}><strong>{this.state.counts}</strong> people like this</span>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Like;
