  
import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import PreviewPost from '../Post/previewPost';

class SearchResult extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        blogPosts:this.props.blogPosts
      };
      
    }
    componentDidMount(){
      this.setState({blogPosts:this.props.blogPosts});
    }
    componentWillReceiveProps({blogPosts}){
      console.log("x")
      this.setState({blogPosts:blogPosts})
    }
    render(){
        return (
            <div key={this.props.blogPosts}>
            <Container>
                <Row className="show-grid">
                <Col md={2}>
                </Col>
                <Col md={8}>
                    { this.state.blogPosts.map( (item,index) => (                        
                    <div key={index} ><PreviewPost {...item}/><hr/></div>                                     
                    ))}
                    
                </Col>
                <Col md={2}>
                </Col>
                </Row>
            </Container>
            </div>
        );
        }
}

export default SearchResult