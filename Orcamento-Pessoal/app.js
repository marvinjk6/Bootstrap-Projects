
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

    recuperarRegistros() {

        let id = localStorage.getItem('id')
        let despesas = []
        // loop para pegar as despesa
        for(let i = 1; i <= id; i++) {

            // inserir os objetos dentro de um array
            let despesa = JSON.parse(localStorage.getItem(i))

            // possibilidade de haver indices que foram pulados/removidos
            // nesse caso pular esses indices
            if(despesa === null) {
                continue
            }
            despesas.push(despesa)      
        }

        return despesas
    }

    pesquisar(despesa) {
        console.log(despesa)
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
        bd.gravar(despesa)
        $('#modalRegistraDespesa').modal('show')
        document.getElementById('modal_titulo').innerHTML = 'Os dados foram salvos'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementsByClassName('modal-body')[0].innerHTML = 'Despesa Registrada com sucesso'
        let botaoVoltar = document.getElementById('voltar')
        botaoVoltar.innerHTML = 'voltar'
        botaoVoltar.className = 'btn btn-success'

        // limpar os campos se a despesa for armazenada
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = '' 
        valor.value = ''
        
    } else {
        $('#modalRegistraDespesa').modal('show')
        document.getElementById('modal_titulo').innerHTML = 'Os dados não foram salvos'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementsByClassName('modal-body')[0].innerHTML = 'Por favor, preencha todos os campos'
        let botaoVoltar = document.getElementById('voltar')
        botaoVoltar.innerHTML = 'Voltar e corrigir'
        botaoVoltar.className = 'btn btn-danger'
    
    } 

}


function carregaListaDespesa() {

    let despesas = []
    // recuperaRegistros cria e retorna um array de despesas, que será atribuido a variavel despesas 
    despesas = bd.recuperarRegistros()

    let listaDespesas = document.getElementById('listaDespesas')

    /*
    <tr>
       0= <td>Data</td>
       1= <td>Tipo</td>
       2= <td>Descrição</td>
       3= <td>Valor</td>      
    </tr>
    */

    despesas.forEach(d => {

        //criando a linha (tr)
        let linha = listaDespesas.insertRow()

        // criar as colunas
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`  

        // ajustar o tipo que é uma string, switch faz comparação por identico
        switch(d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo

        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        
    })
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
    
    bd.pesquisar(despesa)
}

