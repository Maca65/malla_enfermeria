
const prerrequisitos = {
  // ejemplo: "ENF201": ["ENF102", "ENF110"]
};

const ramos = document.querySelectorAll('.ramo');

function cargarEstado() {
  const estado = JSON.parse(localStorage.getItem('estadoRamos')) || {};
  ramos.forEach(ramo => {
    const id = ramo.dataset.id;
    if (estado[id] === 'aprobado') {
      ramo.classList.add('aprobado');
    }
  });
}

function guardarEstado() {
  const estado = {};
  ramos.forEach(ramo => {
    const id = ramo.dataset.id;
    if (ramo.classList.contains('aprobado')) {
      estado[id] = 'aprobado';
    }
  });
  localStorage.setItem('estadoRamos', JSON.stringify(estado));
}

function puedeActivarse(ramoId) {
  const requisitos = prerrequisitos[ramoId] || [];
  return requisitos.every(req => {
    const el = document.querySelector(`[data-id="${req}"]`);
    return el && el.classList.contains('aprobado');
  });
}

function actualizarBloqueados() {
  ramos.forEach(ramo => {
    const id = ramo.dataset.id;
    if (prerrequisitos[id]) {
      if (!puedeActivarse(id)) {
        ramo.classList.add('bloqueado');
        ramo.classList.remove('aprobado');
      } else {
        ramo.classList.remove('bloqueado');
      }
    }
  });
}

ramos.forEach(ramo => {
  ramo.addEventListener('click', () => {
    if (ramo.classList.contains('bloqueado')) return;
    ramo.classList.toggle('aprobado');
    guardarEstado();
    actualizarBloqueados();
  });
});

cargarEstado();
actualizarBloqueados();
