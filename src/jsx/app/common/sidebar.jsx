import {
  Sidebar, SidebarNav, SidebarNavItem,
  SidebarControls, SidebarControlBtn
} from 'global/jsx/sidebar_component';
import React from "react";

var data = [
    {id: 1, name: "Birthday", keyword: "Birthday"},
    {id: 2, name: "Christmas", keyword: "christmas"},
    {id: 3, name: "Friend", keyword: "Friend"},
    {id: 4, name: "Funny", keyword: "funny"},
    {id: 5, name: "Good night", keyword: "Goodnight"},
    {id: 6, name: "Love", keyword: "Love"},
    {id: 7, name: "Mother", keyword: "mom"},
    {id: 8, name: "Motivational", keyword: "Motivational"},
    {id: 9, name: "Mourning", keyword: "mourning"},
    {id: 10, name: "New year", keyword: "Newyear"},
    {id: 11, name: "Valentine", keyword: "valentine"},
    {id: 12, name: "Wedding", keyword: "wedding"},
    {id: 13, name: "Woman", keyword: "woman"}
];



class CategoriesBox extends  React.Component{
  render() {
    return (
<div>
          <CategoriesList data={this.props.data} />
</div>
    );
  }
}


class CategoriesList extends  React.Component{
    render() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
          <Categories name={comment.name} key={comment.id}>
            {comment.keyword}
          </Categories>
      );
    });
    return (
<div>
          {commentNodes}
</div>
    );
  }
}


class Categories extends  React.Component{
    render() {
    return (
        <div>
        <Grid>
            <Row>
                <Col xs={12}>

                    <div className='sidebar-nav-container'>
                        <SidebarNav style={{marginBottom: 0}} ref={(c) => this._nav = c}>

            <SidebarNavItem name={this.props.name} href={'/something-else-1/' + this.props.name +'/'} />

                        </SidebarNav>
                    </div>
                </Col>
            </Row>
        </Grid>
        </div>

    );
  }
}


class ApplicationSidebar extends React.Component {
  constructor(props)
  {
    super();
  }

  handleChange(e) {
    this._nav.search(e.target.value);
  }
  render(){
   
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>

              <div className='sidebar-nav-container'>
                <SidebarNav style={{marginBottom: 0}} ref={(c) => this._nav = c}>


                  <SidebarNavItem  name='Quotes' href='/' aliases={['/app/:id']} />

                  <SidebarNavItem  name='Search' href='/app/search' />

                  <SidebarNavItem  name='Blank 3' href='/something-else'  hidden={true} />

                  <SidebarNavItem  name='App' href='/app/:id' hidden={true} />
                
                </SidebarNav>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}




export default class extends React.Component {
  render() {
    return (
      <div id='sidebar' {...this.props}>
        <div id='avatar'>
          <Grid>
            <Row className='fg-white'>
              <Col xs={4} collapseRight>
                <img src='static\app\imgs\app\elogo.png' width='40' height='40' />
              </Col>

            </Row>
          </Grid>
        </div>

        <div id='sidebar-container'>
          <Sidebar sidebar={0}>
            <ApplicationSidebar />
              <CategoriesBox data={data} />
          </Sidebar>

        </div>
      </div>
    );
  }
}
