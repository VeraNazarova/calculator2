//переменные, хранящие знаки и операнды
let operand2=0;
let operand1=0;
let sign = "";
let last_operation ="";

//Цифры
const nums = document.querySelectorAll(".num");

//Дисплеи
const display = document.querySelector(".my_display");
const cash_display = document.querySelector(".cash_display");
const full_display = document.querySelector("full_display");

//Переполнение экрана
const no_overflow = () => {
    if ( display.textContent.length < 15 )
        return true;
    else
        return false;
}

//события для цифр
for(let num of nums)
{
    num.addEventListener("click", () => {
        isErrorOnDisplay ();

        if (display.textContent=="0")
                display.textContent = num.textContent;
        else if (last_operation != "=") {
            if ( no_overflow () )
                display.textContent += num.textContent;
        }
    })
}

//разделитель целой и вещественной части
const separator = document.getElementById("separator");

//событие нажатия разделителя целой и вещественной части
separator.addEventListener("click", () => {
    if( !isSeparaterOnDisplay() )
        display.textContent += separator.textContent;
})

//Проверяет была ли нажата точка-разделитель
const isSeparaterOnDisplay = () => {
    if( display.textContent.indexOf(".") !=-1 )
        return true;
    else 
        return false;
}

//Кнопка сброса
const reset = document.getElementById("reset");

//событие сброса
reset.addEventListener("click", () => {
    clearAll ();
})

//Очистка всех дисплеев
function clearAll ()
{
    display.textContent = 0;
    cash_display.textContent = '';
    operand2=0;
    operand1=0;
    sign = "";
    last_operation ="C";
}

const isErrorOnDisplay = () => {
    if (display.textContent=='error')
        clearAll ();
}

//массив операторов
const operators = document.querySelectorAll(".action");

//событие нажата кнопка оператора
for (let operator of operators)
{
    operator.addEventListener("click", () => {

        last_operation = operator.textContent;

        isErrorOnDisplay ();

        if (cash_display.textContent == '')
            write_first_operand (operator);
        else
        {
            write_second_operand();
            write_first_operand (operator);
        }
    })
}

//Инициализация первого операнда и оператора
const write_first_operand = (operator) => {
    operand1 = display.textContent;
    cash_display.textContent = operand1 + operator.textContent;
    sign = operator.textContent;
    display.textContent = 0;
}

//Инициализация второго операнда
const write_second_operand = () => {
    operand2 = display.textContent;
    cash_display.textContent='';
    display.textContent = arithmetic_operations(operand1, sign, operand2);
} 

//арифметические операции 
function arithmetic_operations(first, sign, second) {
    switch(sign) {
        case "+" : 
            return +first+Number(second);
        case "-" : 
            return +first-second;
        case "/":
            {
                if (+second==0){
                    return "error";
                }
                return +first/second;
            }
        case "*":
            return +first*second;
    }
}

//Кнопка равенство
const result = document.getElementById('result');

//событие нажата кнопка "="
result.addEventListener("click", () => {

    if ( !cash_display.textContent == '' )
    {
        last_operation = result.textContent;
        write_second_operand();
        last_operation = "=";
    }
})

//очистка дисплея ввода
const clear_last = document.getElementById("clear_last");

clear_last.addEventListener("click", () => {
    if (display.textContent.length > 1)
        display.textContent = display.textContent.slice(0, -1);
    else
        display.textContent = '0'; 
})
