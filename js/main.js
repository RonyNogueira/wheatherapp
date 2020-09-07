//começando a bagaceira
let inputSearch = document.querySelector(".ip-search")
let btnSearch = document.querySelector(".busca")
const cidade = document.querySelector("p.text-city")
const data = document.querySelector("p.date")
const hora = document.querySelector("span.hora")
const condicao = document.querySelector("p.tempo")
const temperatura = document.querySelector("h1.temp")
const umidade = document.querySelector("span.umidade")
const vento = document.querySelector("span.vento")
const box = document.querySelector(".box")
let val = {}

window.onload = function(){
    getApi()
  
}


function getApi(){
      let local = ""
      let key = "5dddcc87 "
      local = inputSearch.value  
     
     let api = `https://api.hgbrasil.com/weather?key=${key}&city_name=${local},&format=json-cors`

     const myHeader = new Headers()
     myHeader.append("origin", "*")
     const myInit = {method:"GET", headers: myHeader, mode: "cors"}

    fetch(api,myInit)
            .then(response => response.json())
            .then(res => {
               
                val.cidade = res.results.city
                val.data = res.results.date
                val.hora = res.results.time
                val.condicao = res.results.description
                val.temperatura = res.results.temp
                val.umidade = res.results.humidity
                val.vento = res.results.wind_speedy
                val.forecast =res.results.forecast
            })
            
            .then(function(){ 
                displayWheather()         
            })

}

  function displayWheather(){
    
    cidade.innerHTML = val.cidade
    data.innerHTML = `${val.data}<span class="hora">,  ${hora.innerHTML = val.hora} </span>`
    condicao.innerHTML = val.condicao
    temperatura.innerHTML = `${val.temperatura} <span class="cel f-20">°c</span>`
    umidade.innerHTML =`Umidade: ${val.umidade}%` 
    vento.innerHTML = `Vento: ${val.vento}` 
    html= ""
    
  
    val.forecast.map((value, key )=>{
       
        if (key < 4){

            html += `    
        
            <div class="col-10 col-md-3 col-lg-3 item text-center">
    
            <div class="box-date">
        
                <p>${value.weekday} - ${value.date}</p>
                <p>${value.max}<span class="box-cel">°C</span></p>
                <p>${value.min}<span class="box-cel">°C</span></p>
        
            </div>
        
        </div>`

        }
   

        

    })

    box.innerHTML = html

  
  }

btnSearch.addEventListener("click", function(){
    getApi()
})

inputSearch.addEventListener("keyup",function(e){
     
    const key = e.which || e.keyCode 
    if (key == 13){
        getApi()
    }

})
