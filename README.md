
# Civic Fix

**Civic Fix** is a full-stack web application for reporting and tracking civic issues in your locality. It allows users to submit issues with location details, view reports on a map, and ensures secure authentication.

## Features

- **User Authentication**: Secure login and registration using Firebase.
- **Full-Stack Implementation**: Spring Boot backend, React frontend, and MySQL database.
- **Location-Based Reporting**: Integrated Mapbox API for pinpointing civic issues on a map.
- **Image Linking**: Users can submit hosted image links for issue documentation.
- **Admin Functionality**: Real-time tracking of reported issues.

## Tech Stack

- **Backend**: Spring Boot, MySQL
- **Frontend**: React, HTML, CSS
- **Authentication**: Firebase
- **Maps & Location**: Mapbox API

## Installation

1. Clone the repository:

```bash
git clone git@github.com:PratheekGaba-111/CivicFix.git
```

2. Navigate to the backend folder and run:

```bash
./mvnw spring-boot:run
```

3. Navigate to the frontend folder and run:

```bash
npm install
npm start
```

4. Open the application at `http://localhost:3000`.

## Usage

1. Register or log in as a user.  
2. Submit a civic issue with location and image link.
3. The submission is saved in the MySQL Database

## License

This project is licensed under the MIT License.
