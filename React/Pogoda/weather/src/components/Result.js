import React from "react";

const Result = (props) => {
    const {err, city, temp, sunrise, sunset, wind, pressure, date} = props.weather;
    return( 
        <React.Fragment>
       <div>
           Pogoda dla: {city}
       </div>
       <div>
           Temperatura: {temp}
       </div>
       </React.Fragment>
    );
}
export default Result;