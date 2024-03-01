# DonorSearch-Module

### Design in [figma](https://www.figma.com/file/TNcmbqiFct7lkv5qgFeSZ0/VINT---хакатон-SELECTEL?type=design&node-id=1-2&mode=design).

### Hackathon Task

The task is to develop a Telegram application, similar to the DonorSearch platform with WebApp feature.

### Strategy

We decided to approach the task systematically, beginning with the core features and gradually incorporating additional functionalities. We integrated authentication and registration features into the bot, along with donation management capabilities. Subsequently, we incorporated user profiles.

We opted not to utilize the provided API, instead opting to build our own database. In the future, it will be feasible to integrate the DonorSearch database in place of our current one.

### Our main advantages:
- Implementation of Core Functionality and Key Features
- Integration capabilities with existing systems
- User-friendliness

### Technologies Utilized in the Project:

- Bot - Python, aiogram3
- Server - aiohttp, nginx (proxy web server)
- Database - SQLalchemy library, PostgreSQL
- Web app - React, TypeScript, shadcn component library, vite bundler
- Storage Cloud - Selectel
Implementation Stages

#### Prototype and Design

- Developed user flow and logic based on existing functionality
- Designed in accordance with the design code of the main DonorSearch resource

#### Frontend

- Developed bot user interface
- Вeveloped a telegram web app with interfaces

#### Backend

- Building the project on the selectel server
- Development of telegram bot logic
- Сreating an api for webapp to work directly with the server via the database