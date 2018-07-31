import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { updateSuites } from "../../ducks/reducer";
import "./Home.css";

class Home extends Component {
    componentDidMount() {
        let { updateSuites } = this.props;
        axios.get("/api/suites").then(res => {
            updateSuites(res.data);
        });
    }

    render() {
        let { suites } = this.props
        let random = suites ? Math.floor(Math.random() * suites.length) : 0;
        return (
            <div className="home_container">
                <div className="card_container">
                    Home
                {/* displays a random suite */}
                    {suites[random] ? suites[random].title : ""}
                </div>
                <div className="specials_container">
                    Specials
                </div>
                <div className="card_container">
                    Castle Creek Img
                </div>
                <div>
                    Castle Creek Info
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        suites: state.suites
    }
}

export default connect(mapStateToProps, { updateSuites })(Home);