// adicionar onclick no botão de cadastrament
// a função vai pegar os valores do input e do select
function cadastrarDespesas() {
    
    let ano = document.getElementById("ano")
    let mes = document.getElementById("mes")
    let dia = document.getElementById("dia")
    let tipo = document.getElementById("tipo")
    let descricao = document.getElementById("descricao")
    let valor = document.getElementById("valor")

    console.log(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

}