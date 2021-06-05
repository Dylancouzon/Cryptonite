const { parentPort, workerData } = require("worker_threads");

// Temporarily replace the hash function by a random generator.
fib = ()=> {
    let hash = 0;
    while (hash !== 780000000) {
        hash = Math.floor(Math.random() * 1000000000);
    }
    return true;
}
  

  // Main thread will pass the data
  // through this event listener.
  parentPort.on("message", (param) => {
    if (typeof param !== "number") {
      throw new Error("param must be a number.");
    }
    const result = fib(param);
  
    // return the result to main thread.
    parentPort.postMessage(result);
  });