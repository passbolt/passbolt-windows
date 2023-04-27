import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";

class LocationComponent extends React.Component {
    /**
      * Whenever the component is mounted
      */
    componentDidMount() {
        this.handleRouteChanged();
    }

    /**
     * Whenever the route changed.
     * Notify the background page to update the browser url.
     */
    handleRouteChanged() {
        this.props.history.listen(location => {
            console.log(location)
        });
    }

    /**
     * Render the component
     * @return {JSX}
     */
    render() {
        return (
            <></>
        );
    }
}


LocationComponent.propTypes = {
    history: PropTypes.object,
    children: PropTypes.any
};

export default withRouter(LocationComponent);