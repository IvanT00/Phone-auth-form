

function formatCode (code: string):string{
    let digits = code.replace(/\D/g, '');
    if(digits.length < 6){
        return 'Код должен содержать 6 цифр'
    }
    if(digits.length === 6){
        return digits;
    }
}

export default formatCode;