// Searching according to Query

async function searchCountries() {
  let query = document.querySelector("input").value;
 
  
  if (query == "") {
    document.querySelector(".countries-container").innerHTML = "";
  }
  else{
    let final_res = await obtainedData(query);
    appendData(final_res);
  }
}

// Debounce ==>

let id;

function Debounce(func, delay) {
  if (id) {
    clearInterval(id);
  }

  id = setTimeout(() => {
    func();
  }, delay);
}

// Getting the Query passed invoked function from line:8 here...

async function obtainedData(query) {
  let data = await fetch(`https://restcountries.com/v3.1/name/${query}`);
  let response = await data.json();
  //   console.log(response);
  return response;
}

// Display data function

function appendData(data) {
  if (!data) return;
  else {
    document.querySelector(".countries-container").innerHTML = "";

    data.forEach((ele) => {
      let card = document.createElement("div");
      card.setAttribute("class", "country")

      let image = document.createElement("img");
      image.setAttribute("src", ele.flags.svg);
      image.setAttribute("class", "flag");

      let name = document.createElement("h2");
      name.innerText = ele.name.common;
      name.style.textAlign = "center";
      name.style.margin = "20px";

      let div1 = document.createElement("div");
     
      let popu_header = document.createElement("h4");
      popu_header.innerText = "Population: ";

      let popu_count = document.createElement("p");
      popu_count.innerText = ele.population;

      div1.append(popu_header, popu_count);

      let div2 = document.createElement("div");
    

      let capital = document.createElement("h4");
      capital.innerText = "Capital: ";

      let capital_name = document.createElement("p");
      capital_name.innerText = ele.capital;

      div2.append(capital, capital_name);

      let div3 = document.createElement("div");
     

      let region = document.createElement("h4");
      region.innerText = "Region: ";

      let region_name = document.createElement("p");
      region_name.innerText = ele.region;

      div3.append(region, region_name);

      card.append(image, name, div1, div2, div3);
      document.querySelector(".countries-container").append(card);
    });
  }
}
