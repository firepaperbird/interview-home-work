  
import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import PreviewPost from './previewPost';
import axios from 'axios'

class PostContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        blogPosts:[]
      };
      
    }
    componentDidMount(){
        axios.get('http://localhost:4000/api/post')
        .then( res => {    
            this.setState({
                blogPosts: res.data.blogPosts
            })       
        })
    }

    render(){
        return (
            <div>
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

export default PostContainer