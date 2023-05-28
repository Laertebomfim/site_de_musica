// tela maio que 750px meu não aparece

const  caixaAbriMenu= document.getElementById("icon-moble")
const menuMobile=document.querySelector("menu")

const iconMobile = caixaAbriMenu.firstElementChild
window.addEventListener("resize",()=>{ // evento para oculta o menu bobila
    if(innerWidth>1000){
        iconMobile.style.display="none"
    }else{
        iconMobile.style.display="block"
    }
})

if(innerWidth>1000){// vai ocuta o menu mobile
    iconMobile.style.display="none"
}


iconMobile.addEventListener("click",(elemento)=>{ // animação icon mobile 
    
    elemento.stopImmediatePropagation()
    anime({
        targets:iconMobile,
        translateX:[{
            value:-80,
            duration:2000,
        },
        {
            value:80,
            direction: 'alternate',
        },
        ],
        rotate:{
            value:360,
            duration:3000,
            delay:200
        },
        scale:{
            value:1,
            delay:1000,
            duration:1000,
        },

    })
    setTimeout(()=>{// animação menu mobile. quando termina a primeira animação começa essa 
        menuMobile.style.display="inline-block"

        anime({
            targets:menuMobile,
            width:{
                value:"50%",
                duration:1000
            },
    
        })
    },2500)
}) 

const iconFechamenu = document.getElementsByClassName("fecha")[0]
iconFechamenu.addEventListener("click",(ele)=>{ // animação fecha menu
    ele.stopImmediatePropagation()
    anime({
        targets:menuMobile,
        width:{
            value:"0",
            duration:1000
        },

    })
    setTimeout(()=>{
        anime({
            targets:iconMobile,
            translateX:[{
                value:-80,
                duration:2000,
            },
            {
                value:0,
                duration:2000,
                delay:1000
            },
            ],
            rotate:{
                value:0,
                duration:1000,
                delay:2000,
                direction: 'alternate',

            },
        })
    },1000)
})


