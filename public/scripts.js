document.getElementById('urlForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const urlInput = document.getElementById('urlInput');
    const shortUrlDiv = document.getElementById('shortUrl');
  
    try {
      const response = await fetch('/encurtar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: urlInput.value })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        shortUrlDiv.style.display = 'block';
        shortUrlDiv.textContent = `URL encurtada: ${data.short_url}`;
        urlInput.value = '';
      } else {
        shortUrlDiv.style.display = 'none';
        alert(data.error);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.');
    }
  });
  