const divServer = document.getElementById('imgServer');
const server = new Server("NASA", divServer);

function createClients() {
  const clientsContainer = document.getElementById("clients-container");
  const NUM_CLIENTS = 5;
  const dataClients = [
    ["teleskop", "images/Satellite.png", 1111],
    ["seklayev", "images/spaceship.png", 2222],
    ["astronaut", "images/astronaut_3.png", 3333],
    ["apolo", "images/Apollo_Soyuz_3.png", 4444],
    ["shabtai", "images/Saturn_2.png", 5555],
  ];
  for (let i = 0; i < NUM_CLIENTS; i++) {
    const clientDiv = document.createElement("div");
    clientDiv.classList.add("client");
    const img = document.createElement("img");
    img.src = dataClients[i][1];
    clientDiv.appendChild(img);
    clientsContainer.appendChild(clientDiv);
    const client = new Client(
      dataClients[i][0],
      dataClients[i][1],
      dataClients[i][2]
    );
    client.div = clientDiv;
    server.addClient(client);
    let messageModal = null;
    img.addEventListener("click", () => {
      createMessageModal(client, messageModal);
    });
    const cable = new Cable(server, client);
    server.cables.push(cable);
  }
}

function createMessageModal(client, messageModal) {
  const clientDiv = getClientElement(client);
  if (clientDiv.querySelector(".message-modal")) {
    return;
  }

  const recipients = [
    { name: "teleskop", label: "📡 Teleskop" },
    { name: "seklayev", label: "🚀 Space Shuttle" },
    { name: "astronaut", label: "👨‍🚀 Astronaut" },
    { name: "apolo", label: "🛰️ Apollo-Soyuz" },
    { name: "shabtai", label: "🪐 Saturn" },
  ];

  messageModal = document.createElement("div");
  messageModal.classList.add("message-modal");

  const selectOptionsHTML = recipients
    .filter(recipient => recipient.name !== client.name)
    .map(recipient => `<option value="${recipient.name}">${recipient.label}</option>`)
    .join("");

  messageModal.innerHTML = `
    <h2 class="modal-title">📤 Transmit Message</h2>

    <label for="recipient-select">Select Destination:</label>
    <select id="recipient-select">
      ${selectOptionsHTML}
    </select>
    <textarea placeholder="Begin space transmission..." required></textarea>
    <button class="send-button">Transmit</button>
    <button class="close-button">❌</button>
  `;
  messageModal.querySelector(".close-button").onclick = () => {
    messageModal.remove();
  };
  messageModal.querySelector(".send-button").onclick = () => {
    const recipientName = messageModal.querySelector("#recipient-select").value;
    const message = messageModal.querySelector("textarea").value.trim();
    if (message) {
      sendMessageTo(client, recipientName, message);
      messageModal.remove();
    }
  };

  openMessageModal(client, messageModal);
}


function openMessageModal(client, messageModal) {
  if (!messageModal) return;

  messageModal.querySelector(
    ".modal-title"
  ).textContent = `🚀 Send a Transmission from  ${client.name}`;
  messageModal.querySelector("textarea").value = "";
  messageModal.querySelector("#recipient-select").selectedIndex = 0;
  const clientDiv = getClientElement(client);
  if (clientDiv) {
    const rect = clientDiv.getBoundingClientRect();
    messageModal.style.top = `${rect.top + window.scrollY + 20}px`;
    messageModal.style.left = `${rect.left + window.scrollX + 20}px`;
  }
  clientDiv.appendChild(messageModal);
  messageModal.style.position = "absolute";
  messageModal.style.left = "105%";
  messageModal.style.top = "0";
  messageModal.style.display = "block";
}

function sendMessageTo(sender, recipientName, message) {
  const newPackage = new Package(sender, recipientName, message);
  const cable = server.getCableForClient(sender);
  if (cable) {
    cable.sendPackageToServer(newPackage);
  }
}

function getClientElement(client) {
  return document.querySelector(
    ` .client img[src="${client.imageSrc}"]`
  )?.parentElement;
}


function showHolographicMessage(message, sender, divOfMessagesBox) {
  const hologramContainer = document.createElement('div');
  hologramContainer.className = 'hologram-message';
    const messageContent = document.createElement('div');
  messageContent.className = 'hologram-content';
  const senderElement = document.createElement('div');
  senderElement.className = 'hologram-sender';
  senderElement.textContent = sender || 'שולח לא ידוע';
  
  const textElement = document.createElement('div');
  textElement.className = 'hologram-text';
  textElement.textContent = message;
  
  const timeElement = document.createElement('div');
  timeElement.className = 'hologram-time';
  const now = new Date();
  timeElement.textContent = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  const closeButton = document.createElement('button');
  closeButton.className = 'hologram-close';
  closeButton.textContent = '×';
  closeButton.onclick = function() {
    divOfMessagesBox.removeChild(hologramContainer);
    
  };
  
  messageContent.appendChild(senderElement);
  messageContent.appendChild(textElement);
  messageContent.appendChild(timeElement);
  hologramContainer.appendChild(closeButton);
  hologramContainer.appendChild(messageContent);
  
  divOfMessagesBox.appendChild(hologramContainer);
  
  setTimeout(() => {
    hologramContainer.classList.add('hologram-visible');
  }, 10);
}

function addMessageToLog(message, sender) {
  let messageLog = document.getElementById('message-log');
  
  if (!messageLog) {
    messageLog = document.createElement('div');
    messageLog.id = 'message-log';
    messageLog.className = 'message-log';
    
    const logButton = document.createElement('button');
    logButton.id = 'log-button';
    logButton.className = 'log-button';
    logButton.innerHTML = '<img src="images/iconLog2.png" alt="הודעות" />';
    logButton.onclick = function() {
      messageLog.classList.toggle('log-visible');
    };
    
    document.body.appendChild(logButton);
    document.body.appendChild(messageLog);
  }
  
  const logEntry = document.createElement('div');
  logEntry.className = 'log-entry';
  
  const logTime = document.createElement('span');
  logTime.className = 'log-time';
  const now = new Date();
  logTime.textContent = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  const logSender = document.createElement('span');
  logSender.className = 'log-sender';
  logSender.textContent = sender || 'שולח לא ידוע';
  
  const logText = document.createElement('div');
  logText.className = 'log-text';
  logText.textContent = message;
  
  logEntry.appendChild(logTime);
  logEntry.appendChild(logSender);
  logEntry.appendChild(logText);
  
  messageLog.appendChild(logEntry);
}
window.addEventListener("DOMContentLoaded", () => {
  createClients();
});

