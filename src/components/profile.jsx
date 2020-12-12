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


export default class Profile extends Component{

    constructor(props){
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.OnChangeName = this.OnChangeName.bind(this);
        this.OnChangeRegistration = this.OnChangeRegistration.bind(this);
        this.OnChangeContact = this.OnChangeContact.bind(this);
        this.OnChangeAddress = this.OnChangeAddress.bind(this);
        this.OnChangeGender = this.OnChangeGender.bind(this);
        this.OnChangeRace = this.OnChangeRace.bind(this);
        this.state = {
            name: "",
            registration: "", 
            address: "",
            contact: "",
            gender: 2,
            race: 5,
            message: "",
            picture_url:"",
            loading: false
          };
    }

    componentDidMount() {

        if (TokenStore.getToken() === null) {
            this.props.history.push("/login");
            window.location.reload();
          }
  
          this.GetProfile()  
      }

      GetProfile(){
        MedicalDataService.getProfile()
        .then(response => {
          this.setState({
            name: response.data.name,
            registration: response.data.reg_number, 
            address: response.data.address,
            contact: response.data.contact,
            gender: response.data.gender,
            race: response.data.race,
            picture_url:response.data.picture_url,
          });
          //console.log(response.data.Profile);
        })
        .catch(e => {
          console.log(e);
        });

      }

      handleUpdate(e){
        e.preventDefault();

        this.setState({
          message: "",
          loading: true
        });

        var data = {
          name: this.state.name,
          registration: this.state.registration, 
          address: this.state.address,
          contact: this.state.contact,
          gender: this.state.gender,
          race: this.state.race,
        };

        MedicalDataService.updateProfile(data)
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

    OnChangeRegistration(e){
        this.setState({
            registration: e.target.value
        });
    }

    OnChangeContact(e){
        this.setState({
            contact: e.target.value
        });
    }

    OnChangeAddress(e){
        this.setState({
            address: e.target.value
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
                <label htmlFor="registration">Registration Number</label>
                <Input
                  type="text"
                  className="form-control"
                  name="registration"
                  value={this.state.registration}
                  onChange={this.OnChangeRegistration}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <Input 
                  type="text"
                  className="form-control"
                  name="adress"
                  value={this.state.address}
                  onChange={this.OnChangeAddress}
                />
              </div>


              <div className="form-group">
                <label htmlFor="contact">Contact</label>
                <Input
                  type="contact"
                  className="form-control"
                  name="contact"
                  value={this.state.contact}
                  onChange={this.OnChangeContact}
                />
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