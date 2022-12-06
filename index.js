const tarefa = document.getElementById('tarefa')
const button = document.getElementById('criaTarefa')

const listaTarefas = document.getElementById('lista-tarefas')
listaTarefas.style.display = 'flex'
listaTarefas.style.flexDirection = 'column'
listaTarefas.style.gap = '10px'
listaTarefas.style.height = '100%'

const div = document.createElement('div')
div.style.display =  'flex'
div.style.flexDirection = 'row'
div.style.justifyContent = 'space-between'
div.style.alignItems = 'center'
div.style.width = '95%'
div.style.height = '72px'
div.style.border = 'solid 2px #f1f1'
div.style.borderRadius = '24px'
div.style.backgroundColor = '#ffffffff'
div.style.padding = '2%'

div.setAttribute('id', 'tarefa-listada')

const svg = document.createElement('svg')
svg.innerHTML = '<svg width="24" height="24" viewBox= 0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" /><path d="M14.563 9.75C12.9927 11.1342 11.8114 12.9047 11.136 14.886L9 12.75" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
svg.style.cursor = 'pointer'
svg.style.width = '4%'
svg.style.height = '32%'
svg.style.border = 'solid'
svg.style.borderRadius = '50%'

svg.setAttribute('class', 'verificar')

const novaTarefa = document.createElement('p')
novaTarefa.style.display = 'flex'
novaTarefa.style.justifyContent = 'center'
novaTarefa.style.fontSize = '16px'
novaTarefa.style.fontWeight = '700'
novaTarefa.style.height = '24px'
novaTarefa.style.width = '181px'

const excluir = document.createElement('svg')
excluir.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#FF497D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' 
excluir.style.cursor = 'pointer'
excluir.style.width = '10%'
excluir.style.height = '50%'

excluir.setAttribute('class', 'deletar')

// função no botão para inserir tarefas na lista
 button.onclick = function() {
    
    listaTarefas.innerHTML += ''
    
    div.style.color = '#18161F'
    div.style.border = 'none'
    svg.style.color = '#18161F'
    novaTarefa.style.color = '#18161F'
    
    novaTarefa.innerText = tarefa.value
    div.appendChild(svg)
    div.appendChild(novaTarefa)
    div.appendChild(excluir)
    listaTarefas.appendChild(div)
    
    tarefa.value = ''
    tarefa.focus()

    funcionaLista()
}

//recupera no localStorage os elementos html
if(window.location.reload){
    // alert("recarregou")
    listaTarefas.innerHTML = JSON.parse(localStorage.getItem('listanova'))
    funcionaLista()
    tarefa.focus()
}

//função que da funcionalidade aos itens da lista
function funcionaLista(){

    const verificar = document.getElementsByClassName('verificar')
    const arraySVG = []
    
    for(let i=0; i<verificar.length; i++){
        arraySVG.push(verificar.item(i))
    }
    
    for(let i=0; i<arraySVG.length; i++){
        arraySVG[i].onclick = function(){
            const filho = arraySVG[i]
            const pai = filho.parentElement
            const filhoTarefa = pai.children[1]
            if(filho.parentElement === pai){
                if(filho.style.color === 'rgb(2, 181, 83)'){
                    filho.style.color = '#18161F'
                    filhoTarefa.style.color = '#18161F'
                    pai.style.border = 'none'
                    salvaStorage()
                }
                else{
                    filho.style.color = '#02B553'
                    filhoTarefa.style.color = '#02B553'
                    pai.style.border = 'solid 2px #02b553'
                    salvaStorage()
                }
            }
        }
    }

    const deletar = document.getElementsByClassName('deletar')
    const arrayDeletar = []

    for(let i=0; i<deletar.length; i++){
        arrayDeletar.push(deletar.item(i))
    }

    for(let i=0; i<arrayDeletar.length; i++){
        arrayDeletar[i].onclick = function(){
            const filho = arrayDeletar[i]
            const pai = filho.parentElement
            pai.parentNode.removeChild(pai)
            salvaStorage()
        }
    }

    salvaStorage()
}

//função que salva os elementos no localStorage
function salvaStorage(){
    localStorage.clear()
    localStorage.setItem('listanova', JSON.stringify(listaTarefas.innerHTML))
}