document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const nombre = document.getElementById('nombre');
  const email = document.getElementById('email');
  const mensaje = document.getElementById('mensaje');

  // Animación de aparición del formulario
  form.classList.add('animate-fade-in');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let valido = true;

    if (nombre.value.trim() === '') {
      showError(nombre, '[translate:Por favor ingresa tu nombre]');
      valido = false;
    }

    if (!validateEmail(email.value.trim())) {
      showError(email, '[translate:Por favor ingresa un correo electrónico válido]');
      valido = false;
    }

    if (mensaje.value.trim() === '') {
      showError(mensaje, '[translate:Por favor escribe tu mensaje]');
      valido = false;
    }

    if (valido) {
      showSuccess();
      form.reset();
    }
  });

  function showError(element, mensaje) {
    const error = document.createElement('small');
    error.textContent = mensaje;
    error.classList.add('error-message');
    element.parentNode.insertBefore(error, element.nextSibling);
    element.classList.add('input-error');
  }

  function clearErrors() {
    const errors = form.querySelectorAll('small.error-message');
    errors.forEach(err => err.remove());

    [nombre, email, mensaje].forEach(field => {
      field.classList.remove('input-error');
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showSuccess() {
    const successMsg = document.createElement('div');
    successMsg.textContent = '[translate:¡Formulario enviado con éxito!]';
    successMsg.classList.add('success-message');
    form.prepend(successMsg);

    setTimeout(() => {
      successMsg.classList.add('fade-out');
      successMsg.addEventListener('transitionend', () => {
        successMsg.remove();
      });
    }, 3000);
  }
});

