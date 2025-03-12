document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.querySelector(".input input");
  const buttons = document.querySelectorAll(".buttons button");

  let currentInput = "";
  const operators = ["+", "-", "*", "/", "%"];

  // Safe calculation using eval with sanitization
  function calculateExpression(expression) {
    try {
      expression = expression.replace(/[\+\-\*\/%]+$/, ""); // Remove trailing operators
      return eval(expression);
    } catch {
      return "Error";
    }
  }

  // Handle button click
  function handleButtonClick(value) {
    if (value === "C") {
      currentInput = "";
    } else if (value === "X") {
      currentInput = currentInput.slice(0, -1);
    } else if (value === "=") {
      currentInput = calculateExpression(currentInput).toString();
    } else if (value === ".") {
      // Prevent multiple dots in the same number
      let lastNumber = currentInput.split(/[\+\-\*\/%]/).pop();
      if (lastNumber.includes(".")) return;
      currentInput += value;
    } else {
      // Prevent multiple consecutive operators
      if (
        operators.includes(value) &&
        operators.includes(currentInput.slice(-1))
      ) {
        return;
      }
      currentInput += value;
    }

    updateDisplay();
  }

  // Update display function
  function updateDisplay() {
    inputField.value = currentInput || "0";
  }

  // Attach event listeners to buttons
  buttons.forEach((button) => {
    button.addEventListener("click", () =>
      handleButtonClick(button.textContent)
    );
  });

  // Handle keyboard input
  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if ("0123456789".includes(key)) {
      currentInput += key;
    } else if (key === ".") {
      let lastNumber = currentInput.split(/[\+\-\*\/%]/).pop();
      if (lastNumber.includes(".")) return;
      currentInput += key;
    } else if (operators.includes(key)) {
      if (!operators.includes(currentInput.slice(-1))) {
        currentInput += key;
      }
    } else if (key === "Enter") {
      currentInput = calculateExpression(currentInput).toString();
    } else if (key === "Backspace") {
      currentInput = currentInput.slice(0, -1);
    } else if (key === "Escape") {
      currentInput = "";
    }

    updateDisplay();
  });

  // Initialize display
  updateDisplay();
});










// document.addEventListener("DOMContentLoaded", () => {
//     // Input field aur button select karna
//     const inputField = document.querySelector(".input input");
//     const buttons = document.querySelectorAll(".buttons button");

//     let currentInput = ""; // Yeh variable user ka input store karega
//     const operators = ["+", "-", "*", "/", "%"]; // Yeh valid operators ki list hai

//     // 📌 **Expression Calculate Karne Ka Function**
//     function calculateExpression(expression) {
//         try {
//             // Agar last me koi operator hai, to use hata do
//             expression = expression.replace(/[\+\-\*\/%]+$/, "");
//             return eval(expression); // Expression evaluate karo44
//         } catch {
//             return "Error"; // Agar error aayi to "Error" dikhaye
//         }
//     }

//     // 📌 **Button Click Handle Karne Ka Function**
//     function handleButtonClick(value) {
//         if (value === "C") {
//             currentInput = ""; // Sab kuch clear kar do
//         } else if (value === "X") {
//             currentInput = currentInput.slice(0, -1); // Last character delete karo
//         } else if (value === "=") {
//             currentInput = calculateExpression(currentInput).toString(); // Calculation karo
//         } else if (value === ".") {
//             // 🔹 Last number check karo ki usme pehle se '.' hai ya nahi
//             let lastNumber = currentInput.split(/[\+\-\*\/%]/).pop();
//             if (lastNumber.includes(".")) return; // Agar '.' hai to kuch mat karo
//             currentInput += value; // Naya '.' add karo
//         } else {
//             // 🔹 Agar last me already operator hai, to ek aur operator mat add karo
//             if (operators.includes(value) && operators.includes(currentInput.slice(-1))) {
//                 return;
//             }
//             currentInput += value; // Otherwise, value add kar do
//         }

//         updateDisplay(); // Display update karo
//     }

//     // 📌 **Display Update Karne Ka Function**
//     function updateDisplay() {
//         inputField.value = currentInput || "0"; // Agar input empty ho to "0" dikhaye
//     }

//     // 📌 **Sabhi Buttons Ko Event Listener Attach Karna**
//     buttons.forEach((button) => {
//         button.addEventListener("click", () => handleButtonClick(button.textContent));
//     });

//     // 📌 **Keyboard Input Handle Karna**
//     document.addEventListener("keydown", (event) => {
//         const key = event.key;

//         if ("0123456789".includes(key)) {
//             currentInput += key; // Number add karo
//         } else if (key === ".") {
//             let lastNumber = currentInput.split(/[\+\-\*\/%]/).pop();
//             if (lastNumber.includes(".")) return; // Agar '.' already hai to ignore karo
//             currentInput += key; // Otherwise, '.' add karo
//         } else if (operators.includes(key)) {
//             if (!operators.includes(currentInput.slice(-1))) {
//                 currentInput += key; // Agar last character bhi operator hai to add mat karo
//             }
//         } else if (key === "Enter") {
//             currentInput = calculateExpression(currentInput).toString(); // Calculation karo
//         } else if (key === "Backspace") {
//             currentInput = currentInput.slice(0, -1); // Last character delete karo
//         } else if (key === "Escape") {
//             currentInput = ""; // Sab kuch clear karo
//         }

//         updateDisplay(); // Display update karo
//     });

//     // 📌 **Initial Display Update**
//     updateDisplay();
// });
