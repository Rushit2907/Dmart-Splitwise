const numPersonsInput = document.getElementById("numPersons");
const createBtn = document.getElementById("createBtn");
const textboxContainer = document.getElementById("textboxContainer");
const listPersonItems = document.getElementById("listPersonItems")

createBtn.addEventListener("click", () => {
  const numPersons = parseInt(numPersonsInput.value);
  const person = {};
  textboxContainer.innerHTML = "";

  for (let i = 0; i < numPersons; i++) {
    const personContainer = document.createElement("div");
    personContainer.classList.add("textboxContainer");
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

    const paraPerson = document.createElement("p");
    paraPerson.id = "paraPerson" + i;
    paraPerson.textContent = "Total : ";

    personContainer.appendChild(newTextbox);
    personContainer.appendChild(arrowSign);
    personContainer.appendChild(itemsTextbox);
    personContainer.appendChild(btnPerson);
    personContainer.appendChild(paraPerson);
    textboxContainer.appendChild(personContainer);
  }
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
      document.getElementById("paraPerson" + i).innerHTML = person[
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
});
