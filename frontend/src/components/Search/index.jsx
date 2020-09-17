import React from 'react';
import { FormControl,Form,Button } from 'react-bootstrap';
import axios from 'axios';
import SearchResult from './SearchResult';

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            posts:null,
        };
    }
    searchSubmit = (e) =>{
        this.search(e.target.search.value)
        e.preventDefault();
    }

    search = async val => {
        if(val){
            this.setState({ loading: true });
            const res = await axios.get(
            `http://localhost:4000/api/post/search/${val}`
            );
            const posts = await res.data.results;
        
            this.setState({ posts, loading: false });
            this.props.handleSearchResult(posts)
        }
        
      };

    render(){
      return (
        <Form inline onSubmit={this.searchSubmit}>
          <FormControl name="search" type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success" type="submit">Search</Button>
        </Form> 
      );
    }
}
export default SearchBox;