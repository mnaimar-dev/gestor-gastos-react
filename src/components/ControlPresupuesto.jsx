import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css'


function ControlPresupuesto({gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto }) {
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect( () => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidadGastada + total, 0 );
        const totalDisponible = presupuesto - totalGastado;

        // Cálculo Porcentaje Gastado
        const calculoPorcentaje = ((totalGastado * 100) / presupuesto).toFixed(2); // tofixed(2) --> 2 dígitos después de la coma

        setTimeout(() => {
            setPorcentaje(calculoPorcentaje);
        }, 920);
        
        setDisponible(totalDisponible)
        setGastado(totalGastado)
    }, [gastos])
 
    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        Swal.fire({
            title: 'Deseas Resetear la App?',
            text: "Perderás todos tus registros!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, resetear!'
          }).then((result) => {
            if (result.isConfirmed) {
                setGastos([]);
                setPresupuesto(0);
                setIsValidPresupuesto(false);
                Swal.fire(
                    'App Reseteada!',
                    'Tus registros fueron eliminados.',
                    'success'
              )
            }
          })
    }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar 
                styles={ buildStyles({
                    pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6', // Color Contorno Gráfico
                    trailColor: '#F5F5F5', // Color Contorno Libre
                    textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                }) }
                value= { porcentaje }
                text= { `${ porcentaje }% Gastado` }
            />
        </div>

        <div className="contenido-presupuesto">
            <button 
                className="reset-app"
                type="button"
                onClick = { handleResetApp }
            >
                Resetear App
            </button>
            <p>
                <span>Presupuesto: </span> { formatearCantidad(presupuesto) }
            </p>

            <p className={`${ disponible < 0 ? 'negativo' : '' }`}>
                <span>Disponible: </span> { formatearCantidad(disponible) }
            </p>

            <p>
                <span>Gastado: </span> { formatearCantidad(gastado) }
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto

