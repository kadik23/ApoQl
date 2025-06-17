import { createClient } from "redis";

const client = createClient({
  password: process.env.REDIS_PW,
  socket: {
    host: process.env.REDIS_HOST as string,
    port: parseInt(process.env.REDIS_PORT as string) ,
  },
});

client.on("error", (err) => console.log(err));

if (!client.isOpen) {
  client.connect();
}

// client.set('name', 'mario')

export { client };
