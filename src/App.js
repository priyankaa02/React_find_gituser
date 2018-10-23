import React, { Component } from 'react';
import './App.css';
import { Jumbotron,Button,Card, CardImg, CardText, CardBody,
  CardTitle, Form,Col,Row, FormGroup,Input } from 'reactstrap';
import MaterialIcon from 'material-icons-react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username:'',
      userInfo:[],
      loading: false,
      isData: false,
      data: ''

    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      loading: true
    })
    let apiBaseUrl = `https://api.github.com/users/${this.state.username}`;
    let that = this;
    axios.get(apiBaseUrl)
    .then(function (response) {
      if(response.status === 200){

        that.setState({
          userInfo: response.data,
          loading: false,
          isData: true
        })

        console.log(that.state.userInfo);
      }
      else if(response.status === 404){
        console.log("user not found");
        that.setState({
          isData : false,
          loading: false,
          data: 'User does not exist'
        })
      }
    })
    .catch(function (error) {
      console.log(error);
      that.setState({
        isData : false,
        loading: false,
        data: 'User does not exist'
      })
    });
  }


  render() {
    return (
        <div className="App">
          <Row style={{marginLeft:'0.1%',marginRight:'0.1%'}}>
            <Col md={12}>
      <Jumbotron>
        <Form>
       <FormGroup>
         <MaterialIcon icon="search" size="50%"/>
          <Col md={10}>
         <Input type="text" className = "icon" name="username" id="username" placeholder="Enter User Name" bsSize="lg" onChange = {(event) => this.setState({username: event.target.value})}/>
       </Col>
       </FormGroup>
       <div className='sweet-loading'>
           <ClipLoader
             sizeUnit={"px"}
             size={50}
             color={'#123abc'}
             loading={this.state.loading}
           />
         </div>
    <Button outline className="search-button" color="primary" size="lg"  onClick={(event) => this.handleClick(event)}>Search</Button>
     </Form>
   <br/><br/>
     <div>
       {this.state.isData ?
         <Col md={10}>
      <Card>
        <CardImg top width="20%" src={this.state.userInfo.avatar_url} border/>
        <CardBody>
          <CardTitle>Created At: <span>{this.state.userInfo.created_at}</span></CardTitle>
          <CardTitle>Url: <a href={this.state.userInfo.html_url}>{this.state.userInfo.html_url}</a></CardTitle>
          <CardText>Followers: <span>{this.state.userInfo.followers}</span></CardText>
          <CardText>Public repos: <span>{this.state.userInfo.public_repos}</span></CardText>
          <CardText>Login Name: <span>{this.state.userInfo.login}</span></CardText>
        </CardBody>
      </Card>
      </Col>
      : <h3>{this.state.data}</h3>
    }
    </div>
        </Jumbotron>
      </Col>
    </Row>
        </div>
    );
  }
}

export default App;
