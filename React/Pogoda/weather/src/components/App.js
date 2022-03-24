import React, {Component} from 'react';
import Form from './Form';
import Result from './Result'
import './App.css';
const APIkey = 'db7441a621b9f44e31e9a7475305a9c7'

class App extends Component {
  state = {
    value: '',
    date: '',
    city: '',
    sunrise: '',
    sunset: '',
    temp: '',
    wind: '',
    pressure: '',
    err: false
  }
  chandleInputChange = (e) =>{
    this.setState({
      value: e.target.value
    })
  }
  // chandleCitySubmit = e =>{
  //   e.preventDefault()
  //   console.log("potwierdzono");
  //   const API = 'https://api.openweathermap.org/data/2.5/weather?q= '+this.state.value+' &appid='+APIkey+'&units=metric';

  //   fetch(API)
  //   .then(response => {
  //     if(response.ok){
  //       return response
  //     }
  //     throw Error("Nie udało się");
  //   })
  //   .then(response => response.json())
  //   .then(data =>{
  //     const date = new Date().toLocaleString()
  //     this.setState({
  //       err: false,
  //       date: date,
  //       city: this.state.value,
  //       sunrise: data.sys.sunrise,
  //       sunset: data.sys.sunset,
  //       temp: data.main.temp,
  //       wind: data.wind.speed,
  //       pressure: data.main.pressure
  //     })
  //   })
  //   .catch(err => {
  //     this.setState(prevState => ({ 
  //       err: true,
  //       city: prevState.value
  //     }))
  //   })
  // }

  componentDidUpdate(prevProps, prevState){
    if (this.state.value.length === 0) return 
    if(prevState.value !== this.state.value){
      
        const API = 'https://api.openweathermap.org/data/2.5/weather?q= '+this.state.value+' &appid='+APIkey+'&units=metric';

    fetch(API)
    .then(response => {
      if(response.ok){
        return response
      }
      throw Error("Nie udało się");
    })
    .then(response => response.json())
    .then(data =>{
      const date = new Date().toLocaleString()
      this.setState({
        err: false,
        date: date,
        city: this.state.value,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        temp: data.main.temp,
        wind: data.wind.speed,
        pressure: data.main.pressure
      })
    })
    .catch(err => {
      this.setState(prevState => ({ 
        err: true,
        city: prevState.value
      }))
    })
    }
  
  }
  render(){
  return (
    <div className="App">
     <Form value={this.state.value} 
     change={this.chandleInputChange}
     //submit={this.chandleCitySubmit}
     />
     <Result
      weather={this.state}
     />
    </div>
  );
  }
}

export default App;
