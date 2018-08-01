import React from "react";
import { connect } from "react-redux";

import "./Card.css"

function Card(props) {
    let { suites } = props

    let random = suites ? Math.floor(Math.random() * suites.length) : 0;
    let image = suites[random] ? suites[random].img : "";
    let suite = suites[random] ? suites[random].title : "";

    return (
        <div className="card">
            <div className="card_img">
                <img src={image} alt={suite} />
            </div>
            <div className="suite">
                {suite}
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        suites: state.suites
    }
}

export default connect(mapStateToProps, null)(Card);