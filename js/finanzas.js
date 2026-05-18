export let SueldoNeto = "$33.000" ;
export let gastosSantander = "$15.000" ;
export let gastosOCA = "$3.000" ;
export let gastosMensuales = "$10.0000" ;
export let gastosNafta = "$12.000" ;
export let gastosSalidas = "$5.000" ;

export function actualizarValoresEnHome(nuevoSueldoNeto, nuevoIngrsoExtra, nuenvoLimiteSantander, nuevoLimiteOCA, nuevoAhorroAuto, nuevaMetaAuto, nuevoAhorroGen) {
    SueldoNeto = nuevoSeldoNeto ; 
    gastosSantander = nuenvoLimiteSantander ;
    gastosOCA = nuevoLimiteOCA ;
    gastosMensuales = nuevoAhorroAuto ;
    gastosNafta = nuevaMetaAuto ;
    gastosSalidas = nuevoAhorroGen ;
}


