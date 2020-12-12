import React, { Component, useEffect, useState } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, DiscreteColorLegend, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineMarkSeries, VerticalBarSeries} from 'react-vis';
import "bootstrap/dist/css/bootstrap.css";
import TokenStore from '../services/tokenservice';
import 'hammerjs';
import TableContainer from "./tablecontainer"
import { Container } from "reactstrap"
import MedicalDataService from '../services/dataservice.js'
import {Conditions, Allergens} from "./tables/condition_table"
import { SelectColumnFilter } from './filter.jsx';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
  } from 'reactstrap';


  export default class Condi extends Component{
    constructor(props) {
        super(props);
        this.state = {
          allergens:[],
          conditions:[],
         };
        }

        componentDidMount() {

            if (TokenStore.getToken() === null) {
                this.props.history.push("/login");
                window.location.reload();
              }
        
              this.data()
              
            
          }
        
          data() {
            MedicalDataService.conditions()
            .then(response => {
              this.setState({
                allergens: response.data.Allergens,
                conditions: response.data.Conditions,
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
                        <h2>Medical Conditions</h2>
                    <Conditions  data={this.state.conditions}
                     />
                    </Container>

                </div>

      <div className="row">

                <Container style={{ marginTop: 25 }}>
                        <h2>Allergens</h2>
                    <Allergens  data={this.state.allergens}
                     />
                    </Container>
     
    

      </div>


  </Container>
            )
        }

  }