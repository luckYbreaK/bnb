import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { updateSuites } from "../../ducks/reducer";

// Imports a local file with the images
const context = require.context("../../img", true, /\.(jpg)$/);


class Suites extends Component {
    componentDidMount() {
        let { updateSuites } = this.props;
        axios.get("/api/suites").then(res => {
            updateSuites(res.data);
        });
    }

    render() {
        let { suites } = this.props;

        let mappedSuites = suites.map((suite, i) => {
            return (
                <div key={i}>
                    {/* <img src={context(context.keys()[3])} alt=""/> */}
                    {suite.title}
                </div>
            );
        });

        // let photos = context.keys().map(filename => {
        //     array.push(filename);
        //     return <img src={(context(filename))} />
        // });
        
        return (
            <div>
                Suites
                {mappedSuites}
                {/* {photos} */}
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        suites: state.suites
    }
}

export default connect(mapStateToProps, { updateSuites })(Suites);