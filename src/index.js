import FetchWrapper from "./fetch-wrapper.js"
import {calculateCalories,capitalize} from "./helpers.js"
const snackbar = require('snackbar');
const API = new FetchWrapper("https://firestore.googleapis.com/v1/projects/mynutrition-753b5/databases/(default)/documents/foods")
import AppData from "./app-data.js";

import {Chart} from 'chart.js';

const form = document.querySelector("#create-form")
const name = document.querySelector("#create-name")
const carbs = document.querySelector("#create-carbs")
const protein = document.querySelector("#create-protein")
const fat = document.querySelector("#create-fat")
const totalCal = document.querySelector("#total-calories")
const list = document.querySelector("#food-list")


const displayEntry = (name,carbs,protein,fat) => {
  appData.addFood(carbs,protein,fat)
  list.insertAdjacentHTML(
    "beforeend",
    `<li class="card">
        <div>
          <h3 class="name">${capitalize(name)}</h3>
          <div class="calories">${calculateCalories(
            carbs,
            protein,
            fat
          )} calories</div>
          <ul class="macros">
            <li class="carbs"><div>Carbs</div><div class="value">${carbs}g</div></li>
            <li class="protein"><div>Protein</div><div class="value">${protein}g</div></li>
            <li class="fat"><div>Fat</div><div class="value">${fat}g</div></li>
          </ul>
        </div>
      </li>`
  );
};
const appData = new AppData;
let chartInstance = null;
const renderChart = () => {
  chartInstance?.destroy();
  const context = document.querySelector("#app-chart").getContext("2d");

  chartInstance = new Chart(context, {
    type: "bar",
    data: {
      labels: ["Carbs", "Protein", "Fat"],
      datasets: [
        {
          label: "Macronutrients",
          data: [appData.getTotalCarbs(), appData.getTotalProtein(), appData.getTotalFat()],
          backgroundColor: ["#25AEEE", "#FECD52", "#57D269"],
          borderWidth: 2,
          borderColor: "#000",
          // example of other customization
        },
      ],
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
  });
};


form.addEventListener("submit", event => {
    event.preventDefault();
    
    API.post("",{
    fields: {
    name: { stringValue: name.value },
    carbs: { integerValue: carbs.value },
    protein: { integerValue: protein.value },
    fat: { integerValue: fat.value }
  }}).then(data => 
  { 
    displayEntry(name.value, carbs.value, protein.value, fat.value);
    snackbar.show("Food added successfully.");
    renderChart()

      if(data.error){
        snackbar.show("Some data is missing.")
          return;
      }
      name.value = "";
      carbs.value = "";
      protein.value = "";
      fat.value = "";
      ;
  }
  )
})


const init = () => {
  // Get the saved entries and list them
  API.get("").then((data) => {data.documents?.forEach((data) => {
    
    const fields = data.fields;
   
    // refactor into displayEntry
    displayEntry(
      fields.name.stringValue,
      fields.carbs.integerValue,
      fields.protein.integerValue,
      fields.fat.integerValue 
    );
      renderChart()
  });
  ;
})
}

init();


