let display = document.querySelector('.display')
let displayTwo = document.querySelector('.display-two')
let dpPrice = 0;
let inPrice = 0;


const subBtn = document.querySelector('.subbtn');
const kpi = "b149dd47b3mshb4a36f3ac098a96p1e1e49jsn41b455bd94d6";
subBtn.addEventListener('click', (e) => {
  e.preventDefault();
  getRatesOut();
  getRatesIn();
})

const getRatesOut = () => {

  let currency = document.querySelector('#currency').value;
  let origin = document.querySelector('#origin').value;
  let destination = document.querySelector('#destination').value;
  let departure = document.querySelector('#departure').value;
  let inbound = document.querySelector('#inbound').value;

  if (currency === '' || origin === '' || destination === '' || departure === '' || inbound === '') {
    return alert('Please Fill In All Form Inputs');
  } else {

    document.querySelector('.flight-info-container').classList.remove('opacity')

    return fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/${currency}/en-US/${origin}-sky/${destination}-sky/${departure}?inboundpartialdate=${inbound}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": `${kpi}`,
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
      }
    })
      .then(res => res.json())
      .then(data => {

        if (data.Places.length === 0) {
          display.innerHTML = `
          <h2 class="alert">No Flights Found!</h2>
          <p>Try a different location within the same continent</p>
        `
        } else {

          let carrier = data.Carriers[0].Name;
          let locationOne;
          let locationTwo;
          if (origin === data.Places[0].IataCode) {
            locationOne = data.Places[0].Name;
            locationTwo = data.Places[1].Name;
          } else {
            locationOne = data.Places[1].Name;
            locationTwo = data.Places[0].Name;
          }

          display.innerHTML = `
      <div class="flexer">
        <h2>${locationOne}(${origin})</h2>
        <i class="fas fa-exchange-alt"></i>
        <h2>${locationTwo}(${destination})</h2>
      </div>
      <div class="flexer">
        <h2>Outbound Carrier:</h2>
        <h2>${carrier.toUpperCase()}</h2>
      </div>
      <div class="flexer">
        <h2>Outbound Flight:</h2>
        <h2 class="minPrice">${data.Currencies[0].Symbol}${data.Quotes[0].MinPrice}</h2>
      </div>
      `

          dpPrice = data.Quotes[0].MinPrice;
        }
      })
      .catch(err => {
        console.error(err);
      });

  }
}

const getRatesIn = () => {
  let currency = document.querySelector('#currency').value;
  let origin = document.querySelector('#origin').value;
  let destination = document.querySelector('#destination').value;
  let departure = document.querySelector('#departure').value;
  let inbound = document.querySelector('#inbound').value;

  if (currency === '' || origin === '' || destination === '' || departure === '' || inbound === '') {
    return console.log('NULL');
  } else {


    return fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/${currency}/en-US/${destination}-sky/${origin}-sky/${departure}?inboundpartialdate=${inbound}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": `${kpi}`,
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
      }
    })
      .then(res => res.json())
      .then(data => {
        let carrier = data.Carriers[0].Name;
        displayTwo.innerHTML = `
      <div class="flexer">
        <h2>Inbound Carrier:</h2>
        <h2>${carrier.toUpperCase()}</h2>
      </div>
      <div class="flexer">
        <h2>Inbound Flight:</h2>
        <h2 class="minPrice">${data.Currencies[0].Symbol}${data.Quotes[0].MinPrice}</h2>
      </div>
      <div class="flexer">
        <h2>To Find a Flight Vendor Follow Link:</h2>
        <h2><a href="https://www.skyscanner.de/transport/flights/${origin}/${destination}/${departure}/${inbound}/" class="skyscanner">Skyscanner</a></h2>
      </div>
      <div class="flexer">
        <h4>Prices may vary from site-to-site</h4>
      </div>
      `
      })
      .catch(err => {
        console.error(err);
      });

  }

}

