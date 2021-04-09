/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate =  (d.getDate())+'.'+(d.getMonth()+1)+'.'+ (d.getFullYear());
// Personal API Key for OpenWeatherMap API
const BaseURL="https://api.openweathermap.org/data/2.5/weather";
const APIKey="fcd1afa130d795c8daae2776ba7aa256";
const unit="metric";
const GenerateButton = document.querySelector("#generate");

/* end  Global Variables */
// Event listener to add function to existing HTML DOM element
GenerateButton.addEventListener('click', AskAboutWheather)
/* Function called by event listener */
function AskAboutWheather(e){
  /* Function to GET Web API Data*/
    WheaterTemp()
    .then(function(allwheatherInfo){
      /* Function to POST data */
      posttoserver('/SaveTempData', {date: newDate,  temp:allwheatherInfo.temp, content: allwheatherInfo.feelings ,country:allwheatherInfo.country,city:allwheatherInfo.city,whdescription:allwheatherInfo.whdescription});
    })
    .then(function (dataUI){
      
     /* Function to GET Project Data and updata UI */
      updateUI()
    }
    )
  
  }

/* Function to GET Web API Data*/
async function WheaterTemp()
{
    try
    {
        const zipCode= document.querySelector("#zip").value;
        const feelings = document.querySelector('#feelings').value;
       // console.log(zipCode);
        if(!zipCode || !feelings)
        {
             return alert(" You didn't enter zip code or your feeling !!")
        }
        //const wheatherAPIData= getWheaterAPI(zipCode);
        const APIurl= `${BaseURL}?zip=${zipCode}&appid=${APIKey}&units=${unit}`;
        const APIresponse= await fetch(APIurl);
         if(APIresponse.status===404 || APIresponse.status===400 )
         {
             return alert(" Please Enter valid zip code !!")
         }
        const wheatherAPIData= await  APIresponse.json() 
        //console.log(wheatherAPIData);
        const temp=wheatherAPIData.main.temp;
        const country=wheatherAPIData.sys.country;
        const city= wheatherAPIData.name;
        const whdescription=wheatherAPIData.weather[0].description;
        const allwheatherInfo={temp:temp,country:country,city:city,whdescription:whdescription,feelings:feelings}
        
        return  allwheatherInfo

        
    }
    catch(error)
    {
        console.log(error);
    }
}

//sending data to server 
/* Function to POST data */
const posttoserver = async ( url ='', data = {})=>{
    //console.log(data)
    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
}


const updateUI = async () => {
  
     /* Function to GET Project Data */
    const request = await fetch('/getTempData',{
        methode:"GET",
        credentials:"same-origin",
    });
    try{
      const TempData = await request.json();
      document.getElementById('temp').innerHTML = ` ${Math.floor(TempData.temp)}°C `;
      document.getElementById('date').innerHTML = `Date : ${TempData.date} `;
      document.getElementById('place').innerHTML = `loc: ${TempData.country},${TempData.city}`;
      document.getElementById('weather').innerHTML = `Wheather: ${TempData.whdescription}`;
      document.getElementById('content').innerHTML = `Feeling : ${TempData.content}`;
     
  
    }
    catch(error){
      console.log("error", error);
    }
  }










/*
getWheaterAPI.then((temp) =>{
    await fetch("/SaveTempData",{
        methode:"POST",
        credentials:"same-origin",
        headers:{
            "Content-Type" :"application/json"
        },
        body:JSON.stringify({
            data:newDate,
            temp:temp,
            feelings:feelings
        })
    
    })
    const res= await fetch("/getWheather",{
        methode:"GET",
        credentials:"same-origin",
    })
      console.log("resp"+ res)
})
.catch(error)
    {
        console.log(error);
    }
*/