import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import './previewPost.css';

class PreviewPost extends React.Component {
    constructor(props) {
        super(props);
        //this.props.content = this.props.content.substring(0,100);
        this.state = {
          id:'',
          title:'',
          author:'',
          content:'',
          tags:[],
          comment:[],
          updated:'',

        };
    }
    render(){
      return (
        <Jumbotron>
          <h3>{this.props.title}</h3> <h4>author: {this.props.author}</h4>
          <div >{this.props.tags.map((item,index)=>(
            <Button key={index} inline="true" className="mr-sm-2 tags-button" variant="info">{item}</Button> 
          ))}</div>
          <Content value={this.props.content}></Content>
        </Jumbotron>
      );
    }
}

function Content(prop=""){
  const subValue = prop.value.substring(0,100)+"...";
  return <p>{subValue}</p>
}
  
export default PreviewPost;