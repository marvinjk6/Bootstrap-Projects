
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
        let id = localStorage.getItem('id')
        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(despesa) {

        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(despesa))
        
        localStorage.setItem('id', id)
          
    }

    recuperarRegistros() {

        let id = localStorage.getItem('id')
        let despesas = []
        for(let i = 1; i <= id; i++) {

            let despesa = JSON.parse(localStorage.getItem(i))

            if(despesa === null) {
                continue
            }

            despesa.id = i
            despesas.push(despesa)   
        }

        console.log(despesas)   
        return despesas
    }

    pesquisar(despesa) {

        let despesasFiltradas = []

        console.log(despesasFiltradas)

        despesasFiltradas = this.recuperarRegistros()

        if(despesa.ano != '') {
            console.log('Filtro do ano')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        if(despesa.mes != '') {
            console.log('Filtro do mês')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        if(despesa.dia != '') {
            console.log('Filtro do dia')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        if(despesa.tipo != '') {
            console.log('Filtro do tipo')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        if(despesa.descricao != '') {
            console.log('Filtro do descricao')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
    
        if(despesa.valor != '') {
            console.log('Filtro do valor')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }
        return despesasFiltradas
    }

    remover(id) {
        localStorage.removeItem(id)
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

    if(despesa.validarDados()) {
        bd.gravar(despesa)
        $('#modalRegistraDespesa').modal('show')
        document.getElementById('modal_titulo').innerHTML = 'Os dados foram salvos'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementsByClassName('modal-body')[0].innerHTML = 'Despesa Registrada com sucesso'
        let botaoVoltar = document.getElementById('voltar')
        botaoVoltar.innerHTML = 'voltar'
        botaoVoltar.className = 'btn btn-success'

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


function carregaListaDespesa(despesas = [], filtro = false) {

    if(despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarRegistros()
    }
    

    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    despesas.forEach(d => {

        //criando a linha (tr)
        let linha = listaDespesas.insertRow()

        // criar as colunas
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`  

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


        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function(){
            let id = this.id.replace('id_despesa_', '')
            bd.remover(id)

            window.location.reload()
        }
        linha.insertCell(4).append(btn)
        
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
    
    let despesas = bd.pesquisar(despesa)

    carregaListaDespesa(despesas, true)

}

