const htmlIndex = `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Test</title>
  </head>
  <body>
	  <img src="https://i.kym-cdn.com/photos/images/original/002/418/805/8e5.gif" width="500" />

    <h1 id="dataOutput">test </h1>
    <canvas id='myCanvas'></canvas>

    <script>
        const dataElement = document.getElementById('dataOutput');
        const canvasElement = document.getElementById('myCanvas');

        //Getting a test message from the external TypeScript
        // Handle the message inside the webview
        window.addEventListener('message', event => {

            const message = event.data; // The JSON data our extension sent
            
            if (message.command)
            {
              switch (message.command)
              {
                case 'resetText':
                  dataElement.textContent = "";
                  break;
                default:
                  break;
              }
            }
            else
            {
              dataElement.textContent = dataElement.textContent + message.messageData;
            }
        });

        //Testing the canvas
        
    </script>
  </body>
  </html>`;

export default htmlIndex;
