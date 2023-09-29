document.getElementById("results").style.display = "none";

const classifications = {
  1: { min: 0, result: "underweight" },
  2: { min: 18.5, result: "healthy weight" },
  3: { min: 25, result: "overweight" },
  3: { min: 30, result: "obese" },
};

function calculateBMI(user) {
  return user.weight / (user.height / 100) ** 2;
}

function getResult(bmi) {
  // classify user weight
  for (const key in classifications) {
    if (classifications.hasOwnProperty(key)) {
      let value = classifications[key];
      if (bmi > value.min) {
        result = value.result;
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
    document.getElementById("class").innerHTML =
      User.name + ", i diagnose you with " + getResult(bmi);
  } else {
    document.getElementById("bmi").innerHTML = "💀";
    document.getElementById("class").innerHTML =
      User.name + ", I'm afraid you don't exist";
  }

  document.getElementById("results").style.display = "flex";
  document.getElementById("results").style.animation = "appear";
}
