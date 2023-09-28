// Captura los elementos del formulario y del resultado
const codeForm = document.getElementById('codeForm');
const tituloInput = document.getElementById('titulo');
const codeTextarea = document.getElementById('code');
const codigoOptimizadoTextarea = document.getElementById('codigoOptimizado');
const descargarCodigoLink = document.getElementById('descargarCodigo');
const copiarCodigoButton = document.getElementById('copiarCodigo');

// Maneja la presentación del resultado
codeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = tituloInput.value;
  const codigo = codeTextarea.value;

  // Envía el código al servidor para su optimización
  const response = await fetch('/optimizar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ titulo, codigo }),
  });

  // Obtiene y muestra el código optimizado
  const data = await response.json();
  const codigoOptimizado = data.codigoOptimizado;

  codigoOptimizadoTextarea.value = codigoOptimizado;

  // Actualiza el enlace de descarga con el título
  descargarCodigoLink.download = `${titulo}.js`;
  descargarCodigoLink.href = `data:text/javascript;charset=utf-8,${encodeURIComponent(codigoOptimizado)}`;
});

// Maneja el botón de copiar código
copiarCodigoButton.addEventListener('click', () => {
  codigoOptimizadoTextarea.select();
  document.execCommand('copy');
  alert('Código copiado al portapapeles');
});