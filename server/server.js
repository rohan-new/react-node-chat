const express = require('express');
const socketIo = require('socket.io');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');




const app = express();
const port = process.env.PORT ||3001 ;
const pathjoin = path.join(__dirname, '../public');
var server = http.createServer(app);
var io = socketIo(server);

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if(process.env.NODE_ENV === 'production'){


app.use(express.static(path.join(__dirname, "client/build")))

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
}







  var server = http.createServer(app);
  var io = socketIo(server);

  io.on('connection',(socket)=>{
    console.log('New socket Connection with id' + socket.id);
 
    socket.on('SEND_MESSAGE',(data)=>{
      socket.emit('selfmessage',{
        text:data.message
      });
      socket.broadcast.to(data.room).emit('newmessage',{
        text:data.message,
        name:data.name
      });
    })

    socket.on('room_name',(data)=>{
      socket.join(data.room);
      socket.room = data.room;
      socket.name = data.name;

      
     socket.broadcast.to(data.room).emit('groupjoined',{
       name:data.name,
       id:socket.id
     });
    });

    socket.on('newjoin',(data)=>{
      socket.broadcast.to(data.id).emit('myname',{
        name:data.name
      })
    })

   socket.on('myname',(data)=>{
     socket.broadcast.to(socket.rooms).emit('names',{
       names:data.name
     });
   })

   socket.on('disconnect',()=>{
     console.log('socket disconnected with id ' +socket.id);
     socket.broadcast.to(socket.room).emit('leave',{
         name: socket.name
     })
   });

  });
 




  server.listen(port,()=>{
    console.log('server started');
  });


