// Cambiar entre Login, Registro y Recuperar Contraseña
function cambiarAuth(formularioId) {
  document.getElementById('form-login').classList.add('oculto');
  document.getElementById('form-registro').classList.add('oculto');
  document.getElementById('form-recuperar').classList.add('oculto');
  document.getElementById(formularioId).classList.remove('oculto');
}

function iniciarSesion() {
  const usuario = document.getElementById('login-usuario').value.trim();
  if (!usuario) {
    alert('Por favor ingresa tu usuario.');
    return;
  }
  document.getElementById('vista-auth').classList.add('oculto');
  document.getElementById('app-principal').classList.remove('oculto');
  mostrarVista('vista-menu');
}

function registrarUsuario() {
  const usuario = document.getElementById('reg-usuario').value.trim();
  const correo = document.getElementById('reg-correo').value.trim();
  if (!usuario || !correo) {
    alert('Completa todos los campos para registrarte.');
    return;
  }
  alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
  cambiarAuth('form-login');
}

function recuperarPassword() {
  const correo = document.getElementById('rec-correo').value.trim();
  if (!correo) {
    alert('Ingresa tu correo electrónico.');
    return;
  }
  alert('Se ha enviado un enlace de recuperación a ' + correo);
  cambiarAuth('form-login');
}

function cerrarSesion() {
  document.getElementById('app-principal').classList.add('oculto');
  document.getElementById('vista-auth').classList.remove('oculto');
  cambiarAuth('form-login');
}

// Navegación entre vistas y módulos
function mostrarVista(vistaId) {
  const vistas = document.querySelectorAll('.vista');
  vistas.forEach(v => v.classList.add('oculto'));
  document.getElementById(vistaId).classList.remove('oculto');

  // Actualizar pestañas activas
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('activa'));
  if (vistaId === 'vista-chat') {
    document.getElementById('tab-chat').classList.add('activa');
  } else if (vistaId === 'vista-contacto') {
    document.getElementById('tab-contacto').classList.add('activa');
  } else {
    document.getElementById('tab-menu').classList.add('activa');
  }

  // Mostrar botón "Regresar" en submódulos y "Salir" en el menú principal
  const btnRegresar = document.getElementById('btn-regresar');
  const btnSalir = document.getElementById('btn-salir');
  if (vistaId === 'vista-menu') {
    btnRegresar.classList.add('oculto');
    btnSalir.classList.remove('oculto');
  } else {
    btnRegresar.classList.remove('oculto');
    btnSalir.classList.add('oculto');
  }
}

// Mostrar u ocultar información extra en Tips y Normatividad
function alternarDetalle(idElemento) {
  const el = document.getElementById(idElemento);
  el.style.display = (el.style.display === 'block') ? 'none' : 'block';
}

// Lógica del Módulo Test
const preguntasTest = {
  1: {
    pregunta: '¿Qué es la Inteligencia Artificial generativa?',
    opciones: [
      { texto: 'Una herramienta capaz de crear texto, imágenes o código nuevo a partir de patrones aprendidos.', correcta: true },
      { texto: 'Un antivirus exclusivo para redes sociales.', correcta: false }
    ]
  },
  2: {
    pregunta: '¿Cuál es un riesgo común al usar IA generativa sin supervisión?',
    opciones: [
      { texto: 'Compartir información confidencial o difundir datos falsos (alucinaciones).', correcta: true },
      { texto: 'Que se borre el sistema operativo de la computadora.', correcta: false }
    ]
  },
  3: {
    pregunta: '¿Cuál es una buena práctica antes de publicar contenido generado por IA?',
    opciones: [
      { texto: 'Verificar la veracidad de los datos y respetar los derechos de autor.', correcta: true },
      { texto: 'Publicarlo directamente sin leerlo.', correcta: false }
    ]
  }
};

function iniciarTest(numero) {
  const data = preguntasTest[numero];
  const caja = document.getElementById('caja-quiz');
  const opcionesDiv = document.getElementById('quiz-opciones');
  const resultado = document.getElementById('quiz-resultado');

  caja.classList.remove('oculto');
  document.getElementById('quiz-pregunta').textContent = data.pregunta;
  opcionesDiv.innerHTML = '';
  resultado.textContent = '';

  data.opciones.forEach(op => {
    const btn = document.createElement('button');
    btn.className = 'btn-secundario';
    btn.textContent = op.texto;
    btn.onclick = () => {
      resultado.textContent = op.correcta
        ? '¡Correcto! Excelente manejo de la IA.'
        : 'Incorrecto. Revisa los módulos de Tips y Normatividad.';
      resultado.style.color = op.correcta ? 'green' : '#d93025';
    };
    opcionesDiv.appendChild(btn);
  });
}

// Lógica del Chat Agente
function enviarPregunta() {
  const input = document.getElementById('input-pregunta');
  const texto = input.value.trim();
  if (!texto) return;

  agregarMensaje(texto, 'usuario');
  input.value = '';

  const respuesta = generarRespuestaAgente(texto.toLowerCase());
  setTimeout(() => agregarMensaje(respuesta, 'agente'), 300);
}

function cargarChatDemo(pregunta) {
  agregarMensaje(pregunta, 'usuario');
  const respuesta = generarRespuestaAgente(pregunta.toLowerCase());
  setTimeout(() => agregarMensaje(respuesta, 'agente'), 300);
}

function agregarMensaje(texto, emisor) {
  const contenedor = document.getElementById('mensajes-chat');
  const div = document.createElement('div');
  div.className = 'mensaje ' + emisor;
  div.textContent = texto;
  contenedor.appendChild(div);
  contenedor.scrollTop = contenedor.scrollHeight;
}

function generarRespuestaAgente(pregunta) {
  if (pregunta.includes('prompt')) {
    return 'Para un buen prompt: asigna un rol, explica el contexto, sé específico con la tarea e indica el formato de salida.';
  }
  if (pregunta.includes('privacidad') || pregunta.includes('datos') || pregunta.includes('seguro')) {
    return 'Nunca compartas contraseñas, CURP, datos bancarios ni información sensible en chats de IA generativa.';
  }
  if (pregunta.includes('ley') || pregunta.includes('norma') || pregunta.includes('autor')) {
    return 'El Reglamento de IA de la Unión Europea clasifica los sistemas por nivel de riesgo y exige transparencia en el uso de datos y derechos de autor.';
  }
  return 'Recuerda siempre verificar la información generada por la IA antes de compartirla y proteger tus datos personales.';
}