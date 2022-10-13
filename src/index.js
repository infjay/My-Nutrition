import FetchWrapper from "./fetch-wrapper"
import { calculateCalories,capitalize } from "./helpers.js"

const API =  new FetchWrapper("https://firestore.googleapis.com/v1/projects/mynutrition-753b5/databases/(default)/documents/foods")

const form = document.querySelector("#create-form")
const name = document.querySelector("#create-name")
const carbs = document.querySelector("#create-carbs")
const protein = document.querySelector("#create-protein")
const fat = document.querySelector("#create-fat")
const totalCal = document.querySelector("#total-calories")
const foodList = document.querySelector("#food-list")

form.addEventListener("submit", event => {
    event.preventDefault();
    API.post("/",{
    fields: {
    name: { stringValue: name.value },
    carbs: { integerValue: carbs.value },
    protein: { integerValue: protein.value },
    fat: { integerValue: fat.value }
  }}).then(data => 
  {
    foodList.insertAdjacentHTML("beforeend",`
    <li class="card">
  <div>
    <h3 class="name">${capitalize(name.value)}</h3>
    <div class="calories">${calculateCalories(carbs.value,protein.value,fat.value)} calories</div>
    <ul class="macros">
      <li class="carbs"><div>Carbs</div><div class="value">${carbs.value}g</div></li>
      <li class="protein"><div>Protein</div><div class="value">${protein.value}g</div></li>
      <li class="fat"><div>Fat</div><div class="value">${fat.value}g</div></li>
    </ul>
  </div>
</li>`);
      if(!error){
        // there was an error
          return;
      }
      name.value = "";
      carbs.value = "";
      protein.value = "";
      fat.value = "";
  }
  )
})


