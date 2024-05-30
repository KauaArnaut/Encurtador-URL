const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/encurtar', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL inválida' });
  }

  try {
    const response = await axios.post('https://cleanuri.com/api/v1/shorten', {
      url: url,
    });

    res.json({ short_url: response.data.result_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao encurtar URL' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
