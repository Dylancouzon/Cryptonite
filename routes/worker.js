const { parentPort, workerData } = require("worker_threads");

fib = ()=> {
    let hash = 0;
    console.log("starting the hash")
    while (hash !== 780000000) {
        hash = Math.floor(Math.random() * 1000000000);
    }
    return true;
}
  
  // Main thread will pass the data you need
  // through this event listener.
  parentPort.on("message", (param) => {
    if (typeof param !== "number") {
      throw new Error("param must be a number.");
    }
    const result = fib(param);
  
    // return the result to main thread.
    parentPort.postMessage(result);
  });