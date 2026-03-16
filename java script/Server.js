
class Server {
  constructor(name,div) {
    this.name = name;
    this.div=div;
    this.incomingPackagesQueue = [];
    this.outgoingPackages = [];
    this.clientsArray = [];
    this.log = [];
    this.cables = [];
    this.status = "OFF";
    this.animationDelay = 2000;
  }

  receivePackage(pkg) {
    pkg.updateStatus("RECEIVED_BY_NASA_SERVER");
    this.packageHandling(pkg);
  }

  getCableForClient(client) {
    return this.cables.find((cable) => cable.connectionClient === client);
  }

  packageHandling(pkg) {
    const receiverClient = this.clientsArray.find(
      (client) => pkg.receiverName === client.name
    );
    const cable = this.getCableForClient(receiverClient);
    cable.sendPackageToClient(pkg);
  }
  addClient(client) {
    this.clientsArray.push(client);
  }

  getClientByName(name) {
    return this.clientsArray.find((client) => client.name === name);
  }

  setStatus(newStatus) {
    this.status = newStatus;
    this.addLog(newStatus);
  }

  addLog(message) {
    this.log.push(`[${new Date().toLocaleTimeString()}] ${message}`);
    
  }

  enterOutgoingPackages(pkg) {
    this.outgoingPackages.push(pkg);
  }

  enterIncomingPackagesQueue(pkg) {
    this.incomingPackagesQueue.push(pkg);
  }

}