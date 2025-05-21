import app from '@adonisjs/core/services/app'
import Ws from '#services/ws_service'
import Account from '#models/account'
app.ready(() => {
    Ws.boot()
    const io = Ws.io


    const users = [
        { id: "1", name: "Alice" },
        { id: "2", name: "Bob" },
        { id: "3", name: "Charlie" }
    ];

    // const onlineUsers = new Map<string,Account>(); // userId -> socketId
        const onlineUsers = new Map<string,string>(); // userId -> socketId



    io?.on("connection", (socket) => {
        console.log("✅ Client connecté :", socket.id);


        socket.on("register", (userId) => {
            const user = users.find((u) => u.id === userId);
            if (!user) {
                socket.emit("error", "Utilisateur inconnu !");
                return;
            }

            onlineUsers.set(userId, socket.id);
            console.log(`🧍 ${user.name} (ID: ${userId}) connecté`);
            io?.emit("online-users", Array.from(onlineUsers.keys()));
        });

        socket.on("private-message", ({ to, message, from }) => {
            const targetSocketId = onlineUsers.get(to);
            if (targetSocketId) {
                console.log({ from, message });
                console.log(targetSocketId);

                io?.to(targetSocketId).emit("private-message", { from, message });
            }
        });

        socket.on("disconnect", () => {
            for (const [userId, sockId] of onlineUsers.entries()) {
                if (sockId === socket.id) {
                    onlineUsers.delete(userId);
                    console.log(`❌ Utilisateur ${userId} déconnecté`);
                    io?.emit("online-users", Array.from(onlineUsers.keys()));
                    break;
                }
            }
        });

        socket.on('send-io-message', async (data) => {
            console.log('Event received:', data)

            // Set a timeout of 5 seconds
            const timeout = 5000

            // Execute some asynchronous task
            try {
                // Simulate a delay with a promise
                await new Promise((resolve) => setTimeout(resolve, timeout))
                Ws.io?.emit('ping', { message: 'pong send by adonisJS' })
                console.log('Asynchronous task completed')
            } catch (error) {
                console.error('Error:', error.message)
            }
        })
    });
})