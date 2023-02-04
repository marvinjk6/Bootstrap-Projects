
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        // i são os atributos, this[i] são os valores, i é o índice
        // se algum desses atributos tiverem null, vazio ou undefined como valor o método retorna false
        for(let i in this) {
            if(this[i] == undefined || this[i] == "" || this[i] == null) {
                return false
            } 
        } 
        return true
    }
}

class Bd {

    constructor() {
        // primeiro assim que bd é criado ele vai tentar pegar um id em local storage, se ele não encontrar vai setar id como zero
        let id = localStorage.getItem('id')
        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        // esse método retorna o próximo id, buscando o id já existente em local storage somando mais um
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(despesa) {

        // atribuindo o próximoId a id
        let id = this.getProximoId()

        // armazenando o valor de despesa tendo como identificação o valor gerado por getPróximoId
        localStorage.setItem(id, JSON.stringify(despesa))
        
        // armazenado a identificação id com o valor de getProximoId 
        localStorage.setItem('id', id)
          
    }
}

let bd = new Bd()

function cadastrarDespesas() {
    
    let ano = document.getElementById("ano")
    let mes = document.getElementById("mes")
    let dia = document.getElementById("dia")
    let tipo = document.getElementById("tipo")
    let descricao = document.getElementById("descricao")
    let valor = document.getElementById("valor")

    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value,
        valor.value)

    // executar o método gravar de Bd somente se a validação for bem sucedida
    if(despesa.validarDados()) {
        // se retornar true gravar
        // bd.gravar(despesa)
        console.log('Dados válidos')
    } else {
        console.log('Dados inválidos')
    } 

}

