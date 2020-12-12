import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';
import { render } from '@testing-library/react';
import Navbar from 'react-bootstrap/Navbar';
import Login from "./login";
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { Container } from "reactstrap"
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, DiscreteColorLegend, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineMarkSeries, VerticalBarSeries} from 'react-vis';
import "bootstrap/dist/css/bootstrap.css";
import TokenStore from '../services/tokenservice';
import 'hammerjs';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme   } from 'victory';
import MedicalDataService from '../services/dataservice.js'




var chdataPoints =[];
var chldldataPoints =[];
var trig =[];
var sysbldataPoints =[];
var diabldataPoints =[];
var bloodsugar =[];
var stepz = [];
var heart = [];
export default class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
          CityComplaintData:[],
          CitySolutionFixing:[],
          CityRanking:[],
         };
    }

    componentDidMount() {
        this.retrieveAll()
    }

    retrieveAll() {
      MedicalDataService.dashboard()
      .then(response => {
        this.setState({
          CityComplaintData: response.data.CityComplaintData,
          CitySolutionFixing: response.data.CitySolutionFixing,
          CityRanking: response.data.CityRanking,
        });
        //console.log(response.data.Profile);
      })
      .catch(e => {
        console.log(e);
      });
  }

    
    


    render() {
  
        return (
          <Container>

<Container className="container-fluid pr-2 pl-2 pt-2 pb-2">
          {/* row 1 - revenue */}
          <Container className="row" >
          <Container className="col">
              <Container className="card is-card-dark chart-card">
              <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                  Water Complaints Per City
                  </Container>
                  </Container>
                <Container className="chart-container large full-height">

                <VictoryChart width={600} theme={VictoryTheme.material} domainPadding={20}>

                <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => (`${x / 1000}k`)}
        />

<VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
        
        />
                    <VictoryBar data={this.state.CityComplaintData} x="cityname" y="water" />
                </VictoryChart>
             
                </Container>
              </Container>
            </Container>

       

            <Container className="col">
              <Container className="card is-card-dark chart-card">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                  Infrastructure Complaints Per City
                  </Container>
                </Container>

                <Container className="chart-container large full-height">

                <VictoryChart width={600} theme={VictoryTheme.material} domainPadding={20} >

                <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => (`${x / 1000}k`)}
        />

<VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
        
        />

        <VictoryBar data={this.state.CityComplaintData} x="cityname" y="infrastructure" />
      </VictoryChart>
                
                </Container>
              </Container>
            </Container>
          </Container>

          {/* row 2 - conversion */}
          <Container className="row">
          <Container className="col-md-6 mb-4">
              <Container className="card is-card-dark chart-card">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                  Electricity Complaints Per City
                  </Container>
                </Container>

                <Container className="chart-container large full-height">

                <VictoryChart width={600} theme={VictoryTheme.material} domainPadding={20}>

                <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => (`${x / 1000}k`)}
        />

<VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
        
        />

        <VictoryBar data={this.state.CityComplaintData} x="cityname" y="electricity" />
      </VictoryChart>
                  
                
                </Container>
              </Container>
            </Container>


            <Container className="col-md-6 mb-4">
              <Container className="card is-card-dark chart-card">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                  Education Complaints Per City
                  </Container>
                </Container>

                <Container className="chart-container large full-height">

                <VictoryChart width={600} theme={VictoryTheme.material} domainPadding={20}>
                <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => (`${x / 1000}k`)}
        />

<VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
        
        />
        <VictoryBar data={this.state.CityComplaintData} x="cityname" y="education" />
      </VictoryChart>
                  
                
                </Container>
              </Container>
            </Container>

          </Container>


            {/* row 2 - conversion */}
            <Container className="row">
            <Container className="col-md-6 mb-4">
              <Container className="card is-card-dark chart-card">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                  Housing Complaints Per City
                  </Container>
                </Container>

                <Container className="chart-container large full-height">

                <VictoryChart width={600} theme={VictoryTheme.material} domainPadding={20}>
                <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => (`${x / 1000}k`)}
        />

<VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
        
        />
        <VictoryBar data={this.state.CityComplaintData} x="cityname" y="housing" />
      </VictoryChart>
                  
                
                </Container>
              </Container>
            </Container>

          </Container>

        
        </Container>
        </Container>


      



          

        );
    }

}