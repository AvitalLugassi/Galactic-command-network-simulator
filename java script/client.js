class Client {
  constructor(name, imageSrc, address) {
    this.name = name;
    this.div;
    this.address = address;
    this.imageSrc = imageSrc;
    this.messages = [];
    this.currentPackage = null;
    this.connectedCable = null;
  }


  setCurrentPackage(newPackage) {
    this.currentPackage = newPackage;
  }
  getPackageFromCable(newPackage) {
    this.setCurrentPackage(newPackage);
    this.messages.push(newPackage);
    const audio = new Audio('audio/message.wav'); 
    audio.play();
    addMessageToLog(newPackage.content, newPackage.sender.name);
    if(this.div.querySelector('.dot-indicator'))
    {
      return;
    }
    const showButton = document.createElement('button');
    showButton.textContent = "to show my messages";
    showButton.title = "New message available";

    showButton.classList.add('button', 'minimal', 'dot-indicator');

    this.div.appendChild(showButton);
    showButton.addEventListener('click', () => {

        showHolographicMessage(this.currentPackage.content, this.currentPackage.sender.name, this.div);
  
      showButton.remove();
    });
  }
}