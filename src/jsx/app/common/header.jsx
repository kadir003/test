import classNames from 'classnames';

import { SidebarBtn } from 'global/jsx/sidebar_component';

class Brand extends React.Component {
  render() {
    return (
      <NavHeader {...this.props}>
        <NavBrand tabIndex='-1'>

        </NavBrand>
      </NavHeader>
    );
  }
}

class HeaderNavigation extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  render() {
    var props = {
      ...this.props,
      className: classNames('pull-right', this.props.className)
    };

    return (
      <NavContent {...props}>
        <Nav>
         
        </Nav>
      </NavContent>
    );
  }
}

export default class Header extends React.Component {
  render() {
    return (
      <Grid id='navbar' {...this.props}>
        <Row>
          <Col xs={12}>
            <NavBar fixedTop id='rubix-nav-header'>
              <Container fluid>
                <Row>
                  <Col xs={3} visible='xs'>
                    <SidebarBtn />
                  </Col>
                  <Col xs={6} sm={4}>
                    <Brand />
                  </Col>
                  <Col xs={3} sm={8}>
                    <HeaderNavigation />
                  </Col>
                </Row>
              </Container>
            </NavBar>
          </Col>
        </Row>
      </Grid>
    );
  }
}
