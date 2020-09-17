import React from "react";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import axios from "axios";
import PostContainer from "./Post/index";
import NewPost from "./CreatePost/index";
import SearchBox from "./Search/index";
import SearchResult from "./Search/SearchResult"
import { Navbar, Nav, FormControl, Form, Button } from "react-bootstrap";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        searchResult:null
    };
    this.handleSearchResult = this.handleSearchResult.bind(this)
  }

  handleSearchResult = (list) =>{
      console.log(list)
    this.setState({
      searchResult: list
    })
    
    SearchResult.updateSearch;
  }
  render() {
      console.log(this.state.searchResult)
    return (
      <Router>
        <div>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Zigvy</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/new">New</Nav.Link>
            </Nav>
            <SearchBox handleSearchResult= {this.handleSearchResult}></SearchBox>
            <nav className="mr-sm-2">
              <Nav.Link href="/user">LeMinhQuan</Nav.Link>
            </nav>
          </Navbar>

          <hr />

          {/*
                  A <Switch> looks through all its children <Route>
                  elements and renders the first one whose path
                  matches the current URL. Use a <Switch> any time
                  you have multiple routes, but you want only one
                  of them to render at a time
                */}
        { this.state.searchResult!=null &&
            <SearchResult blogPosts={this.state.searchResult}/>
        }
        { this.state.searchResult==null &&
          <Switch>
            <Route exact path="/">
              <PostContainer />
            </Route>
            <Route path="/new">
              <NewPost />
            </Route>
            <Route path="/user">
              <User />
            </Route>
            <Route path="/search">
              <User/>
            </Route>
          </Switch>
          
        }
        </div>
      </Router>
    );
  }
}
function User() {
  return <h2>User profile</h2>;
}

export default Home;
