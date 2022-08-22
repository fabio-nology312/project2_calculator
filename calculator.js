// creating variable for values and keys

var fkey = "0";
var val = 0;
var pval = 0;
var operator = "+";
var prev_kt = "0";
var kdot = false;
var sw = true;
var dec = 1;


//toggle theme if the Theme2  button is
//when the button is clicked, the theme2.css file loads
//on second click it loads the calculator.css file
function themeSwitch_2() {
  let theme = document.getElementById("stylesheet");
  if (
    theme.getAttribute("href") == "calculator.css" ||
    theme.getAttribute("href") == "theme_1.css" ||
    theme.getAttribute("href") == "theme_3.css"
  ) {
    theme.href = "theme_2.css";
  } else {
    theme.href = "calculator.css";
  }
}


//getkey checks for the key type and takes the specified action
function getkey(ktype, id) {
  //ktype is the key type, either a function key or a number key
  if (ktype === "fk") {
    // fk is function key
    //fk represents operators +,-,*,/
    let k = document.getElementById(id).innerHTML;
    //checks if there was a previous number when dot(.) is pressed
    if (k === "∙" && kdot === false) {
      val = val + ".";
      prev_kt = "nk";
      kdot = true;
    } else {
      kdot = false;
      prev_kt = "fk";
      setkey("fk", k);
    }
  } else {
    let k = document.getElementById(id).innerHTML;
    if (prev_kt === "nk" && kdot === false) {
      k = val + k;
      k = parseFloat(k);
    }
    if (prev_kt === "nk" && kdot === true) {
      k = val + k;
    }
    setkey("nk", k); // nk is number key
    prev_kt = "nk";
  }
}

//sets the value to be displayed on the screen
//also sets the operator to be displayed
//when no operator is selected, the ` is the default
function setkey(ktype, key) {
  let result = 0;
  //when a number is selected it displays on the screen
  if (ktype === "nk") {
    val = key;
    document.getElementById("screen").innerHTML = key; //DOM, returns the html content 
  }
  //when any operator is selected it performs the operation
  //it performs the operation with number previous entered
  else {
    if (key === "=") {
      if (operator === "+") {
        //pval is the previous number entered and these are the main operators
        result = pval + parseFloat(document.getElementById("screen").innerHTML); //parses and return a floating point number
        document.getElementById("screen").innerHTML = result;
      } else if (operator === "-") {
        result = pval - parseFloat(document.getElementById("screen").innerHTML);
        document.getElementById("screen").innerHTML = result;
      } else if (operator === "x") {
        result = pval * parseFloat(document.getElementById("screen").innerHTML);
        document.getElementById("screen").innerHTML = result;
      } else if (operator === "÷") {
        result = pval / parseFloat(document.getElementById("screen").innerHTML);
        document.getElementById("screen").innerHTML = result;
      } else if (operator === "xⁿ") {
        result = parseInt(document.getElementById("screen").innerHTML);
        result = Math.pow(pval, result);  //returns base to the exponent power
        document.getElementById("screen").innerHTML = result;
      }
      kdot = false;
      document.getElementById("operator").innerHTML = "`";
    } else if (key == "√") {
      document.getElementById("operator").innerHTML = key;
      result = parseFloat(document.getElementById("screen").innerHTML);
      result = Math.sqrt(result);  // returns square root
      document.getElementById("screen").innerHTML = result;
      kdot = false;
      document.getElementById("operator").innerHTML = "`";
    } else if (key == "x²") {
      result = parseFloat(document.getElementById("screen").innerHTML);
      result = Math.pow(result, 2);
      document.getElementById("screen").innerHTML = result;
      kdot = false;
      document.getElementById("operator").innerHTML = "`";
    } else if (key == "xⁿ") {
      pval = parseInt(document.getElementById("screen").innerHTML); 
      operator = key;
      document.getElementById("operator").innerHTML = key;
    }
    //"←" removes the last entered value
    else if (key == "←") {
      result = document.getElementById("screen").innerHTML;
      result = result.substr(0, result.length - 1);
      val = parseFloat(result);
      document.getElementById("screen").innerHTML = val;
      document.getElementById("operator").innerHTML = "`";
      prev_kt = "nk";


      //"C" clears the screen
    } else if (key == "C") {
      val = 0;
      document.getElementById("screen").innerHTML = 0;
      document.getElementById("operator").innerHTML = "`";
    } else if (key == "%") {
      result = parseFloat(document.getElementById("screen").innerHTML) / 100;
      document.getElementById("screen").innerHTML = result;
      kdot = false;
      document.getElementById("operator").innerHTML = "`";
    } else {
      operator = key;
      document.getElementById("operator").innerHTML = key;
      pval = parseFloat(document.getElementById("screen").innerHTML);
    }
  }
}
