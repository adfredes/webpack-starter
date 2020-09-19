import '../css/componentes.scss'

export const saludar = (nombre) => {
    console.log('Creando etiqueta h1');
    const h1 = document.createElement('h1');
    h1.innerHTML = `Hola, ${nombre}, como estas?`
    document.body.append(h1);
}