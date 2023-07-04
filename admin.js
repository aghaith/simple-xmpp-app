// we bring in the server library
import xmpp from "simple-xmpp";

// this function recursively call itself by sending the provided message every 5 seconds.
function send() {
    setTimeout(send, 5000);
    xmpp.send("myself@localhost", `hi! Today is ${new Date().toLocaleString()}`);
}

//if online, that is connected to the server the send function will be executed and log to console
xmpp.on("online", (data) => {
    console.log("hello, you are live!");
    console.log(`Connected as ${data.jid.user}`);
    send();
});

// if chat was received from other client, the log will be executed
xmpp.on("chat", (from, message) => {
    console.log(`Got a message! ${message} from ${from}`);
});

// connect method requires object with parameters below
xmpp.connect({
    jid: "admin@localhost",
    password: "mypassword1",
});

export default send;
