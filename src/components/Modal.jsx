import { useState,useEffect } from 'react';
import Mensaje from './Mensaje'
import BotonCerrar from '../img/cerrar.svg'

function Modal({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) {

    const [mensaje, setMensaje] = useState('')

    const [nombreGasto, setNombreGasto] = useState('')
    const [cantidadGastada, setCantidadGastada] = useState('')
    const [categoria, setCategoria] = useState('')
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')

    useEffect( () => {
        if( Object.keys(gastoEditar).length > 0 ) {
            setNombreGasto(gastoEditar.nombreGasto)
            setCantidadGastada(gastoEditar.cantidadGastada)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha);
        }
    }, [gastoEditar])

    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if([nombreGasto, cantidadGastada, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios')
            
            setTimeout(() => {
                setMensaje('')
            }, 2000);
            return;
        }

        guardarGasto({ nombreGasto, cantidadGastada, categoria, id, fecha })
    }

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
                src={ BotonCerrar } 
                alt="Botón cerrar modal" 
                onClick={ ocultarModal }
            />
        </div>

        <form 
            className={ `formulario ${animarModal ? "animar" : 'cerrar'}` }
            onSubmit = { handleSubmit }
        >
            <legend>{ gastoEditar.nombreGasto ? "Editar Gasto" : "Nuevo Gasto" }</legend>
            {mensaje && <Mensaje tipo= "error">{ mensaje }</Mensaje>}

            <div className='campo'>
                <label htmlFor="nombre">Nombre Gasto</label>

                <input 
                    id='nombre'
                    type="text" 
                    placeholder='Añade el Nombre del Gasto'
                    value = { nombreGasto }
                    onChange = { e => setNombreGasto(e.target.value) }
                />
            </div>

            
            <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label>

                <input 
                    id='cantidad'
                    type="number" 
                    placeholder='Añade la Cantidad Gastada: Ej. 300'
                    value = { cantidadGastada }
                    onChange = { e => setCantidadGastada(Number(e.target.value)) }
                />
            </div>

            <div className='campo'>
                <label htmlFor="categoria">Categoría</label>

                <select 
                    id="categoria"
                    name="" 
                    value = { categoria }
                    onChange = { e => setCategoria(e.target.value) }
                >
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="ocio">Ocio</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>

            <input 
                type="submit"
                value={ gastoEditar.nombreGasto ? "Guardar Cambios" : "Añadir Gasto" }
            />
        </form>
    </div>
  )
}

export default Modal