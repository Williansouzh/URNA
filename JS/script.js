/*funções para encurtar outras funçõess*/
const qs = (element)=>document.querySelector(element);
/*Controle de interface*/
let seuVotoPara = qs('.d-1-1 span');
let cargo = qs('.d-1-2 span');
let descricao = qs('.d-1-4');
let aviso = qs('.d-2');
let lateral = qs('.d1-right');
let numeros = qs('.d-1-3');
let votos = [];

let etapaAtual =0;  
let numero = '';
let votoBranco = false;
let numeroHtml = '';
function comecarEtapa(){
    let numeroHtml = '';
    let etapa = etapas[etapaAtual];
    numero = '';
    for(let i=0;i<etapa.numeros;i++){
        console.log('criando')
        if(i===0){
            numeroHtml += '<div class="numero pisca"></div>'
        } else{
            numeroHtml += '<div class="numero"></div>'
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;

}
/*Funções*/
function atualizaInterface( ){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        }else {
            return false;
        } 
    });
    
    if(candidato.length>0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `Canditado: ${candidato.nome} <br> Partido: ${candidato.partido} `
        aviso.style.display = 'block';

        let fotosHtml = '';
        for(let i in candidato.fotos){
            fotosHtml += `<div class="d-1-image ">
                <img src="IMAGES/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda} </div>`
        }
        lateral.innerHTML = fotosHtml;
    } else{
        descricao.innerHTML = `<div class = "avisoGrande pisca">VOTO NULO!</div>`
        descricao.classList.add('pisca');
        aviso.style.display = 'block';
    }
}
function clicou(n){
    let elNumero = qs('.numero.pisca');
    if(elNumero!=null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`
        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling!==null){
            elNumero.nextElementSibling.classList.add('pisca');
        } else{
            atualizaInterface();
        }
    }
}
function branco(){
    if(numero===''){
        votoBranco = true;
        descricao.innerHTML = `<div class = "avisoGrande pisca">VOTO EM BRANCO!</div>`
        descricao.classList.add('pisca');
        aviso.style.display = 'block';
    }
}
function corrige(){
    numero = '';
    comecarEtapa();
}
function confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    if(votoBranco===true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'BRANCO'
        })
    } else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }
    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual]!==undefined){
            comecarEtapa()
        } else{
            qs('.tela').innerHTML = `<div class = "avisoGrande pisca">FIM.</div>`
        }
    }
}


comecarEtapa();