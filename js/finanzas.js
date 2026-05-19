export let sueldoNeto = Number(33000) ;
export let ingresoExtra = Number(15000) ;
export let limiteSantander = Number(15000) ;
export let limiteOCA = Number(3000) ;
export let ahorroAuto = Number(0) ; 
export let metaAuto = Number(0) ; 
export let ahorroGen = Number(0) ; 

export let precioDolar = 40 ; 

export let gastosSantander = 0 ;
export let gastosOCA = 0 ; 
export let gastosMensual = 0 ; 
export let gastosNafta = 0 ;
export let gastosSalidas = 0 ; 


export function actualizarValoresEnDatosGen(nuevoSueldoNeto, nuevoIngrsoExtra, nuenvoLimiteSantander, nuevoLimiteOCA,nuevoAhorroAuto, nuevaMetaAuto, nuevoAhorroGen) {
    sueldoNeto = nuevoSueldoNeto ;
    ingresoExtra =  nuevoIngrsoExtra ; 
    limiteSantander = nuenvoLimiteSantander ;
    limiteOCA = nuevoLimiteOCA ;
    ahorroAuto = nuevoAhorroAuto ;
    metaAuto = nuevaMetaAuto ;
    ahorroGen = nuevoAhorroGen ;
}

export async function obtenerPrecioDolar(montoEnPesos){
    try{
        const respuesta = await fetch("https://open.er-api.com/v6/latest/USD") ; 
        const data = await respuesta.json() ;

        precioDolar = data.rates.UYU ; 
        const conversionAdolar = (montoEnPesos / precioDolar).toFixed(2);

        console.log(`💵 Dólar hoy: $${precioDolar} UYU. Tu monto en dólares sería: U$S ${conversionAdolar}`);

        return conversionAdolar ; 

    } catch(error) {
        const conversionBase = (montoEnPesos / precioDolar).toFixed(2);
        console.log("Error al conectar con la API, usando dólar base. Equivale a: U$S", conversionBase);

        return conversionBase ; 
    }   
} 

export function calcularTotalGastos(canFilasTabla) {

    //^ Orden tabla: [0]Detalle, [1]Monto, [2]Categoría, [3]Cuotas, [4]MedioPago 

    gastosSantander = 0 ;
    gastosOCA = 0 ; 
    gastosMensual = 0 ; 
    gastosNafta = 0 ; 
    gastosSalidas = 0 ;

    for (var k = 0 ; i < canFilasTabla.length ; k++ ) {
        var fila = canFilasTabla[k] ; 
        var celda = fila.querySelectorAll('td') ; 

        if(celda.length === 0) continue ; 
        
        var categoria = celda[2].innerText.trim() ;
        var medioDePago = celda[4].innerText.trim() ;

        var textoMonto = celda[1].innerText;
        textoMonto = textoMonto.replace('$', '').replace(/\./g, '').trim(); 
        const monto = Number(textoMonto);
        if (isNaN(monto)) continue;
        
    } 




}





