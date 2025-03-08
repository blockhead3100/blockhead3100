const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
let clients = [];

wss.on('connection', (ws) => {
    clients.push(ws);

        ws.on('message', (message) => {
                const data = JSON.parse(message);

                        if (data.type === 'update') {
                                    // Broadcast the game state to all connected clients
                                                clients.forEach(client => {
                                                                if (client !== ws && client.readyState === WebSocket.OPEN) {
                                                                                    client.send(message);
                                                                                                    }
                                                                                                                });
                                                                                                                        } else if (data.type === 'newGame') {
                                                                                                                                    // Broadcast the new game state to all connected clients
                                                                                                                                                clients.forEach(client => {
                                                                                                                                                                if (client.readyState === WebSocket.OPEN) {
                                                                                                                                                                                    client.send(message);
                                                                                                                                                                                                    }
                                                                                                                                                                                                                });
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                ws.on('close', () => {
                                                                                                                                                                                                                                        clients = clients.filter(client => client !== ws);
                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                            console.log('WebSocket server is running on ws://localhost:8080');