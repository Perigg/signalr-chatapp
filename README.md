# SignalR Chat Application

## Introduction
This project is a real-time chat application built with **ASP.NET Core** and **SignalR**. It allows multiple users to connect to a chat room and exchange messages in real-time. The focus is on secure communication using WebSockets with fallback protocols, HTTPS encryption with a self-signed certificate, and input sanitization to ensure the safety of data transmission.

## Features
- Real-time communication between multiple users using **SignalR** with **WebSockets** and fallback protocols.
- Secure messaging via **SSL/TLS** using a self-signed certificate.
- Input sanitization using **DOMPurify** to prevent **XSS** (Cross-Site Scripting) attacks.

## Requirements
To run the project, you will need:
- **.NET 6 SDK** or later.
- **Visual Studio** or **Visual Studio Code**.
- **Git** for cloning the repository.
- A **web browser** to interact with the chat.

## Setup Instructions
Follow these steps to get the application up and running:

### 1. Clone the Repository
First, clone this repository to your local machine using Git:
```sh
git clone https://github.com/yourusername/signalr-chatapp.git
```

### 2. Navigate to the Project Directory
Change to the project directory:
```sh
cd signalr-chatapp
```

### 3. Install Dependencies

- **SignalR Package**: You also need the **Microsoft.AspNetCore.SignalR** package for the server-side SignalR hub. To add this package, run:
  ```sh
  dotnet add package Microsoft.AspNetCore.SignalR
  ```

### 4. Trust the Self-Signed Certificate
This application requires HTTPS. You need to trust the self-signed certificate for local development:
```sh
dotnet dev-certs https --trust
```

### 5. Run the Application
To start the application, run the following command:
```sh
dotnet run
```
The application will be accessible at `https://localhost:7152`.

### 6. Open the Application in Your Browser
Open your preferred web browser and navigate to `https://localhost:7152` to use the chat.

## Usage Instructions
1. **Enter Your Name**: In the input field labeled **"Name"**, enter your name.
2. **Start Chatting**: Enter a message in the message field and click **Send** or press **Enter** to send the message.
3. **Real-Time Updates**: Messages sent by all users will be displayed in real-time.

## Security Features
- **HTTPS**: All communication between the client and the server is encrypted using **SSL/TLS**.
- **Input Sanitization**: User inputs are sanitized to prevent **XSS** attacks, using the **DOMPurify** library.

## Troubleshooting
- **Connection Issues**: If the connection to the chat hub is lost, ensure that you are running the application with HTTPS enabled.
- **Certificate Warnings**: If your browser shows a certificate warning, make sure you have trusted the self-signed certificate using `dotnet dev-certs https --trust`.
