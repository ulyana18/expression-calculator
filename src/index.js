function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace( /\s/g, '');
    let number = '';
    let out = [];
    let stack = [];
    let i = 0;

    checkBrackets(expr);
    for(symbol of expr) {
        i++;
        if(symbol === '(' || symbol === '+' || symbol === '-' || symbol === '*' || symbol === '/') {
            (number !== '')? out.push(+number) : 0;
            number = '';
            let priority = getPriority(symbol);
            if(stack[0] !== undefined && symbol !== '(' && priority <= getPriority(stack[stack.length-1])) {
                out.push(stack.pop());
            }
            checkZero(symbol, expr);
            stack.push(symbol);
        } else {
            if(symbol === ')') {
                (number !== '')? out.push(+number) : 0;
                number = '';
                let stackSymbol = stack.pop();
                while(stackSymbol !== '(') {
                    out.push(stackSymbol);
                    stackSymbol = stack.pop();
                }
            } else {
                number += symbol;
            }
        }
    }

    if(number !== '') out.push(+number);
    while(stack[0] !== undefined) out.push(stack.pop());    
    let result = [];
    for(symbol of out) {
        if(symbol === '+' || symbol === '-' || symbol === '*' || symbol === '/') {
            switch(symbol) {
                case '+': 
                    result.push(result.pop()+result.pop());
                    break;
                case '-': 
                    result.push(-result.pop()+result.pop());
                    break;
                case '*': 
                    result.push(result.pop()*result.pop());
                    break;
                case '/': 
                    result.push(1/result.pop()*result.pop());
                    break;
            }
        }
        else {
            result.push(symbol);
        }
    }

    return result = result[0];

    function checkBrackets (expr) {
        let open = 0;
        let close = 0;
        for(symbol of expr) {
            (symbol === '(')? open++ : 0;
            (symbol === ')')? close++ : 0;
        }
        if(open !== close) {
            throw new Error('ExpressionError: Brackets must be paired');
        }
    }

    function checkZero (symbol, out) {
        if(symbol === '/' &&  expr[i] === '0') {
            throw new Error('TypeError: Division by zero.');
        }
    }

    function getPriority (symbol) {
        switch(symbol) {
            case '(': return 0;
            case '+': return 1;
            case '-': return 1;
            case '*': return 2;
            case '/': return 2;
        }
    }
}

module.exports = {
    expressionCalculator
}