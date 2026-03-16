# Galactic Command

**Galactic Command** is an interactive space-themed simulation of a communication network built with **HTML, CSS and JavaScript (Object-Oriented Programming)**.

The system simulates how messages travel between different space entities through a central command server (NASA).

##  Project Overview

In this simulation:

* **NASA acts as the central server**
* Space entities such as **Astronauts, Satellites, Space Shuttles and Planets** act as **clients**
* Messages are transmitted through **communication cables**
* Each message is wrapped in a **package** and routed by the server to the correct destination

The system visually demonstrates how a **client-server communication architecture** works.

##  Features

* Interactive **space communication network simulation**
* **Client-Server architecture**
* Object-Oriented JavaScript design
* Animated **laser message transmission**
* **Holographic message display**
* Message **log system**
* Dynamic UI interaction between clients
* Background **space animation with stars**

##  System Architecture

The project is implemented using several main classes:

* **Server** – NASA command center that routes messages
* **Client** – space entities that send and receive messages
* **Cable** – communication channel between server and clients
* **Package** – message container including sender, receiver and content

##  How It Works

1. The user selects a space entity (client).
2. A transmission window opens.
3. The user writes a message and selects a destination.
4. The message is packed into a **Package object**.
5. The message travels to **NASA (Server)**.
6. The server routes the message to the destination client.
7. The receiver displays the message as a **holographic notification**.

##  Technologies Used

* **HTML5**
* **CSS3**
* **JavaScript (OOP)**
* DOM Manipulation
* Canvas animations

##  Project Structure

```
index.html
java script/
   Server.js
   Client.js
   Cable.js
   Package.js
   app.js
   animateLaserBeam.js
   backgroundAnimation.js
images/
style/
audio/
```

##  Author

Student project – Interactive network communication simulation.

##  Inspiration

A space-themed interpretation of a **client-server messaging network**, visualizing how messages are routed through a central system.
