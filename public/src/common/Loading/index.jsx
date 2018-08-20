/**
 * Loading component -- use it to show UI when any api call is in flight
 */
import React from 'react';
import Spinner from 'assets/img/spinner.gif';
import './style.css';
const Loading = () => (
  <React.Fragment>
    <img className="spinner" src={Spinner} alt="Loading..." />
  </React.Fragment>
);
export default Loading;
