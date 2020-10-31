import React, {useState} from 'react';

const api={
  key: "c463e53e4b3edd37d1dc79206ea259ed",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setquery]=useState('');
  const [weather, setweather]=useState({});

  const search=evt=> {
    if(evt.key==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
     .then (res=> res.json())
      .then (myresult=> {
        setweather(myresult);
        setquery(''); 
        console.log(myresult);
      });
  }
  }
  const dateBuilder= (d)=>{
    let months=["January", "February", "March", "April", "May" ,"June", "July","August","September","October","November","December"];
    let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();

    return `${day} ${date} ${month} ${year}`

  }
  return (
    <div className={(typeof weather.main!="undefined")
    ? ((weather.main.temp > 16 )
    ? ('app warm' || 'app warm2') : 'app cold')
    : 'app'}>
    <main> 
    <div className="search-box">
    <input type="text" className="search-bar" placeholder="search city.." onChange={e=>setquery(e.target.value)} value={query} onKeyPress={search}/>
    </div>

    {(typeof weather.main != "undefined") ? ( 

    <div>   
    <div className="location-box">
    <div className="location">{weather.name}, {weather.sys.country}</div>
      <div className="date">{dateBuilder(new Date())} </div>
      </div>

      <div className="weather-box">
      <div className="temp">{Math.round(weather.main.temp)}°C</div>
      <div className="weather">{weather.weather[0].main}</div>
      <div className="weather-description">{weather.weather[0].description} </div>
      </div>
    </div>
    ) :('')}
    </main>
    </div>
    
  );
}

export default App;
