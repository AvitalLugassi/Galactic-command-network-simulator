class Package {
  constructor(sender, receiverName, content) {
    this.sender = sender;
    this.receiverName = receiverName;
    this.content = content;
    this.timestamp = Date.now();
    this.status = "CREATED"; 
  }

  updateStatus(newStatus) {
    this.status = newStatus;
  }
}