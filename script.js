const prerrequisitos = {
  "ENF201": ["ENF102", "ENF110"],
  "MYF302": ["MYF101"],
  "ENF301": ["ENF201", "MYF101"],
  "ENF302": ["ENF201"],
  "ENF401": ["ENF302"],
  "ENF402": ["ENF302"],
  "ENF404": ["ENF302"],
  "ENF505": ["ENF402"],
  "ENF506": ["ENF402", "ENF302"],
  "ENF500": ["CBI301", "ENF302", "ENF401", "ENF402", "ENF404", "LCE002"],
  "ENF501": ["ENF401", "ENF402", "ENF404"],
  "ENF504": ["ENF402", "ENF302"],
  "ENF600": ["ENF500", "ENF501", "ENF504", "ENF505", "ENF506"],
  "ENF602": ["ENF501", "ENF500"],
  "ENF603": ["ENF602", "ENF302"],
  "ENF700": ["ENF600", "ENF602", "ENF605", "ENF506", "ENF606", "ENF701"],
  "ENF703": ["ENF602", "ENF600"],
  "ENF704": ["ENF603", "ENF804"],
  "ENF804": ["ENF602", "ENF600", "ENF701"],
  "ENF805": ["ENF602", "ENF506", "ENF600"],
  "ENF802": ["ENF804", "ENF700"],
  "ENF803": ["ENF704", "ENF602", "ENF504"],
  "ENF904": ["ENF805", "ENF804", "ENF705", "ENF704", "ENF603", "ENF606"],
  "ENF905": ["ENF904", "ENF803", "ENF802", "ENF801", "ENF800", "ENF703"]
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
