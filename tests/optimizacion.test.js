const { generarCodigoOptimizado } = require('../app'); // Asegúrate de importar la función que deseas probar

test('La función generarCodigoOptimizado debería optimizar correctamente el código', () => {
  const codigoOriginal = '/* sugerencia: Optimiza esto */\nconst x = 5 + 5;';
  const codigoEsperado = 'const x = 10;'; // El código optimizado esperado

  const codigoOptimizado = generarCodigoOptimizado(codigoOriginal);

  expect(codigoOptimizado).toBe(codigoEsperado);
});