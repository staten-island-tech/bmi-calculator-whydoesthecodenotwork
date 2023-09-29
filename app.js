const classifications = {
  1: { min: 0, result: "underweight" },
  2: { min: 18.5, result: "healthy weight" },
  3: { min: 25, result: "overweight" },
  3: { min: 30, result: "obese" },
};

function go() {
  const User = {
    name: document.getElementsByName("name")[0].value,
    height: document.getElementsByName("height")[0].value,
    weight: document.getElementsByName("weight")[0].value,
  };
  if ((User.height > 0) & (User.weight > 0)) {
    output = User.weight / (User.height / 100) ** 2;
    document.getElementById("bmi").innerHTML =
      "your bmi is " + Math.round(output * 10) / 10;
    for (const key in classifications) {
      if (classifications.hasOwnProperty(key)) {
        let value = classifications[key];
        if (output > value.min) {
          result = value.result;
        } else {
          break;
        }
      }
    }
    document.getElementById("class").innerHTML =
      User.name + ", i diagnose you with " + result;
  } else {
    document.getElementById("bmi").innerHTML = "💀";
    document.getElementById("class").innerHTML =
      User.name + ", I'm afraid you don't exist";
  }
}
