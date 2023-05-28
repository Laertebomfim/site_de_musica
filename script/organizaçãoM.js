// para carrega as img  das musicas
const caixaMusica = [...document.querySelectorAll("article.caixa-musica")]//arrey de article

var  musicaPrisipais= [], musicaFavorita = []

var indscaixaMusica = caixaMusica.length
caixaMusica.map((elemento,inds)=>{ // vai faze uma separação para os elementos 
    inds < indscaixaMusica-2?musicaPrisipais.push(elemento):musicaFavorita.push(elemento)
})

fetch("imagemMusica/urlMusica.json") // requisição das musicas 
.then(res=>res.json())
.then((respConfiguração)=>{
    carregaImgMasTocadas(respConfiguração.mastocadas);
    carregaImgMinhasMusicas(respConfiguração.favoritas);
});
function carregaImgMasTocadas(veto){

    musicaPrisipais.map((elemento)=>{ // vai escolhe randomicamente as imagens da categoria (mais tocadas) vindas da requisição e colocando dentro do article
        let img = elemento.firstElementChild;
        let numetoRan = Math.floor(Math.random()*9);
        let urlIMG = veto[numetoRan];
        img.style.backgroundImage = `url("${urlIMG[0]}")`;
    });
};
function carregaImgMinhasMusicas(veto){
    musicaFavorita.map((elemento)=>{// vai escolhe randomicamente as imagens da categoria (minhas musicas) vindas da requisição e colocando dentro do article
        
        let img = elemento.firstElementChild
        let numetoRan = Math.floor(Math.random()*2)
        let urlIMG = veto[numetoRan]
        img.style.backgroundImage = `url("${urlIMG[0]}")`
    });
};

var MUSICA = null
caixaMusica.map((ele) =>{ // vai cria em cada elemento article um evento
    ele.addEventListener("click",(proriedade)=>{ // vai escolhe a musixa conforme a imagem

        const imgMusica = ele.firstElementChild // local da imagem
        let striglogica = imgMusica.style.backgroundImage // o que esta escrito na url imagem. Do background
        let strigteste = /\d/i// separa o número da url
        let boleanostring = strigteste.test(striglogica) // teste se a url o numero
        document.querySelector(".minhaMusicas")
        anime({// vai acresenta um padding no fundo da pagina para a caixa contorle não cobri as musixas 
            targets:".minhaMusicas",
            paddingBottom:{
                value:"200px",
                duration:1000
            },
        })
        document.querySelector("main").style.webkitS
        // isso e um teste que confere o numero da img e o numero da url da musica 
        
        if(boleanostring == true){// se tive numero  na url 
            let vetoDaMusica = striglogica.match(strigteste) // vai me retorna o número da img
            let numeroDaMusica = vetoDaMusica[0]
            fetch("imagemMusica/urlMusica.json")
            .then(res=>res.json())
            .then((resposta)=>{
                
                // loop para encontra a musica serta
                let vatoConpleto = resposta.mastocadas; // arrey catigoria mais tocadas
                let cot = 0
                    var musicaURL= null
                    var  numerostrig =null
                    do{ // porcura por dentro do veto qual a url da musica
                        musicaURL = vatoConpleto[cot][1];// url da musica
                        numerostrig = musicaURL.match(strigteste);// número da url da musica
                        cot++
                    }while(numerostrig[0]!=numeroDaMusica);

                    MUSICA instanceof HTMLAudioElement ? MUSICA.pause():false // seve para verifica se já tem um musica tocando, e pausala

                    MUSICA = new Audio(musicaURL);// criando o elemento musica
                    MUSICA.setAttribute("type","'audio/mpeg'");// atibutos da musica
                    MUSICA.setAttribute("preload","auto")
                     
                    subirCaixadecontroles()// isso vai faze uma animação que vai subi uma caixa com os contoles da musica
                    
                    document.getElementsByClassName("imgMusica")[0].style.backgroundImage =striglogica// img que vai apareçer nos controles da musica 
                    funcionalidadesControles()//aqui vai as funcionalidades dos controles play e pause
                    barraDeProgreso() // aqui as funcionalidades da barra de progeso
                    clearInterval(loopBarraProgreso) // para o entevalo que faz a barra de progresso anda
                    elementoBarraDeProgreso.value=0 // zera o range
                    retroseder()// vai cria um evento para o botão valta
                })
        }else{
            MUSICA instanceof HTMLAudioElement ? MUSICA.pause():false// seve para verifica se já tem um musica tocando, e pausala
            MUSICA=new Audio("musicas/music.mp3")
            MUSICA.setAttribute("type","'audio/mpeg'")

            subirCaixadecontroles()// subir caixa controle musica

            document.getElementsByClassName("imgMusica")[0].style.backgroundImage = striglogica // vai coloca a imagem no lado dos controles

            funcionalidadesControles()//aqui vai as funcionalidades dos controles play e pause
            barraDeProgreso() // aqui as funcionalidades da barra de progeso
            clearInterval(loopBarraProgreso) // para o entevalo que faz a barra de progresso anda
            elementoBarraDeProgreso.value=0 // zera o range
            retroseder()// vai cria um evento para o botão valta

        }
    })

})
function subirCaixadecontroles(){
    var caixaControles = document.getElementsByClassName("musicaplay")[0];
    caixaControles.style.display= "block"
    anime({
        targets:".musicaplay",
        height:120,
        
    })
};
// função para as funcionalidades dos controles 
function funcionalidadesControles(){ // vai apaga os evento anteriores e enserir novos
    botãoPausePlay.removeEventListener("click",playPause) //vai apaga o  evento da musica assim que toca em outra caixa de musica
    botãoPausePlay.addEventListener("click",playPause);// vai adisiona o evento para  play e pause
    botãoAvançar.removeEventListener("click",avansaMusica)//isso vai tira o evento de avansa musica quando toca em outra
    botãoAvançar.addEventListener("click",avansaMusica)// vai adisiona o evento para  avasar musica
};

const botãoPausePlay = document.querySelector(".play-pause span")//botão para pausa e para da play 

var playPause = function(){ // essa função presisa se no escopo global para não se descartada despos de executada 
    clearInterval(loopBarraProgreso) // para o entevalo quando for começar outro

    let testeLogicoPM = botãoPausePlay.innerText; // texto do botão play pause
    if(testeLogicoPM === "play_circle"){ // vai testa se a musica pausa ou da play
        // muda de icone de controle de pause para play
        botãoPausePlay.innerHTML=""
        botãoPausePlay.innerHTML= "pause_circle"

        MUSICA.play()// toca musica
        loopBarraProgreso = setInterval(()=>{// ela faz a bara range crese e zera quando chega no maximo da musica
            if(Number(elementoBarraDeProgreso.value)>=Number(elementoBarraDeProgreso.max)){ // if para reconhecer quando a musica acaba
                MUSICA.currentTime=0
                elementoBarraDeProgreso.value=0 // zera o range
                botãoPausePlay.innerHTML= "play_circle"
                MUSICA.pause()
                clearInterval(loopBarraProgreso) // para o entevalo 
            }else{
                elementoBarraDeProgreso.value++
            };
        },1000)
    }else{
        // muda de icone de controle de play para pause
        botãoPausePlay.innerHTML=""
        botãoPausePlay.innerHTML= "play_circle"
        // pausa musica
        MUSICA.pause()
        clearInterval(loopBarraProgreso)
    };
};
// função barra de progreso 
var loopBarraProgreso = null
const elementoBarraDeProgreso = document.querySelector("input[type=range]")
function barraDeProgreso(){
    var promesaBaraDeProgriso = new Promise((verdadeiro,falso)=>{ // promise para espera carrega os dado da musica 
        MUSICA.addEventListener("loadeddata",()=>{
            if(MUSICA.readyState > 3){ // dados maior que 3
                verdadeiro(true)
            }else{falso("a midia por algum mutivo taquinico não foi carregada")}
        })

    });
    promesaBaraDeProgriso
    .then((v)=>{
        var tamanhoDaMusica = Math.floor(MUSICA.duration) //  minuto da musica
        elementoBarraDeProgreso.setAttribute("max", tamanhoDaMusica) // range resebe os minitos com o valor maximo 
    })
    .catch((falso)=>{
        console.error(falso)
    })

};
const botãoVolta = document.querySelector(".icon-volta") // botão valta
function retroseder(){ // vai cria um evento para o botão valta
    botãoVolta.addEventListener("click",()=>{
        elementoBarraDeProgreso.value=0 // zera o range
        MUSICA.currentTime=0//zera a musica
        MUSICA.pause()
        clearInterval(loopBarraProgreso) // para o entevalo 
        botãoPausePlay.innerHTML="play_circle"// muda o icone da (play para pause)
    })
};
const botãoAvançar = document.querySelector(".icon-prosima") // botão avançar
var avansaMusica = function(){// vai cria um evento para avançar a musica
        MUSICA.currentTime+=10// adiantar mas 10
        let valorRange = Number(elementoBarraDeProgreso.value)//pegando o valor do elemento range é trasfomando em um número
        valorRange+=10
        elementoBarraDeProgreso.value = valorRange // devolvendo o valor para o  ranga com mas dez 
        botãoPausePlay.innerHTML== "pause_circle" ? botãoPausePlay.innerHTML="play_circle" : false //para não pausa a musica, quando  click no  botão avançar
        playPause()

};