import React, { Component } from "react";

export default class LogOut extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        localStorage.removeItem("medic_token");
        this.props.history.push("/login");
        window.location.reload();
      }

      render() {
        return (<h1>Redirecting</h1>)
        }

}