const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
  onConnect(session, cb) {
    console.log('Client connected:', session.remoteAddress);
    cb(); // Accept the connection
  },

  onData(stream, session, cb) {
    let chunks = [];
    
    // Handle incoming data (email content)
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });

    stream.on('end', () => {
      const emailContent = Buffer.concat(chunks).toString();
      console.log('Received email content:');
      console.log(emailContent);
      cb(); // Accept the email
    });
  },

  onClose(session) {
    console.log('Connection closed:', session.remoteAddress);
  },

  // Other event handlers can be added based on your requirements

});

server.listen(25, () => console.log('Server running on port 25'));
