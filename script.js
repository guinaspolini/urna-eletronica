let seuVotoPara = document.querySelector('.d1-1 span');
let cargo = document.querySelector('.d-1-2');
let descricao = document.querySelector('.d1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1_right');
let numeros = document.querySelector('.d1-3');

let etapaAtual = 0
let numero = ''
let votoBranco = false
let votos = [];

function comecarEtapa(){
    votoBranco = false
    let etapa = etapas[etapaAtual]
    
    let numeroHTML = ''
    numero = ''
    
    for (let i=0; i<etapa.numeros;i++){
        if( i === 0 ){
            numeroHTML += '<div class="numero pisca" ></div>'
        } else {
        numeroHTML += '<div class="numero"></div>'
    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML =' '
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHTML
    }
}

function atualizaInterface(){

    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){ 
            return true
        } else {
            return false
    
        }    
    })

    if(candidato.length > 0 ) {
        candidato = candidato[0]
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.Partido}`;
       
       let fotosHTML = ''

       for (let i in candidato.fotos){
           if(candidato.fotos[i].url.small){
            fotosHTML += `<div class="d-1-image small"><img src="${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`
           }else {
           fotosHTML += `<div class="d-1-image"><img src="${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`
       }
    }
       lateral.innerHTML = fotosHTML
    } else{
        seuVotoPara.style.display = 'block'

        aviso.style.display = 'block';

        descricao.innerHTML = `<div class="aviso-grande pisca">VOTO NULO</div>`

    }
}
  

    
function clicou(n){

    let elNumero = document.querySelector('.numero.pisca')
        if(elNumero !== null) {
        elNumero.innerHTML = n
        numero = numero + n 
        elNumero.classList.remove('pisca')
        if(elNumero.nextElementSibling!= null){
            elNumero.nextElementSibling.classList.add('pisca')
        } else {
            atualizaInterface()
        }
    }
}

function branco(){
if(numero === '' ){
    votoBranco = true
    seuVotoPara.style.display = 'block'
    aviso.style.display = 'block';
    numeros.innerHTML = ''
    descricao.innerHTML =`<div class="aviso-grande pisca">VOTO EM BRANCO</div>`
} else {
    alert("Para votar em branco, não pode digitar nenhum numero.")
}
}
function corrige(){
   comecarEtapa()
}

function confirma(){
  
    let etapa = etapas[etapaAtual]
    let votoConfirmado = false

    if (votoBranco === true){
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo, voto: 'branco'
        })
    } else if (numero.length === etapa.numeros){
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo, voto: numero
        })
    }

        if(votoConfirmado){
             etapaAtual++

                if(etapas[etapaAtual] !== undefined){
                comecarEtapa()
        } else {
            
            document.querySelector('.tela').innerHTML = `<div class="aviso_gigante pisca">FIM</div>`
            let som = document.querySelector('audio')
            som.currentTime = 2.8
            som.play()
            console.log(votos)
            }
            
        }
}


comecarEtapa()