document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById('formulario');
  const tablaBody = document.querySelector('#tablaClasificaciones tbody');

  function obtenerClasificaciones() {
    const data = localStorage.getItem('clasificaciones');
    return data ? JSON.parse(data) : [];
  }

  function guardarClasificaciones(clasificaciones) {
    localStorage.setItem('clasificaciones', JSON.stringify(clasificaciones));
  }

  function actualizarTabla() {
    const clasificaciones = obtenerClasificaciones();
    clasificaciones.sort((a, b) => a.tiempo - b.tiempo);
    tablaBody.innerHTML = '';

    clasificaciones.forEach((registro, index) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${index + 1}</td>
        <td>${registro.vehiculo}</td>
        <td>${registro.nombre}</td>
        <td>${registro.apellido}</td>
        <td>${registro.tiempo}</td>
      `;
      tablaBody.appendChild(fila);
    });
  }

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const vehiculo = document.getElementById('vehiculo').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const tiempo = parseInt(document.getElementById('tiempo').value);

    const nuevaClasificacion = { vehiculo, nombre, apellido, tiempo };
    const clasificaciones = obtenerClasificaciones();
    clasificaciones.push(nuevaClasificacion);
    guardarClasificaciones(clasificaciones);

    formulario.reset();
    actualizarTabla();
  });

  actualizarTabla();
});
