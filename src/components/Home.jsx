/* eslint-disable no-useless-constructor */
import React, { Component, useEffect, useState } from 'react';
import {
  CircularGauge, Scale, Label, RangeContainer, Range, Title, Font, Export,
} from 'devextreme-react/circular-gauge';
import { ReactInternetSpeedMeter } from 'react-internet-meter';

import axios from 'axios';

import logo from "../assets/volta_check.png";
import 'bootstrap/dist/css/bootstrap.css';


function IpDatas() {
    
    const [intDatas, SetIntDatas] = useState({ org: "", country: "", city: "", ip: "" });
    const [collapseState, setCollapseState] = useState("");


    useEffect(() => {
        fetchIp();
    }, []);

    async function fetchIp () {

        
        try {
            const response = await axios.get("https://api.ipgeolocation.io/ipgeo?apiKey=9bef10d9cf88449f8ef4d8b2c4447407");
            var resPattern = response.data;


            SetIntDatas({ip: resPattern.ip, org: resPattern.organization, country: resPattern.country_name, city: resPattern.city });

        } catch {
            console.log("dszdzd");
        }
    }


    
    return (
        <>
            
            { intDatas.ip !== "" &&
                <div className="row mt-2">
                    <div className="col-12">
                        <div className="d-flex flex-column align-items-center">
                            <p>
                                <a className="btn " style={{background: "transparent", color: "#F39200", border: "1px solid #F39200"}} onClick={() => setCollapseState(collapseState === "show" ? "" : "show")} data-bs-toggle="collapse" href="#contentId" aria-expanded="false" aria-controls="contentId">
                                    { collapseState === "show" ? "Show less" : "Show more"}
                                </a>
                            </p>
                            <div className={`collapse ${collapseState}`} id="contentId">
                                <div className="card card-body">
                                    Org: {intDatas.org} <br />
                                    Region: {intDatas.city} <br />
                                    Pays: {intDatas.country} <br />
                                    Ip: {intDatas.ip} 

                                </div>
                            </div>
                        </div>
                            
                    </div>
                </div>
            }

        </>
    );
}




class Home extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            speedMbps: [0],
            myPic: "https://siriusntech.com/wp-content/uploads/2021/12/digitalisation.jpg"
        };

    }




   
    
    render() { 
        
        return (
        <div>
                <div className="container">

                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex flex-column align-items-center">
                                <div>
                                    <img src={logo} width="200" style={{ maxWidth: "200px" }} alt="logo" />
                                </div>
                                <div className="fw-bold" style={{ fontSize: "4.5vh" }}>Your Internet speed is{this.state.speedMbps.length < 5 && "..."}</div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex flex-column align-items-center">
                                <CircularGauge
                                    id="gauge"
                                    value={Math.max(...this.state.speedMbps)}
                                >
                                    <Scale startValue={0} endValue={100} tickInterval={10}>
                                    <Label useRangeColors={true} />
                                    </Scale>
                                    <RangeContainer>
                                    <Range startValue={0} endValue={20} color="#FF3232" />
                                    <Range startValue={20} endValue={70} color="#F39200" />
                                    <Range startValue={70} endValue={100} color="#3390F3" />
                                    </RangeContainer>
                                    {/* <Title text="Temperature of the Liquid in the Boiler">
                                    <Font size={28} />
                                    </Title>
                                    <Export enabled={true} /> */}
                                </CircularGauge> <br />
                                <div className="fw-bold" style={{ fontSize: "3.5vh", opacity: this.state.speedMbps.length < 6 ? "0.5" : "1"} }>{Math.max(...this.state.speedMbps)} Mbps &nbsp;
                                    { this.state.speedMbps.length < 6 &&
                                    <div className="spinner-grow" style={{background: "#F39200"}} role="status">
                                       <span className="visually-hidden">Loading...</span>
                                    </div> }
                                
                                </div>

                                    <ReactInternetSpeedMeter
                                        txtSubHeading={` Mbps`}
                                        outputType="alert"
                                        customClassName="d-none"
                                        txtMainHeading={`${Math.max(...this.state.speedMbps)}`}
                                        pingInterval={1000} // milliseconds 
                                        clearInterval={true}
                                        thresholdUnit='megabyte' // "byte" , "kilobyte", "megabyte" 
                                        threshold={100}
                                        imageUrl={this.state.myPic}
                                        downloadSize="660000"  //bytes
                                        callbackFunctionOnNetworkDown={(speed) => console.log(`Internet speed is down ${speed}`)}
                                        callbackFunctionOnNetworkTest={(speed) => {
                                            this.setState({
                                                speedMbps: [...this.state.speedMbps, speed]
                                            });
                                            if (this.state.speedMbps.length > 5) {
                                                for (var i = 1; i < 100; i++)
                                                  window.clearInterval(i);
                                            }
                                        }}
                                    />
                                
                       
    
                            </div>
                        </div>
                    </div>

                    <IpDatas />
                    
                    
                </div>

        </div>);
    }
}
 
export default Home;