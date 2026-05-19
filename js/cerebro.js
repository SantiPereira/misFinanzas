//* importaciones de archivos complementarios *//
import * as finanzas from "./finanzas.js" ;

// =======================================================
// & INICIO DE LA LOGICA PARA EL INGRESO DE MOVIMIENTOS
// =======================================================
const formularioDeIngresoDeMovimientos = document.querySelector(`.container_lateral form`) ; 
const tablaDeMovimientos = document.getElementById(`cuerpo_tabla1`) ; 

formularioDeIngresoDeMovimientos.addEventListener(`submit` , function(evento){
    evento.preventDefault() ; 

    const inputsForm = formularioDeIngresoDeMovimientos.querySelectorAll(`input`) ;
    const selectsForm = formularioDeIngresoDeMovimientos.querySelectorAll(`select`) ; 

    const detalle = inputsForm[0].value ; 
    const monto = Number(inputsForm[1].value) ; 
    const cuotas = inputsForm[2].value ;

    const tipoDeGasto = selectsForm[0].value ; 
    const medioDePago = selectsForm[1].value ; 

    if(!monto || monto <= 0) {
        alert("Por favor, ingresá un monto válido.");
        return;
    }

    // Enviamos los datos a finanzas.js para que haga la matemática
    // finanzas.procesarMovimientoFinanciero(monto, tipoDeGasto, medioDePago);

    // Actualizamos las tarjetas del Home con tus NUEVOS IDs de HTML
    document.getElementById('total_ing_extra').innerText = `$${finanzas.ingresosExtra}`;
    document.getElementById('limite_santander').innerText = `$${finanzas.limiteSantander}`;
    document.getElementById('limite_oca').innerText = `$${finanzas.limiteOca}`;
    document.getElementById('ahorro_auto').innerText = `$${finanzas.ahorroAuto}`;

    const nuevaFila = `
        <tr>
            <td>${detalle}</td>
            <td style="font-family: 'Intel One Mono', monospace; font-weight: bold;">$${monto}</td>
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

// ===========================================
// & LOGICA PARA ELIMINAR MOVIMIENTOS
// ===========================================
tablaDeMovimientos.addEventListener('click', function(evento) {
    if (evento.target.classList.contains('btn-borrar') || evento.target.innerText === '🗑️') {
        const fila = evento.target.closest('tr');
        if (confirm("¿Estás seguro de eliminar este movimiento?")) {
            fila.remove();
        }
    }
});

// ===========================================================
// & LOGICA PARA MODIFICAR CONTADORES DE INGRESOS Y GASTOS (MODAL)
// ===========================================================
const btnEditarDatos = document.getElementById('btn_editar_datos');
const btnCerrarModal = document.getElementById('btn_cerrar_modal');
const modalEdicion = document.getElementById('modal_edicion_datos_gen');
const formModalEdicion = document.getElementById('form_editar_base');

// RASTREADOR 1: Ver si JS realmente encuentra los elementos en tu página
console.log("¿Botón editar encontrado?:", btnEditarDatos);
console.log("¿Modal encontrado?:", modalEdicion);

// Evento para ABRIR el modal
if(btnEditarDatos) {
    btnEditarDatos.addEventListener('click', () => {
        console.log("¡Hiciste clic en el botón de editar!"); // RASTREADOR 2
        if (modalEdicion) {
            modalEdicion.classList.add('modal_visible');
            console.log("Clases actuales del modal:", modalEdicion.className); // RASTREADOR 3
        } else {
            console.log("Error: El modal no existe en el DOM.");
        }
    });
}

// Evento para CERRAR desde la X
if(btnCerrarModal) {
    btnCerrarModal.addEventListener('click', () => {
        modalEdicion.classList.remove('modal_visible');
    });
}

// Evento para CERRAR si hacen clic afuera
window.addEventListener('click', (event) => {
    if (event.target === modalEdicion) {
        modalEdicion.classList.remove('modal_visible');
    }
});

// Evento para GUARDAR los datos
if(formModalEdicion) {
    formModalEdicion.addEventListener('submit', async function(event){
        event.preventDefault() ;
        
        const nuevoSueldo = Number(document.getElementById('edit_sueldo').value) ;
        const nuevoIngExtra = Number(document.getElementById('edit_extras').value) ;
        const nuevoLimiteSantander = Number(document.getElementById('edit_santander').value) ;
        const nuevoLimiteOCA = Number(document.getElementById('edit_oca').value) ;
        const nuevoAhorroAuto = Number(document.getElementById('edit_ahorro_auto').value) ; 
        const nuevaMetaAuto = Number(document.getElementById('edit_meta_auto').value) ; 
        const nuevoAhorroGen = Number(document.getElementById('edit_ahorro_gen').value) ; 

        finanzas.actualizarValoresEnDatosGen(nuevoSueldo, nuevoIngExtra, nuevoLimiteSantander, 
                                        nuevoLimiteOCA , nuevoAhorroAuto , nuevaMetaAuto , nuevoAhorroGen)  ;

        document.getElementById('total_sueldo').innerText = `$${nuevoSueldo.toLocaleString('es-UY')}`;
        document.getElementById('total_ing_extra').innerText = `$${nuevoIngExtra.toLocaleString('es-UY')}`;
        document.getElementById('limite_santander').innerText = `$${nuevoLimiteSantander.toLocaleString('es-UY')}`;
        document.getElementById('limite_oca').innerText = `$${nuevoLimiteOCA.toLocaleString('es-UY')}`;
        document.getElementById('ahorro_auto').innerText = `$${nuevoAhorroAuto.toLocaleString('es-UY')}` ; 
        document.getElementById('meta_auto').innerText = `$${nuevaMetaAuto.toLocaleString('es-UY')}` ;
        document.getElementById('ahorro_general').innerText = `$${nuevoAhorroGen.toLocaleString('es-UY')}` ;

        modalEdicion.classList.remove('modal_visible');

        let calAhorroEnDolarAuto = await finanzas.obtenerPrecioDolar(nuevoAhorroAuto) ; 
        let calMetaEnDolarAuto = await finanzas.obtenerPrecioDolar(nuevaMetaAuto) ; 

        document.getElementById('ahorro_auto_usd').innerText = `$${calAhorroEnDolarAuto}` ;
        document.getElementById('meta_auto_usd').innerText = `$${calMetaEnDolarAuto}` ;

    });
}