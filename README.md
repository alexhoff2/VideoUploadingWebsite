# Video Uploading Website

A web application that allows users to upload, describe, and comment on videos. The platform provides a user-friendly interface for sharing and discussing video content.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [License](#license)
- [Author](#author)

## Features

- **Video Uploading**: Users can upload videos with descriptions.
- **Commenting System**: Users can comment on videos to engage in discussions.
- **Search Functionality**: A toolbar search feature to find videos easily.
- **Thumbnail Display**: Visual representation of videos for quick browsing.

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript
- **Database**:
  - MySQL
- **Other**:
  - FFmpeg for video processing

## Getting Started

### Prerequisites

- Node.js installed
- MySQL installed and running
- FFmpeg installed and accessible in your system's PATH

### Installation

1. Clone the repository:
   git clone https://github.com/alexhoff2/VideoUploadingWebsite.git
   cd VideoUploadingWebsite

2. Install dependencies:
   npm install

3. Set up the database:
   - Create a MySQL database named `video_uploads`.
   - Run the SQL script provided in the `database` directory to set up the necessary tables.

4. Configure environment variables:
   - Rename `.env.example` to `.env`.
   - Update the `.env` file with your database credentials and other configurations.

### Running the Application

1. Start the server:
   npm start

2. Access the application:
   Open your browser and navigate to http://localhost:3000

## Usage

- Upload a Video: Navigate to the upload section, provide a title and description, and select the video file to upload.
- Browse Videos: View the homepage to see all uploaded videos with thumbnails.
- Search Videos: Use the search bar to find videos by title or description.
- Comment on Videos: Open a video and add your comments in the discussion section.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Author

- Alex Hoff - https://github.com/alexhoff2
