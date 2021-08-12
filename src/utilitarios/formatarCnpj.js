function formatarCnpj(num){
    let novoCnpj = '';
    for(let item of num){
        if(item != "." && item != "/" && item != "-"){
            novoCnpj += item;
            console.log(novoCnpj);
        }
    }

    return novoCnpj;
}

module.exports = formatarCnpj;