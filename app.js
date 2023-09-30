const classifications = {
  1: { min: 0, result: "underweight" },
  2: { min: 18.5, result: "healthy weight" },
  3: { min: 25, result: "overweight" },
  4: { min: 30, result: "obese" },
};

function calculateBMI(user) {
  return user.weight / (user.height / 100) ** 2;
}

function getResult(bmi) {
  // classify user weight
  for (const key in classifications) {
    if (classifications.hasOwnProperty(key)) {
      let value = classifications[key];
      if (bmi >= value.min) {
        result = key;
      } else {
        // when this breaks, the result will be the last range that the user's bmi was in
        break;
      }
    }
  }
  return result;
}

function go() {
  // create user object
  const User = {
    name: document.getElementsByName("name")[0].value,
    height: document.getElementsByName("height")[0].value,
    weight: document.getElementsByName("weight")[0].value,
  };

  // do everything else
  if ((User.height > 0) & (User.weight > 0)) {
    bmi = calculateBMI(User);

    // update the text
    document.getElementById("bmi").innerHTML =
      "your bmi is <b>" + Math.round(bmi * 10) / 10 + "</b>";

    // diagnose the user

    bmiclass = getResult(bmi);
    document.getElementById("class").innerHTML =
      User.name + ", i diagnose you with " + classifications[bmiclass].result;

    document.getElementById("bar").style.display = "block";
    document.getElementById("classbar").min = classifications[bmiclass].min;
    if (bmiclass < Object.keys(classifications).length) {
      document.getElementById("classbar").max =
        classifications[(parseInt(bmiclass) + 1).toString()].min;
      document.getElementById("low").innerHTML =
        classifications[bmiclass].result +
        "<br />" +
        classifications[bmiclass].min;
      document.getElementById("high").innerHTML =
        classifications[(parseInt(bmiclass) + 1).toString()].result +
        "<br />" +
        classifications[(parseInt(bmiclass) + 1).toString()].min;
      document.getElementById("classbar").value = bmi;
      document.getElementById("classbar").classList.remove("isnotgood");
    } else {
      document.getElementById("classbar").max = 100;
      document.getElementById("classbar").value = 100;
      document.getElementById("classbar").classList.add("isnotgood");
      document.getElementById("low").innerHTML =
        classifications[Object.keys(classifications).length].result +
        "<br />" +
        classifications[Object.keys(classifications).length].min;
      document.getElementById("high").innerHTML = "???";
    }
  } else {
    document.getElementById("bmi").innerHTML = "💀";
    document.getElementById("class").innerHTML =
      User.name + ", I'm afraid you don't exist";
    document.getElementById("bar").style.display = "none";
  }

  document.getElementById("results").classList.add("show");
}
