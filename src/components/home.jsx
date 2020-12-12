import React, { Component, useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import TokenStore from '../services/tokenservice';
import { Container } from "reactstrap"
import 'hammerjs';
import MedicalDataService from '../services/dataservice.js'
import {
    Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import "./styling/home.css"


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchPerson = this.onChangeSearchPerson.bind(this);
        this.clickPerson = this.clickPerson.bind(this);
        this.searchPerson = this.searchPerson.bind(this);
        
        this.state = {
          people: [],
          currentIndex: -1,
          currentPerson: null,
          searchPerson: ""
        };
      }

      componentDidMount() {

        if (TokenStore.getToken() === null) {
            this.props.history.push("/login");
            window.location.reload();
          }
          
        
      }
      
      clickPerson(id){

        localStorage.setItem("PATIENT_ID",id);
        this.props.history.push("/medical");
            window.location.reload();

      }

      request(id){
        MedicalDataService.request(id)
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });

      }

      onChangeSearchPerson(e) {
        const searchterm = e.target.value;
    
        this.setState({
            searchPerson: searchterm
        });
      }
    
      searchPerson() {
        MedicalDataService.search(this.state.searchPerson)
          .then(response => {
            this.setState({
                people: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      render(){
          return(

            <Container className="container-fluid pr-5 pl-5 pt-5 pb-5">

<div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={this.state.searchPerson}
                onChange={this.onChangeSearchPerson}
              />
              <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.searchPerson}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      </div> 

    {this.state.people.map((person, index) => (
        <div style={{width: "20%"}}>
        <Card >
          <CardImg top width="80%" src={person.picture_url} alt="Card image cap" height="100px" width="15px"  />
          <CardBody>
    <CardTitle>{person.name}</CardTitle>
    <CardSubtitle>ID:{person.identification_number}</CardSubtitle>
    <CardText>Medical Aid:{person.medical_Aid}</CardText>
            <Button onClick={(e) => this.request(person.id, e)}>Request Access</Button>
            <Button onClick={(e) => this.clickPerson(person.id, e)}>Access</Button>
          </CardBody>
        </Card>
      </div>
    ))}
    </Container>

          );
      }



}