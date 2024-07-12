const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpunkt zum Öffnen einer URL im Standardbrowser
app.get('/open-url', (req, res) => {
	console.log(req.query);
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Befehl zum Öffnen der URL im Standardbrowser des PCs
  let command;
  switch (process.platform) {
    case 'darwin': // MacOS
      command = `open "${url}"`;
      break;
    case 'win32': // Windows
      command = `start "" "${url}"`;
      break;
    case 'linux': // Linux
      command = `xdg-open "${url}"`;
      break;
    default:
      return res.status(500).json({ error: 'Unsupported platform' });
  }

  // Ausführen des Befehls
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      return res.status(500).json({ error: 'An error occurred while opening the URL' });
    }
    console.log(`URL opened: ${url}`);
    res.status(200).json({ message: 'URL opened successfully' });
  });
});

// Starten des Servers
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
