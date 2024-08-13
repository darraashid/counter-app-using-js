const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay= document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn= document.querySelector("[copy-btn]");
const copyMsg = document.querySelector(".data-copyMsg");
const uppercaseCheck= document.querySelector("#uppercase");
const lowercaseCheck= document.querySelector("#lowercase");
const numbersCheck= document.querySelector("#numbers");
const symbolsCheck= document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-button");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");
const symbols= '~!@#$%^&*()_+=}]{[":?/>.<,'  ;

let password = "";
let passwordLength=10;
let checkCount=0;
setIndicator("#ccc")
// set color of strength as grey

// password length
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}
handleSlider();

// set indicator color
function setIndicator(color){
    indicator.style.backgroundColor=color;
    // shadow
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;

}

// shuffle password
function shufflePassword(array){
     //Fisher Yates Method
     for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
 
}

// get random integer between min and max
function getRdmInteger(min, max){
    return Math.floor(Math.random() * (max-min)) + min;
};

// get random number
function getRdmNumber(){
   return  getRdmInteger(0,9);
}
// get random uppercase
function getRdmUpperCase() {
  return   String.fromCharCode( getRdmInteger(65, 90));
}
//    string.fromharcode will convert the ascii value to the alphabetical value.

// get random uppercase
function getRdmLowerCase() {
   return String.fromCharCode( getRdmInteger(97, 122));

}

// get random symbol
function getSymbols(){
    const randSym = getRdmInteger(0, symbols.length);
    return symbols.charAt(randSym);
}

// calculate strength
function calcStrength(){
let hasUpper=false;
let hasLower=false;
let hasNumber=false;
let hasSymbol=false;

if(uppercaseCheck.checked) hasUpper=true;
if(lowercaseCheck.checked) hasLower=true;
if(numbersCheck.checked) hasNumber=true;
if(symbolsCheck.checked) hasSymbol=true;

if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength>=8){
    setIndicator("#0f0")
    console.log('strong password')
}
else if((hasUpper || hasLower) && (hasNumber || hasSymbol) &&passwordLength>=6){
    setIndicator("#ff0")
    console.log(`medium password`)
}
else {
    setIndicator("#f00");
    console.log(`weak password`)
}
}

// copy password to clipboard

async function copyContent(){
    try{

    

await navigator.clipboard.writeText(passwordDisplay.value)
copyMsg.innerText="copied";
}

catch(e){
    copyMsg.innerText="failed"
}



// to make copied msg visible
copyMsg.classList.add("active")

// to make copy message invisible after two seconds
setTimeout(() => {
    copyMsg.classList.remove("active")} ,2000);

}

// handle checkbox count
function handleCheckCount(){
    checkCount=0;
    allCheckbox.forEach( (checkbox) => {
    if(checkbox.checked)
    checkCount++;
})
}

allCheckbox.forEach( (checkbox) => {
    checkbox.addEventListener('change' , handleCheckCount) }
)

// special condition
if(passwordLength < checkCount){

 passwordLength=checkCount;
 handleSlider();
}   


inputSlider.addEventListener('input' , (e) => {
    passwordLength=e.target.value;
    handleSlider();
}
)


copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})

console.log(`everything other than generate button successfully worked`)
generateBtn.addEventListener('click' , () => {
    // none of the checkbox are selected
    if(checkCount == 0){
         return;
        console.log(`checkcount 0`); }
if(passwordLength < checkCount) {
    passwordLength= checkCount;
    handleSlider();
}
// let's start the journey to find new password
// remove old password
password="";

// lets put the stuff mentioned by checkboxes
// if(uppercaseCheck.checked){
//     password += getRdmUpperCase();
// }
// if(lowercaseCheck){
//     password += getRdmLowerCase();
// }
// if(numbersCheck.checked){
//     password += getRdmNumber();
// }
// if(symbolsCheck.checked){
//     password += getSymbols();
// }
let funcArr = [];
if(uppercaseCheck.checked) 
funcArr.push(getRdmUpperCase);
if(lowercaseCheck.checked)
    funcArr.push(getRdmLowerCase);
if(numbersCheck.checked) 
    funcArr.push(getRdmNumber);
if(symbolsCheck.checked)
    funcArr.push(getSymbols);

// compulsory addition
for(let i=0; i<funcArr.length;i++ ){
    password += funcArr[i]();
}
console.log(`compulsory addition done`)
// remaining addition
for(let i=0; i<passwordLength-funcArr.length; i++){
    let randIndex = getRdmInteger(0, funcArr.length);
    password += funcArr[randIndex]();
}
console.log(`remaining addition done`)
// shuffle passwword

password = shufflePassword(Array.from(password));

// show in UI
passwordDisplay.value=password;
// calculate strength
calcStrength();
  



});