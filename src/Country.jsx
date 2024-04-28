import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Country = () => {
    const [country,setCountry]=useState([]);
    const [selectCountry,setSelectCountry]=useState('');
    const [state,setState]=useState([]);
    const [selectState,setSelectState]=useState('');
    const [city,setCity]=useState([]);
    const [selectCity,setSelectCity]=useState('');

    const fetchCountry=async()=>{
        let url ='  https:crio-location-selector.onrender.com/countries'
        try {
            let response = await axios.get(url)
           // console.log(response.data);
           let tempData=response.data;
          // console.log(tempData)
           setCountry(tempData);
          // console.log(country);
          
        } catch (error) {
            
        }
    }


    const fetchState=async(selectedCountry)=>{
        let url =`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        try {
            let response = await axios.get(url)
           // console.log(response.data);
           let tempData=response.data;
           setState(tempData);
          // console.log(country);
          selectState('')
          setCity([]);
          selectCity('');
        } catch (error) {
            
        }
    }
  
    const fetchCity=async(countryName,stateName)=>
    {
    let url=`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`
    try {
        let response=await axios.get(url);
       // console.log(response.data);
       let temp = response.data;
       setCity(temp);
    } catch (error) {
        
    }
}

    useEffect(()=>{
        fetchCountry();
    },[])

    useEffect(()=>{
        if(selectCountry){
       //console.log(selectCountry)
        fetchState(selectCountry);
        }
    },[selectCountry]);

  
    useEffect(()=>{
        if(selectCountry&&selectState)
        {
        console.log(selectCountry,selectState);
        fetchCity(selectCountry,selectState)
        }
    },[selectState]);


  return (
    <div>
        <h1>Select Location</h1>
        <select value={selectCountry} onChange={(e)=>setSelectCountry(e.target.value)} >
<option value='' disabled >Select the Country</option>
{
    country.map((countryData)=>
    <option key={countryData} value={countryData}>  {countryData}</option>)
}
        </select>

        <select value={selectState} onChange={(e)=>setSelectState(e.target.value)}>
            <option value='' disabled >Select the State</option>
            {
                state.map((stateData)=>
                    <option key={stateData} value={stateData}>   {stateData}</option>
                )
            }
        </select>

        <select value={selectCity} onChange={(e)=>setSelectCity(e.target.value)} >
            <option value='' disabled >Select the city</option>
            {
                city.map((cityData)=>
            <option key={cityData} value={cityData}>  {cityData}</option>)
            }
 


        </select>
               
               <div>
                {
                    selectCity && <h2>You Selected {selectCountry} {selectState} {selectCity}</h2>
                }
               </div>
       </div>
  )
}

export default Country