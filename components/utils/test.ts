export function flushMicroTasks() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

export function noop() {}
