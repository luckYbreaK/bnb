import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";
import {updateSuites} from "../../ducks/reducer";

class Suites extends Component {
    componentDidMount() {
        let {updateSuites} = this.props;
        axios.get("/api/suites").then(res => {
            updateSuites(res.data);
        });
    }

    render() {
        let {suites} = this.props;
        let mappedSuites = suites.map( (suite, i) => {
            return (
                <div key={i}>
                    {suite.title}
                </div>
            );
        });      
        return (
            <div>
                Suites
                {mappedSuites}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        suites: state.suites
    }
}

export default connect(mapStateToProps, {updateSuites})(Suites);