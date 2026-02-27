const inputPa = document.getElementById("inputParametro");
const inputFrom = document.getElementById("inputFrom");
const inputTo = document.getElementById("inputTo");
const btnBuscar = document.getElementById("btnBuscar");
const setContent = document.getElementById("setContent");
const apiKey = "dccd005ab36e454bb744657b2c104972";

const recibirNoticia = async () => {

    

    limpiar();

    if(inputPa.value ===""){
        setContent.innerHTML = `<div class="alert alert-danger" role="alert">
            Ponga datos para buscar la noticia 
</div> `;
return;
    }
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${inputPa.value.trim()}&from=${inputFrom.value}&to=${inputTo.value}&sortBy=popularity&apiKey=${apiKey}`);

        if (!response.ok) {
            setContent.innerHTML = `<div class="alert alert-danger" role="alert">
            La noticia no se encontro
</div> `;
            return;
        };
        const datos = await response.json();
        console.log(datos);

        if (datos.articles.length === 0) {
    setContent.innerHTML = `
        <div class="alert alert-info" role="alert">
           No se encontro la noticia
        </div>`;
    return; 
}

        datos.articles.forEach(element => {
            
        const divU = document.createElement("div");
        divU.classList.add("col-lg-6");
        divU.innerHTML=`<div class="card" ">
  <img src="${element.urlToImage || 'https://static.vecteezy.com/system/resources/previews/005/723/771/non_2x/photo-album-icon-image-symbol-or-no-image-flat-design-on-a-white-background-vector.jpg'}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${element.title}</h5>
    <p class="card-text">${element.description}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${element.publishedAt}</li>
    <li class="list-group-item">${element.source.name}</li>
  </ul>
  <div class="card-body">
    <a href="${element.url}" class="card-link">Card link</a>
  </div>
</div> `

setContent.appendChild(divU);
});

    }
    catch {
        setContent.innerHTML = `<div class="alert alert-danger" role="alert">
            Error al conectar con el servidor
</div> `
    }

}

const limpiar = () =>{
    setContent.innerHTML=("");
}

btnBuscar.addEventListener("click",recibirNoticia);
