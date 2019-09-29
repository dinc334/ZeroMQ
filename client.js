
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const zmq = require("zeromq"),
  pubSock = zmq.socket("pub");
  subSock = zmq.socket("sub")

const pubPort = process.argv[2];
const subPort = process.argv[3];

pubSock.connect(`tcp://127.0.0.1:${subPort}`);
subSock.connect(`tcp://127.0.0.1:${pubPort}`)
subSock.subscribe("api_out")

subSock.on("message", (topic, msg) => {
	const bytesArray = msg.toJSON().data
	const objectString  = bin2string(bytesArray)
	const json = JSON.parse(objectString)
	console.log(json.status === "ok" ? "\nok" : "\n",json.error)
})

const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Input login: ', (answer) => {
      resolve(answer)
    })
  })
}

const question2 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Input password: ', (answer) => {
      resolve(answer)
    })
  })
}

const main = async () => {
  const email = await question1()
  const pwd = await question2() 
  pubSock.send(["api_in", JSON.stringify({
  	type: "login",
  	email: email,
  	pwd: pwd,
  	msg_id: Date.now()
  })])
  main()
}

main()

// move to utils
function bin2string(array){
	var result = "";
	for(var i = 0; i < array.length; ++i){
		result+= (String.fromCharCode(array[i]));
	}
	return result;
}