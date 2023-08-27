const numPersonsInput = document.getElementById("numPersons");
const createBtn = document.getElementById("createBtn");
const textboxContainer = document.getElementById("textboxContainer");
const listPersonItems = document.getElementById("listPersonItems")
const commonItemsPersonsContainer = document.getElementById("commonItemsPersonsContainer")
const commonItemsPriceContainer = document.getElementById("commonItemsPriceContainer")

createBtn.addEventListener("click", () => {
  const numPersons = parseInt(numPersonsInput.value);
  const person = {};
  textboxContainer.innerHTML = "";
  commonItemsPersonsContainer.innerHTML = "";

  for (let i = 0; i < numPersons; i++) {
    const personContainer = document.createElement("div");
    const newTextbox = document.createElement("input");
    newTextbox.type = "text";
    newTextbox.placeholder = `Person ${i + 1}`;
    newTextbox.id = "personName"+i

    const arrowSign = document.createElement("span");
    arrowSign.textContent = ">>";

    const itemsTextbox = document.createElement("input");
    itemsTextbox.type = "number";
    itemsTextbox.placeholder = `add the price of item`;
    itemsTextbox.id = "priceTextbox" + i;

    const btnPerson = document.createElement("button");
    btnPerson.textContent = "Add";
    btnPerson.id = "btnPerson" + i;
    person[btnPerson.id] = [];

    const paraPerson = document.createElement("span");
    paraPerson.id = "paraPerson" + i;
    paraPerson.textContent = "Total : ";

    const commonItemsPersonContainer = document.createElement("div");
    commonItemsPersonContainer.id = "commonItemsPersonContainer"+i    

    const commonItemsPersonName = document.createElement("span");
    commonItemsPersonName.id = "commonItemPersonName"+i
    
    const sharePersonTextBox = document.createElement("input")
    sharePersonTextBox.type = "number";
    sharePersonTextBox.placeholder = `add the share for the item`;
    sharePersonTextBox.id = "sharePersonTextBox" + i;
    sharePersonTextBox.hidden = true

    commonItemsPersonContainer.append(commonItemsPersonName, sharePersonTextBox)
    
    personContainer.append(newTextbox, arrowSign, itemsTextbox, btnPerson, paraPerson);
    commonItemsPersonsContainer.appendChild(commonItemsPersonContainer)
    textboxContainer.appendChild(personContainer);
  }

  const commonItemPrice = document.createElement("input")
  commonItemPrice.type = "number";
  commonItemPrice.placeholder = `add price of the item`;
  commonItemPrice.id = "commonItemPrice";
  commonItemPrice.hidden = true

  const commonItemsBtn = document.createElement("button");
  commonItemsBtn.textContent = "Add";
  commonItemsBtn.id = "commonItemsBtn";
  commonItemsBtn.hidden = true
  
  commonItemsPriceContainer.append(commonItemPrice, commonItemsBtn)

  const btnobjectList = [];
  for (let i = 0; i < numPersons; i++) {
    btnobjectList.push(document.getElementById("btnPerson" + i));
  }
  for (let i = 0; i < numPersons; i++) {
    btnobjectList[i].addEventListener("click", () => {
      priceTextBoxID = document.getElementById("priceTextbox" + i)
      person["btnPerson" + i].push(
        priceTextBoxID.value
      );
      priceTextBoxID.value = ""
      document.getElementById("paraPerson" + i).innerHTML = "Total: " + person[
        "btnPerson" + i
      ].reduce((partialSum, a) => partialSum + Number(a), 0);
      var listPersonItemsValue = ""
      for (let i = 0; i < numPersons; i++) {
        var temp = document.getElementById("personName"+i).value + " >>> " + person["btnPerson" + i] + "<br><hr>"
        listPersonItemsValue += temp
      }
      listPersonItems.innerHTML = listPersonItemsValue
    });
  }  
  
  for (let i = 0; i < numPersons; i++) {
    const personNameTextBox = document.getElementById("personName"+i)
    personNameTextBox.addEventListener("blur", () => {
      document.getElementById("commonItemPersonName"+i).textContent = personNameTextBox.value + " >> "
      document.getElementById("sharePersonTextBox"+i).hidden = false
      document.getElementById("commonItemPrice").hidden = false
      document.getElementById("commonItemsBtn").hidden = false
    });
  }

  commonItemsBtn.addEventListener("click", () => {
    const commonItemPrice = parseInt(document.getElementById("commonItemPrice").value);
    const listOfShares = []
    for (let i = 0; i < numPersons; i++) {
      listOfShares.push(document.getElementById("sharePersonTextBox" + i).value)
    }
    totalShare = listOfShares.reduce((partialSum, a) => partialSum + Number(a), 0)
    const commonItemPricePerPerson = listOfShares.map(element => element * (commonItemPrice/totalShare));
    for (let i = 0; i < numPersons; i++) {
      person["btnPerson" + i].push(commonItemPricePerPerson[i]);
      document.getElementById("paraPerson" + i).innerHTML = "Total: " + person[
        "btnPerson" + i
      ].reduce((partialSum, a) => partialSum + Number(a), 0);
      var listPersonItemsValue = ""
      for (let i = 0; i < numPersons; i++) {
        var temp = document.getElementById("personName"+i).value + " >>> " + person["btnPerson" + i] + "<br><hr>"
        listPersonItemsValue += temp
      }
      listPersonItems.innerHTML = listPersonItemsValue
    }
    document.getElementById("commonItemPrice").value = ""
  });
});
