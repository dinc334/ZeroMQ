
const zmq = require("zeromq"),
  pubSock = zmq.socket("pub");
  subSock = zmq.socket("sub")

const { Users } = require('./models');

const pubPort = process.argv[2];
const subPort = process.argv[3];

pubSock.bindSync(`tcp://127.0.0.1:${pubPort}`);
subSock.bindSync(`tcp://127.0.0.1:${subPort}`)
subSock.subscribe("api_in")

subSock.on("message", async (topic, msg) => {
	const bytesArray = msg.toJSON().data
	const objectString  = bin2string(bytesArray)
	const json = JSON.parse(objectString)
	if(json.type === "login") {
		const isUser = await Users.findOne({ where: {
			email: json.email,
			passw: json.pwd
		}})
		if(isUser) {
			pubSock.send(["api_out", JSON.stringify({
				msg_id: json.msg_id,
				user_id: isUser.msg_id,
				status: "ok"
			})])
		} else {
			pubSock.send(["api_out", JSON.stringify({
				msg_id: json.msg_id,
				status: "error",
				error: "WRONG_PWD"
			})])
		}
	}
});


// move to utils
function bin2string(array){
	var result = "";
	for(var i = 0; i < array.length; ++i){
		result+= (String.fromCharCode(array[i]));
	}
	return result;
}