import FetchWrapper from "./fetch-wrapper"


const form = document.querySelector("#create-form")
const nameDropdown = document.querySelector("#create-name")
const carbs = document.querySelector("#create-carbs")
const protein = document.querySelector("#create-protein")
const fat = document.querySelector("#create-fat")
const totalCal = document.querySelector("#total-calories")
const foodList = document.querySelector("#food-list")

form.addEventListener("submit", event => {
    event.preventDefault();
    API.post("food",{
    fields: {
    name: { stringValue: nameDropdown.value },
    carbs: { integerValue: carbs.value },
    protein: { integerValue: protein.value },
    fat: { integerValue: fat.value }
  }}).then(data => 
  {
      const error = data.error
      if(!error){
          form.reset()
      }
  }
  )
})


