//states are:
//newnum
//adding
//subtracting
//multiplying
//dividing
//answered
let state = "newnum";

(function() {
    "use strict";

    function getDisplay() {
        return document.getElementById("displaytext");
    }

    function addNum(btn) {
        let display = getDisplay();
        if (display.innerText == "0" || state == "answered") {
            //if the displayed number is just zero, overwrite it,
            //  instead of adding. This prevents leading zeroes.
            display.innerText = btn.innerText;
            if (state == "answered") {
                state = "newnum";
            }
        } else {
            display.innerText += btn.innerText;
        }
    }

    function clearContent() {
        getDisplay().innerText = "0";
    }

    function resetStep() {
        document.getElementById("firstnum").innerText = getDisplay().innerText;
        clearContent();
    }

    function subtract() {
        resetStep();
        state = "subtracting";
    }

    function multiply() {
        resetStep();
        state = "multiplying";
    }

    function divide() {
        resetStep();
        state = "dividing";
    }

    function addDecimal() {
        let display = getDisplay();
        if (!(display.innerText.includes(".") || state == "answered")) {
            display.innerText += ".";
        }
    }

    function addEquals() {
        let display = getDisplay();
        let firstnum = parseFloat(document.getElementById("firstnum").innerText);
        let currentnum = parseFloat(display.innerText);
        if (state == "newnum" || state == "answered") {
            resetStep();
            state = "adding";
        } else {
            if (state == "subtracting") {
                display.innerText = firstnum - currentnum;
            } else if (state == "adding") {
                display.innerText = firstnum + currentnum;
            } else if (state == "dividing") {
                //perform no special operations when dividing by zero
                // just let the browser handle it.
                display.innerText = firstnum / currentnum;
            } else if (state == "multiplying") {
                display.innerText = firstnum * currentnum;
            }
            state = "answered";
            //number is trimmed to five decimal places
            // excessively large numbers are shown in scientific notation
            display.innerText = Math.round(display.innerText * 100000) / 100000;
        }
    }

    function assignClickFunction(string, func) {
        let clearbtn = document.getElementById(string);
        clearbtn.addEventListener("click", func);
    }

    function init() {
        let btns = Array.from(document.getElementsByClassName("numbutton"));
        btns.forEach((btn) => {
            //looping the add_num function in another anonymous function here
            //  so that I can pass in arguments
            btn.addEventListener("click", () => { addNum(btn) });
        });

        assignClickFunction("clearbutton", clearContent);
        assignClickFunction("subtractbutton", subtract);
        assignClickFunction("multiplybutton", multiply);
        assignClickFunction("dividebutton", divide);
        assignClickFunction("decimalbutton", addDecimal);
        assignClickFunction("addequalsbutton", addEquals);
    }

    window.addEventListener("load", init, false);
})();