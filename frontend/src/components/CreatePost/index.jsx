import React from 'react';
import {Form,Container,Col,Row, Button} from 'react-bootstrap';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import './index.css';

class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            title:'',
            author:'',
            content:'',
            tags:[],
            tagCount:0,
            //tagInput:React.createRef()
          };
        this.textInput = React.createRef();
    }
    handleKeyinTag = (e) => {
        if(e.keyCode == 13){
            const count = this.state.tagCount;
            let tags = this.state.tags;
            tags.push(this.textInput.current.value)
            console.log(tags)
            this.setState({
                tags:tags,
                tagCount: count+1,
            })            
            this.textInput.current.value = ""
        }
    }

    handleSubmit = async (e) =>{
        e.preventDefault();
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        };
        this.setState({ loading: true });
        try{
            const result = await axios.post("http://localhost:4000/api/post/",{
            title: e.target.title.value,
            author:1,
            content:e.target.content.value,
            tags:this.state.tags
            },config)
            if(result.status===200){
                this.doToast("submit success",toast.success)
            }
        }catch(er){            
            this.doToast("submit fail",toast.error)
        }        
        this.setState({ loading: false });
        
    }

    doToast = (str,callback)=>{
        callback(str, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            
    }

    preventEnter = (e) =>{
        if(e.key=='enter' || e.keyCode == 13)
            e.preventDefault()
    }
    render(){
      return (
        <Container>
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
            <Row>
                <Col md={2}/>
                <Col md={8}>
                    <Form onSubmit={this.handleSubmit} onKeyDown={this.preventEnter}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="text" name="title" placeholder="Post's tilte" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control as="textarea" rows="4" name="content" placeholder="Enter post's content" />
                        </Form.Group>
                        {this.state.tags.map( (item,index)=>(
                            <div key={index} className="tag">{item}</div>
                        ))}
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Control ref={this.textInput} type="text" label="input tag" onKeyDown={this.handleKeyinTag} placeholder="enter tag"/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col md={2}/>
            </Row>
        </Container>
      );
    }
}
  
export default NewPost;