class Cable {
  constructor(connectionServer, connectionClient) {
    this.connectionServer = connectionServer;
    this.connectionClient = connectionClient;
    this.busy = false;
    this.packagesQueue = [];
  }

  setStatus() {
    this.busy = !this.busy;
  }
  pushToPackagesQueue(addPackage) {
    this.packagesQueue.push(addPackage);
  }
  selectRoutePackage() {
    if (this.packagesQueue.length > 0) {
      const nextPackage = this.packagesQueue.shift();
      if (nextPackage.status === "READY_FOR_TRANSMISSION")
        this.sendPackageToServer(nextPackage);
      else if (nextPackage.status === "RECEIVED_BY_NASA_SERVER")
        this.sendPackageToClient(nextPackage);
    } else this.setStatus();
  }
  sendPackageToServer(packageData) {
    if (this.busy) {
      packageData.updateStatus("READY_FOR_TRANSMISSION");
      this.pushToPackagesQueue(packageData);
      return;
    }
    this.setStatus();
    const fromElement = getClientElement(packageData.sender);
    const toElement = this.connectionServer.div;

    setTimeout(() => {
      if (fromElement && toElement) {
        animateLaserBeam(fromElement, toElement);
      }
      this.connectionServer.receivePackage(packageData);
      this.selectRoutePackage();
    }, 2000);
  }
  sendPackageToClient(packageData) {
    if (this.busy) {
      this.pushToPackagesQueue(packageData);
      return;
    }
    this.setStatus();
    packageData.updateStatus("ROUTING_TO_TARGET");
    const fromElement = this.connectionServer.div;
    const toElement = getClientElement(this.connectionClient);

    setTimeout(() => {
      if (fromElement && toElement) {
        animateLaserBeam(fromElement, toElement);
      }
      this.connectionClient.getPackageFromCable(packageData);
      this.selectRoutePackage();
    }, 1000);
  }
}
