const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config()
const { OpenAI } = require('openai'); // Importa la biblioteca de OpenAI

app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Reemplaza con tu clave API de OpenAI
});

// Función para generar código optimizado
function generarCodigoOptimizado(codigoMejorado) {
  try {
    // Validación de sintaxis y semántica (puedes agregar validaciones aquí si es necesario)
    // Si el código no es válido, puedes manejar el error aquí y devolver un mensaje de error adecuado.

    // Procesamiento adicional si es necesario (puedes agregar más lógica aquí)

    // Devuelve el código optimizado
    return codigoMejorado;
  } catch (error) {
    console.error('Error en la generación de código optimizado:', error);
    throw error; // Maneja el error y devuelve un mensaje de error adecuado si es necesario.
  }
}

app.use(express.static(path.join(__dirname, 'public')));

app.post('/optimizar', async (req, res) => {
  try {
    const { codigo } = req.body;

    // Llamada a la API de GPT-3
    const respuesta = await openai.createCompletion({
      engine: 'text-davinci-002',
      prompt: `Optimiza el siguiente código JavaScript:\n\n${codigo}`,
      max_tokens: 100,
    });

    // Obtiene y muestra las sugerencias generadas por GPT-3
    const sugerencias = respuesta.choices[0].text;

    // Aplicar las sugerencias al código original
    const codigoOptimizado = codigo.replace(/\/\* sugerencia:\s*(.*?)\s*\*\//g, (match, suggestion) => suggestion);

    // Generar el código optimizado
    const codigoGenerado = generarCodigoOptimizado(codigoOptimizado);

    res.json({ sugerencias, codigoOptimizado, codigoGenerado });
  } catch (error) {
    console.error('Error en la optimización:', error);
    res.status(500).json({ error: 'Error en la optimización' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}`);
});
