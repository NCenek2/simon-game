class Queue {
  constructor() {
    this.queue = new LinkedList();
    this.length = 0;
  }

  enqueue(value) {
    this.queue.append(value);
    let front = this.queue.head.value;
    this.length++;
    return front;
  }

  dequeue() {
    if (this.length == 0) return null;
    let front = this.queue.head.value;
    this.queue.removeHead();
    this.length--;
    return front;
  }

  clear() {
    this.queue = new LinkedList();
    this.length = 0;
  }

  print() {
    if (this.queue.length == 0) {
      console.log("Empty Queue");
      return;
    }
    let current = this.queue.head;
    let output = "Front: ";
    while (current.next) {
      output = `${output}${current.value} -> `;
      current = current.next;
    }

    console.log(`${output}${current.value}`);
  }
}
