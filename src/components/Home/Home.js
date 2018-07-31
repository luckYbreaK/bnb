import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";
import {updateSuites} from "../../ducks/reducer";

class Home extends Component {
    // componentDidMount() {
    //     axios.get("/api/suites").then(res => {
    //         console.log(res.data);
            
    //     });
    // }

    render() {
        return (
            <div>Home</div>
        );
    }
}

function mapStateToProps(state) {
    return {
        suites: state.suites
    }
}

export default connect(mapStateToProps, {updateSuites})(Home);