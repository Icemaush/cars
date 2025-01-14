# Cars Application

## Overview
The **Cars Application** is a web-based platform built with **.NET 9** for the backend API and **React** with **TypeScript** and **Material UI** for the frontend. The application provides users with an interface to view a table of car data, including details such as registration status, and allows users to filter this data based on specific search criteria.

The system also includes a **Background Service** running on the backend that retrieves and updates the car registration status. The registration status information is pushed to the frontend in real-time via **SignalR WebSockets**.

## Features
- **Car Data Table:** View a list of cars with relevant details.
- **Search Filter:** Filter cars based on different criteria (e.g., make, model, year).
- **Registration Status:** Display real-time car registration status on the **Registrations page**.
- **Background Service:** A background task periodically retrieves registration status updates for each car.
- **Real-Time Updates:** Real-time communication between the backend and frontend using **SignalR** to broadcast registration status updates.

## Tech Stack

### Backend:
- **.NET 9** - Backend API
- **SignalR** - Real-time web socket communication for broadcasting registration status
- **Background Service** - A service to periodically retrieve car registration status

### Frontend:
- **React** - Frontend UI
- **TypeScript** - For type safety in the frontend
- **Material UI** - Component library
- **Axios** - For HTTP requests from the frontend to the backend
