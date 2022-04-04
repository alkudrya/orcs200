const picsPaths = {
  airDefence: {
    folder: "AirDefence",
    picture: "/Air_defence_system_1.png",
    items: 198,
    header: "систем ППО",
  },

  aircraft: {
    folder: "Aircraft",
    picture: "/Aircraft_1.png",
    items: 20,
    header: "літак",
  },
  artillery: {
    folder: "Artillery",
    picture: ["/Artillery_system_1.png", "/Artillery_system_2.png"],
    items: 136,
    header: "артсистем",
  },
  automobiles: {
    folder: "Automobiles",
    picture: "/Automobile_1.png",
    items: 336,
    header: "автомобіл",
  },
  BBM: {
    folder: "BBM",
    picture: ["/BBM_1.png", "/BBM_2.png", "/BBM_3.png"],
    items: 294,
    header: "ББМ",
  },
  fuelTanks: {
    folder: "FuelTanks",
    picture: "/Fuel_Tank_1.png",
    items: 286,
    header: "цистерн",
  },
  helicopters: {
    folder: "Helicopters",
    picture: "/Helicopter_1.png",
    items: 24,
    header: "гелікоптер",
  },
  rszv: {
    folder: "RSZV",
    picture: ["/RSZV_1.png", "/RSZV_2.png", "/RSZV_3.png"],
    items: 144,
    header: "РСЗВ",
  },
  soldiers: {
    folder: "Soldiers",
    picture: "/Soldiers_1.png",
    items: 442,
    header: "солдат",
  },
  tanks: {
    folder: "Tanks",
    picture: "/Tank_1.png",
    items: 209,
    header: "танк",
  },
};

function getEnding(amount, type) {
  const lastDigit = amount % 10;
  const regex = /[2-4]/;
  if (
    type == "soldiers" ||
    type == "aircraft" ||
    type == "helicopters" ||
    type == "tanks"
  ) {
    if (lastDigit === 1) {
      return "";
    } else return regex.test(lastDigit) ? "и" : "ів";
  } else if (type == "automobiles") {
    if (lastDigit === 1) {
      return "ь";
    } else return regex.test(lastDigit) ? "і" : "ів";
  } else if (type == "fuelTanks" || type == "artillery") {
    if (lastDigit === 1) {
      return "а";
    } else return regex.test(lastDigit) ? "и" : "";
  } else return "";
}

function populate(amount, type, name) {
  let container = document.getElementsByClassName(type)[0];
  let field = document.createElement("div");
  field.setAttribute("class", "field");
  container.appendChild(field);
  if (type == "artillery" || type == "rszv" || type == "BBM") {
    for (let i = 1; i <= amount; i++) {
      let unit = document.createElement("img");
      let model = selectRandom(name);
      unit.setAttribute(
        "src",
        "./Assets/" + picsPaths[type].folder + name[model]
      );
      unit.setAttribute("class", "unit");
      field.appendChild(unit);
    }
  } else {
    for (let i = 1; i <= amount; i++) {
      let unit = document.createElement("img");
      unit.setAttribute("src", "./Assets/" + picsPaths[type].folder + name);
      unit.setAttribute("class", "unit");
      field.appendChild(unit);
    }
  }
}

function generate() {
  clearGeneration();
  getFilledInputs();
}

function clearGeneration() {
  let fields = document.querySelectorAll(".container");
  let text = document.getElementsByTagName("p");
  if (text.length !== 0) {
    for (let i = 0; i < fields.length; i++) {
      fields[i].innerHTML = "";
    }

    while (text.length !== 0) {
      text[0].parentNode.removeChild(text[0]);
    }
  }
}

function getFilledInputs() {
  let inputs = document.querySelectorAll('[type="number"]');
  for (let i = 0; i < inputs.length; i++) {
    const amount = inputs[i].value;
    const type = inputs[i].id;
    if (amount !== "") {
      defineNumberofFields(amount, type);
      const ending = getEnding(amount, type);
      const header = document.createElement("p");
      let container = document.querySelector('[data-type="' + type + '"]');
      header.innerHTML = amount + " " + picsPaths[type].header + ending;
      container.after(header);
    }
  }
}

function selectRandom(array) {
  return Math.floor(Math.random() * array.length);
}

function defineNumberofFields(amount, type) {
  if (picsPaths.hasOwnProperty(type)) {
    const maxNumber = picsPaths[type].items;
    if (amount <= maxNumber) {
      populate(amount, type, picsPaths[type].picture);
    } else if ((amount / maxNumber) % 1 == 0) {
      const fullFields = Math.floor(amount / maxNumber);
      for (let i = 1; i <= fullFields; i++) {
        populate(maxNumber, type, picsPaths[type].picture);
      }
    } else {
      const fullFields = Math.floor(amount / maxNumber);
      let restItems = amount - maxNumber * fullFields;
      for (let i = 1; i <= fullFields; i++) {
        populate(maxNumber, type, picsPaths[type].picture);
      }
      populate(restItems, type, picsPaths[type].picture);
    }
  } else {
    throw new Error("invalid type");
  }
}

window.onload = function () {
  const button = document.getElementById("generate-button");
  button.addEventListener("click", generate);
  document.getElementById("download-button").onclick = function () {
    window.print();
  };
};
