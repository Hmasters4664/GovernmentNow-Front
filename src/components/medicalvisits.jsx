import React, { Component, useEffect, useState } from 'react';
import { Container } from "reactstrap"
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, DiscreteColorLegend, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineMarkSeries, VerticalBarSeries} from 'react-vis';
import "bootstrap/dist/css/bootstrap.css";
import TokenStore from '../services/tokenservice';
import 'hammerjs';
import TableContainer from "./tablecontainer"
import MedicalDataService from '../services/dataservice.js'
import {Consultation, Hospital} from "./tables/medical_visits_table"
import { SelectColumnFilter } from './filter.jsx';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
  } from 'reactstrap';



  export default class MedicalVisit extends Component{
    constructor(props) {
      super(props);
      this.state = {
        hospital:[],
        consultation:[],
       };
  }

  componentDidMount() {

    if (TokenStore.getToken() === null) {
        this.props.history.push("/login");
        window.location.reload();
      }

      this.visits()
      
    
  }

  visits() {
    MedicalDataService.visit()
    .then(response => {
      this.setState({
        hospital: response.data.Hospital,
        consultation: response.data.Consultation,
      });
      //console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });

  }
  

  render() {
    return (
      <Container className="container-fluid pr-5 pl-5 pt-5 pb-5">
      <div className="row">

      <Container style={{ marginTop: 25 }}>
            <h2>Consultation</h2>
            <Consultation  data={this.state.consultation}
            />
      </Container>

      </div>

      <div className="row">
      <Container style={{ marginTop: 100 }}>
            <h2>Hospita Visits</h2>
            <Hospital  data={this.state.hospital}
            />
      </Container>
    

      </div>


  </Container>
    )
  }




  }