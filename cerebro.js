const formularioDeIngresoDeMovimientos = document.querySelector(`.container_lateral form`) ; 
const tablaDeMovimientos = document.getElementById(`cuerpo_tabla1`) ; 

formularioDeIngresoDeMovimientos.addEventListener(`submit` , function(evento){
    evento.preventDefault() ; 

    const inputsForm = formularioDeIngresoDeMovimientos.querySelectorAll(`input`) ;
    const selectsForm = formularioDeIngresoDeMovimientos.querySelectorAll(`select`) ; 

    const detalle = inputsForm[0].value ; 
    const monto = inputsForm[1].value ; 
    const cuotas = inputsForm[2].value ;

    const tipoDeGasto = selectsForm[0].value ; 
    const medioDePago = selectsForm[1].value ; 

    const nuevaFila = `
        <tr>
            <td>${detalle}</td>
            <td>$${monto}</td>
            <td>${tipoDeGasto}</td>
            <td>${cuotas}</td>
            <td>${medioDePago}</td>

            <td>
                <button class="btn-borrar">🗑️</button>
                <button class="btn-edit">✏️</button>
            </td>
        </tr>
    `

    tablaDeMovimientos.innerHTML += nuevaFila ; 
    formularioDeIngresoDeMovimientos.reset() ; 
}) ; 