window.onload = () => {
   addEventListenerForAllNumbers();
   addEventListenerForOperators();
   displayOnOff();
};

//ПОЛУЧЕНИЕ DOM ЭЛЕМЕНТОВ//

let el = function (element) { //Получаю объект и нодлист со всеми элементами со страницы
   return document.querySelectorAll(element);
};

//НАЗНАЧЕНИЕ ПЕРЕМЕННЫХ//
let output = el(".output")[0],
   equal = el(".equal")[0],
   nums = el(".num"), 
   opers = el(".oper"),
   clear = el(".clear")[0],
   ////
   firstNum = "",
   correntNum = "",
   resultNum = " ",
   ////
   display = el('.b-grid-box')[0],
   power = el('.button-power')[0];

/////


////button POWER////

power.addEventListener("click", displayOnOff);
power.addEventListener("click", clearAllVariables);


function displayOnOff() {//гасим/включаем экран
   if (display.style.visibility == 'hidden') {
      display.style.visibility = 'visible';
   } else {
      display.style.visibility = 'hidden';
   }
};

/////





////Calculator////
clear.addEventListener("click", clearAllVariables);
equal.addEventListener("click", clickToEqual);



//нажатие кнопки с цифрой//
let setNum = function () {
   if (resultNum) {
      correntNum = this.getAttribute("value");
      resultNum = "";
   }

   else if (correntNum.length < 6) {
      correntNum += this.getAttribute("value");
   }

   output.innerHTML = correntNum; // Вывод value для нажатой кнопки
};

//нажатие знака операции
let moveNum = function () {
   if (firstNum.length && correntNum.length > 0) {
      calculation();
   }
   if (correntNum.length !== 0, firstNum.length < 1) {//основная ветка
      firstNum = correntNum;
      correntNum = "";
      operator = this.getAttribute("value");
   }
   if (typeof resultNum === 'number') {
      firstNum = resultNum;
      resultNum = "";
      firstNum = String(firstNum);
      output.innerHTML = firstNum;
   }
};

function clickToEqual() {
   if (firstNum.length && correntNum.length > 0) {
      calculation();
   }
   else {
      clearAllVariables();
   }
};

function calculation() {
   firstNum = parseFloat(firstNum);//Строку в числа//
   correntNum = parseFloat(correntNum);

   switch (operator) {
      case "+":
         resultNum = firstNum + correntNum;
         break;

      case "-":
         resultNum = firstNum - correntNum;
         break;

      case "*":
         resultNum = firstNum * correntNum;
         break;

      case "/":
         resultNum = firstNum / correntNum;
         break;

      default:
         resultNum = correntNum;
   }

   output.innerHTML = resultNum;

   equal.setAttribute("value", resultNum);
   firstNum = "";
   correntNum = "";
};

function clearAllVariables() {
   firstNum = "";
   correntNum = "";
   output.innerHTML = "";
   equal.setAttribute("value", resultNum);
};

function addEventListenerForAllNumbers() {
   for (var i = 0, l = nums.length; i < l; i++) {//вешаю слушателя на каждую кнопку цифр
      nums[i].onclick = setNum;//нажатую кнопку записываю в setNum
   }
}

function addEventListenerForOperators() {
   for (var i = 0, l = opers.length; i < l; i++) {
      opers[i].onclick = moveNum;
   }
};
