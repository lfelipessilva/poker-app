import { NextApiRequest } from "next";
import { Server } from 'socket.io'

const SocketHandler = (req: NextApiRequest, res: any) => {
  console.log(req.body);
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on("connection", (socket) => {
      console.log('connection on:', socket);
    });
  }

  res.end()
}

export default SocketHandler
