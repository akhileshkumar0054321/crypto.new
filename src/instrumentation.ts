import EventEmitter from "events";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Increase defaultMaxListeners on EventEmitter to prevent spurious memory leak warnings on high-concurrency sockets
    EventEmitter.defaultMaxListeners = 100;
    if (typeof process !== "undefined" && typeof process.setMaxListeners === "function") {
      process.setMaxListeners(100);
    }
  }
}
