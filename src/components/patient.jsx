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
import MedicalDataService from '../services/dataservice.js'




var chdataPoints =[];
var chldldataPoints =[];
var trig =[];
var sysbldataPoints =[];
var diabldataPoints =[];
var bloodsugar =[];
var stepz = [];
var heart = [];
export default class Patient extends Component{
    constructor(props) {
        super(props);
        this.state = {
          allergens:[],
          bloodpressure:[],
          cholesterol:[],
          perscriptions:[],
          conditions:[],
          heartR: [],
          steps: [],
          cholesterols:[{
            title: "HDL (good cholesterol)",
            disabled: false,
            data: chdataPoints
          },
          {
            title: "LDL (Bad cholesterol)",
            disabled: false,
            data: chldldataPoints
          },
        
          {
            title: "Triglycerides",
            disabled: false,
            data: trig
          }],

          blood:[{
            title: "systolic",
            disabled: false,
            data: sysbldataPoints
          },
          {
            title: "diastolic",
            disabled: false,
            data: diabldataPoints
          },
          {
            title: "Blood Sugar",
            disabled: false,
            data: bloodsugar
          }]
         
         };
    }

    componentDidMount() {

      if (TokenStore.getToken() === null) {
          this.props.history.push("/login");
          window.location.reload();
        }

        this.retrieveAll()
        
      
    }

    retrieveAll() {
      MedicalDataService.dashboard()
        .then(response => {
          this.setState({
            allergens: response.data.Allergens,
            bloodpressure: response.data.BloodPressure,
            cholesterol: response.data.Cholesterol,
            perscriptions: response.data.Perscriptions,
            conditions:response.data.Conditions
          });

          

          if(this.state.cholesterol.length>0)
          {

          for (var i = 0; i < this.state.cholesterol.length; i++) {
            chdataPoints.push({
              x: this.state.cholesterol[i].date_discovered,
              y: this.state.cholesterol[i].hdl,
            });

            chldldataPoints.push({
              x: this.state.cholesterol[i].date_discovered,
              y: this.state.cholesterol[i].ldl,
            });

            trig.push({ 
              x: this.state.cholesterol[i].date_discovered,
              y: this.state.cholesterol[i].triglycerides,
            })

            

          }
        }

         
          if(this.state.bloodpressure.length>0)
          {

          for (var i = 0; i < this.state.bloodpressure.length; i++) {
            sysbldataPoints.push({
              x: this.state.bloodpressure[i].date_discovered,
              y: this.state.bloodpressure[i].systolic,
            });

            diabldataPoints.push({
              x: this.state.bloodpressure[i].date_discovered,
              y: this.state.bloodpressure[i].diastolic,
            });

            bloodsugar.push({
              x: this.state.bloodpressure[i].date_discovered,
              y: this.state.bloodpressure[i].bloodsugar,
            });
          }
        }

        if(response.data.Steps.length>0)
        {

        for (var i = 0; i < response.data.Steps.length; i++) {
          stepz.push({
            x: response.data.Steps[i].date_discovered,
            y: response.data.Steps[i].count,
          });
        }
      }

      if(response.data.HeartRate.length>0)
      {

      for (var i = 0; i < response.data.HeartRate.length; i++) {
        heart.push({
          x: response.data.HeartRate[i].date_discovered,
          y: response.data.HeartRate[i].bpm,
        });
      }
    }
    
      
      
          

          this.setState({

            cholesterols:[{
              title: "HDL (good cholesterol)",
              disabled: false,
              data: chdataPoints
            },
            {
              title: "LDL (Bad cholesterol)",
              disabled: false,
              data: chldldataPoints
            },
          
            {
              title: "Triglycerides",
              disabled: false,
              data: trig
            }
          ],
          blood:[{
            title: "systolic",
            disabled: false,
            data: sysbldataPoints
          },
          {
            title: "diastolic",
            disabled: false,
            data: diabldataPoints
          },
          {
            title: "Blood Sugar",
            disabled: false,
            data: bloodsugar
          }],

          steps: stepz,
          heartR: heart
          });

          
          console.log(this.state.steps);

        })
        .catch(e => {
          console.log(e);
        });
    }

    


    render() {
  
        return (
          <Container>

<Container className="container-fluid pr-5 pl-5 pt-5 pb-5">
          {/* row 1 - revenue */}
          <Container className="row" >
          <Container className="col-md-6 mb-4">
              <Container className="card is-card-dark chart-card">
              <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                  Cholesterol
                  </Container>
                  </Container>
                <Container className="chart-container large full-height">
                <XYPlot height={300} width={400} xType="ordinal">
                <DiscreteColorLegend style={{position:'absolute',left:'50px', top:'10px'}}
        
        width={180}
        items={this.state.cholesterols}
      />
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis title="Date"  />
                <YAxis title="Cholesterol level (mg/dL)"  />
                <LineMarkSeries data={this.state.cholesterols[0].data} />
                  <LineMarkSeries data={this.state.cholesterols[1].data} />
                  <LineMarkSeries data={this.state.cholesterols[2].data} />
          
        </XYPlot>
             
                </Container>
              </Container>
            </Container>

       

            <Container className="col-md-6 mb-4">
              <Container className="card is-card-dark chart-card">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Blood Pressure
                  </Container>
                </Container>

                <Container className="chart-container large full-height">

              <XYPlot height={300} width={500} xType="ordinal">
                <DiscreteColorLegend style={{position:'absolute',left:'50px', top:'10px'}}
                width={180}
                items={this.state.blood}
                />
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis title="Date"  />
                <YAxis title="Blood Pressure (mm/Hg)"  />
                  <LineMarkSeries data={this.state.blood[0].data} />
                  <LineMarkSeries data={this.state.blood[1].data} />
                  <LineMarkSeries data={this.state.blood[2].data} />
              </XYPlot>
                  
                
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
                    Daily Steps
                  </Container>
                </Container>

                <Container className="chart-container large full-height">

              <XYPlot margin={{left: 60, right: 20, top: 10, bottom: 30}}  height={300} width={400} xType="ordinal">
                <XAxis title="Date"  />
                <YAxis title="Steps"  />
                <VerticalBarSeries data={this.state.steps}  barWidth="0.001" />
                  
              </XYPlot>
                  
                
                </Container>
              </Container>
            </Container>


            <Container className="col-md-6 mb-4">
              <Container className="card is-card-dark chart-card">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                   Resting Heart Rate
                  </Container>
                </Container>

                <Container className="chart-container large full-height">

              <XYPlot margin={{left: 60, right: 20, top: 10, bottom: 30}}  height={300} width={400} xType="ordinal">
                <XAxis title="Date"  />
                <YAxis title="Heart Rate"  />
                <VerticalBarSeries data={this.state.heartR}  barWidth="0.001" />
                  
              </XYPlot>
                  
                
                </Container>
              </Container>
            </Container>

          </Container>

        
        </Container>
        </Container>


      



          

        );
    }

}