import React, { Component } from "react";
import TokenStore from '../services/tokenservice';
import Form from "react-validation/build/form";
import MedicalDataService from "../services/dataservice";
import Input from '@material-ui/core/Input';
import CheckButton from "react-validation/build/button";
import Card from '@material-ui/core/Card';
import GridContainer from "./Grid/GridContainer";
import GridItem from "./Grid/GridItem";
import Avatar from '@material-ui/core/Avatar';
import { CardHeader, CardContent  } from '@material-ui/core';


export default class CreateApplication extends Component{

    constructor(props){
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.OnChangeName = this.OnChangeName.bind(this);
        this.OnChangeType = this.OnChangeType.bind(this);
        this.OnChangeBirthDate = this.OnChangeBirthDate.bind(this);
        this.OnChangeIDNum = this.OnChangeIDNum.bind(this);
        this.OnChangeGender = this.OnChangeGender.bind(this);
        this.OnChangeRace = this.OnChangeRace.bind(this);
        this.state = {
            name: "",
            type: 2,
            race: 5,
            gender: 2,
            birth_date: "",
            identification_number:"",
            loading: false
          };
    }

    componentDidMount() {

        if (TokenStore.getToken() === null) {
            this.props.history.push("/login");
            window.location.reload();
          }
  
      }

      handleUpdate(e){
        e.preventDefault();

        this.setState({
          message: "",
          loading: true
        });

        var data = {
            name: this.state.name,
            type: this.state.type, 
            gender: this.state.gender,
            race: this.state.race,
            birth_date: this.state.birth_date,
            identification_number: this.state.identification_number,
        }
        alert(this.state.type)

        MedicalDataService.createApplication(data)
        .then(() =>{
            window.location.reload();
            },error =>{
                const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
                
                
                this.setState({
                    message: resMessage,
                    loading: false
                });

            }

        );

      }

    OnChangeName(e){
        this.setState({
            name: e.target.value
        });
    }

    OnChangeType(e){
        this.setState({
            type: e.target.value
        });
    }

    OnChangeBirthDate(e){
        this.setState({
            birth_date: e.target.value
        });
    }

    OnChangeIDNum(e){
        this.setState({
            identification_number: e.target.value
        });
    }

    OnChangeGender(e){
        this.setState({
            gender: e.target.value
        });
    }

    OnChangeRace(e){
        this.setState({
            race: e.target.value
        });
    }



    render() {
        return (
            <div className = "login-grid">
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>  
      
            <Card>
            <CardHeader  
            avatar={<Avatar className = "avatar" alt="Remy Sharp" src={this.picture_url} />} 
            title={this.state.name}/>
            <CardContent >
            <Form
                onSubmit={this.handleUpdate}
                ref={c => {
                this.form = c;
                }}
            >
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  fullWidth
                  value={this.state.name}
                  onChange={this.OnChangeName}
                />
              </div>
      
              <div className="form-group">
                <label htmlFor="registration">Birth Day</label>
                <Input
                  type="date"
                  className="form-control"
                  name="registration"
                  value={this.state.birth_date}
                  onChange={this.OnChangeBirthDate}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">ID Number</label>
                <Input 
                  type="text"
                  className="form-control"
                  name="adress"
                  value={this.state.identification_number}
                  onChange={this.OnChangeIDNum}
                />
              </div>


              <div className="form-group">
                <label htmlFor="type">Documentation Type</label>
                <select value={this.state.type} onChange={this.OnChangeType}>
                  <option value={0}>Identity Document</option>
                  <option value={1}>Passport</option>
                  <option value={2}>Social Grant Card</option>
                </select>
              </div>


              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select value={this.state.gender} onChange={this.OnChangeGender}>
                  <option value={0}>Female</option>
                  <option value={1}>Male</option>
                  <option value={2}>Undefined</option>
                </select>
              </div>


              <div className="form-group">
                <label htmlFor="race">Race</label>
                <select value={this.state.race} onChange={this.OnChangeRace}>
                  <option value={0}>Black</option>
                  <option value={1}>White</option>
                  <option value={2}>Arab</option>
                  <option value={3}>South East Asian</option>
                  <option value={4}>Far East Asian</option>
                  <option value={5}>Undefined</option>
                </select>
              </div>
      
              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Update</span>
                </button>
              </div>
      
              {this.state.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {this.state.message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c;
                }}
              />
              </Form>
              </CardContent>
            
          </Card>
          </GridItem>
          </GridContainer>   
          </div>
        )
    }


}