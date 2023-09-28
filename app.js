const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const terser = require('terser');

app.use(bodyParser.json());

// Función para generar código optimizado utilizando Terser
async function generarCodigoOptimizado(codigo) {
  try {
    const resultado = await terser.minify(codigo);
    if (resultado.error) {
      throw resultado.error;
    }
    return resultado.code;
  } catch (error) {
    console.error('Error en la generación de código optimizado:', error);
    throw error;
  }
}

app.use(express.static(path.join(__dirname, 'public')));

app.post('/optimizar', async (req, res) => {
  try {
    const { codigo } = req.body;

    // Genera el código optimizado utilizando Terser
    const codigoOptimizado = await generarCodigoOptimizado(codigo);

    res.json({ codigoOptimizado });
  } catch (error) {
    console.error('Error en la optimización:', error);
    res.status(500).json({ error: 'Error en la optimización' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}`);
});