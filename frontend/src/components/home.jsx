import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import PostContainer from "./Post/index";
import NewPost from "./CreatePost/index";
import SearchBox from "./Search/index";
import Login from "./login/index"
import SearchResult from "./Search/SearchResult";
import { Navbar, Nav,} from "react-bootstrap";
import actionTypes from '../actions/actionTypes';
import { connect } from 'react-redux';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: null,
    };
    this.handleSearchResult = this.handleSearchResult.bind(this);
  }
  ccomponentDidMount(){
    const { token, username } = this.props;
    if (token)
      this.setState({ token: token });
    if (username)
        this.setState({ username: username});
   }
  handleSearchResult = (list) => {
    console.log(list);
    this.setState({
      searchResult: list,
    });

    SearchResult.updateSearch;
  };
  render() {
    return (
      <Router key={this.props.username}>
          <div>
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="/">Zigvy</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/new">New</Nav.Link>
              </Nav>
              <SearchBox
                handleSearchResult={this.handleSearchResult}
              ></SearchBox>
              <nav className="mr-sm-2">
                { this.props.username? (
                <Nav.Link href="/user">{this.props.username}</Nav.Link>
                ): ( 
                <Nav.Link href="/user">login</Nav.Link>
                )}
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
            {this.state.searchResult != null && (
              <SearchResult blogPosts={this.state.searchResult} />
            )}
            {this.state.searchResult == null && (
              <Switch>
                <Route exact path="/"  component={PostContainer}>
                </Route>
                <Route path="/new" component={NewPost}>
                </Route>
                <Route path="/user">
                  {this.state.token?(
                    <User/>
                  ):(
                    <Login/>
                  )}
                  
                </Route>
                <Route path="/search">
                </Route>
              </Switch>
            )}
          </div>
        </Router>
    );
  }
}
function User(){
  return <h2>User Profile</h2>;
}

function mapState(state) {
  const { username } = state.login;
  return { username };
}

const actionCreators = {
  type: actionTypes.SAVE_USERNAME
}

export default connect(mapState, actionCreators)(Home);
