import Like from 'common/Like'
import Image from 'common/Image'

export default class Body extends React.Component {
  render() {
    return (
      <Container id='body'>
        <Grid>
          <Row>
            <Col sm={6} collapseRight>
              <PanelContainer>
                <PanelBody style={{padding: 25, paddingTop: 12.5}}>

                  <div className='inbox-avatar-name'>
                    <div className='fg-darkgrayishblue75'> Elvis Presley</div>

                  </div>
                  <div className='inbox-date hidden-sm hidden-xs fg-text text-right'>
                    <div style={{position: 'relative', top: -10}}><small><strong>2 hours ago</strong></small></div>
                  </div>

                  <div>
                    <div className='fg-text'>
                      {"Don't criticize what you don't understand, son. You never walked in that man's shoes.."}
                      <div id="content">

                      </div>
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
                <PanelContainer>
                    <PanelBody style={{padding: 25, paddingTop: 12.5}}>


                        <div className='inbox-date hidden-sm hidden-xs fg-text text-right'>
                        </div>

                        <div>

                            <div>

                                <h2 > Gifts for you</h2 >


                                <Row>
                                    <Col sm={4}>

                                        <div style={{marginRight:'0px', marginLeft: '0px',marginTop:'0px',marginBottom:'0px',
                                                                             position:'absolute',height:'80%',width:'75%',overflow: 'hidden',zIndex:'-1'}}>
                                            <Image src={'/imgs/gallery/roses1-thumb.jpg'} width={'100%'} height={'100%'} mode='fill' />



                                        </div>
                                        <h2>.</h2>
                                        <h2>.</h2>

                                    </Col>
                                    <Col sm={4}>
                                        <div style={{marginRight:'0px', marginLeft: '0px',marginTop:'0px',marginBottom:'0px',
                                                                  position:'absolute',height:'80%',width:'75%',overflow: 'hidden',zIndex:'-1'}}>
                                            <Image src={'/imgs/gallery/roses-thumb.jpg'} width={'100%'} height={'100%'} mode='fill' />
                                        </div>
                                        <h2>.</h2>
                                        <h2>.</h2>
                                    </Col>
                                    <Col sm={4}>
                                        <div style={{marginRight:'0px', marginLeft: '0px',marginTop:'0px',marginBottom:'0px',
                                                                     position:'absolute',height:'80%',width:'75%',overflow: 'hidden',zIndex:'-1'}}>
                                            <Image src={'/imgs/gallery/download-thumb.jpg'} width={'100%'} height={'100%'} mode='fill' />
                                        </div>
                                        <h2>.</h2>
                                        <h2>.</h2>
                                    </Col>
                                </Row>




                            </div>
                        </div>


                    </PanelBody>


                </PanelContainer>
                <PanelContainer>
                    <PanelBody style={{padding: 25, paddingTop: 12.5}}>

                        <div className='inbox-avatar-name'>
                            <div className='fg-darkgrayishblue75'>  Charles Darwin</div>

                        </div>
                        <div className='inbox-date hidden-sm hidden-xs fg-text text-right'>
                            <div style={{position: 'relative', top: -10}}><small><strong>3 hours ago</strong></small></div>

                        </div>
                        <div>
                            <div className='fg-text'>
                                {"A man who dares to waste one hour of time has not discovered the value of life.  Charles Darwin"}
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
                <PanelContainer>
                    <PanelBody style={{padding: 25, paddingTop: 12.5}}>

                        <div className='inbox-avatar-name'>
                            <div className='fg-darkgrayishblue75'>Ralph Waldo Emerson</div>

                        </div>
                        <div className='inbox-date hidden-sm hidden-xs fg-text text-right'>
                            <div style={{position: 'relative', top: -10}}><small><strong>2 hours ago</strong></small></div>
                        </div>

                        <div>
                            <div className='fg-text'>
                                {"All life is an experiment. The more experiments you make the better.Ralph Waldo Emerson"}
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
                <PanelContainer>
                    <PanelBody style={{padding: 25, paddingTop: 12.5}}>

                        <div className='inbox-avatar-name'>
                            <div className='fg-darkgrayishblue75'> Buddha</div>

                        </div>
                        <div className='inbox-date hidden-sm hidden-xs fg-text text-right'>
                            <div style={{position: 'relative', top: -10}}><small><strong>2 hours ago</strong></small></div>
                        </div>

                        <div>
                            <div className='fg-text'>
                                {"Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment. Buddha"}
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
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}
