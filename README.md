# MRSNet Web Interface and Middleware

## Overview

This repository contains the front-end and middleware code for the MRSNet project, a web-based interface for machine learning analysis on MR spectra data. Developed to complement a command line software engineered by Dr. Frank (check here: https://qyber.black/mrs/code-mrsnet/-/tree/pre-2.0?ref_type=heads), it provides a user-friendly portal for managing and executing data-intensive ML workflows.

## Features 

- **User Authentication**: Secure login system with role-based access control.
- **Data Handling**: RESTful APIs to manage data uploads, decompression, and retrieval.
- **Model Management**: Interfaces for searching and managing ML models.
- **Analysis Execution**: Facilitates the running of benchmark, quantify, simulate, and train tasks directly from the web interface.


## Examples of running results from Web UI as below: 
![Results images01](https://github.com/idonthav/Web-UI-for-MRSNet/blob/main/images/res01.jpg?raw=true)

![Results images02](https://github.com/idonthav/Web-UI-for-MRSNet/blob/main/images/res02.jpg?raw=true)

## Key Technologies:

React for dynamic UI components, Node.js with Express for scalable server-side logic, and advanced file handling mechanisms for robust data management

## Tech Stack:

- **Frontend**: React.js, Ant Design
- **Backend**: Node.js, Express.js
- **Utilities**: Multer, AdmZip
- **Security**: CORS for cross-origin resource sharing

## Get Started

Clone the repository and install the dependencies:

```bash
git clone git@github.com:idonthav/Web-UI-for-MRSNet.git
cd your_local_repository

# Install dependencies for the front-end
cd mrsnet-react
npm install

# Install dependencies for the back-end
cd mrsnet-rest
npm install
```

### Run the Application

```bash
# Run the frontend application
cd mrsnet-react
npm start

# Run the backend server
cd mrsnet-rest
npm run dev

```

## Configuration

Before starting the server, ensure you configure the following:

- **`mrsnet-rest/config.js`** - Contains paths to the datasets, models, and shell scripts used for analysis.

## Usage

Contains paths to the datasets, models, and shell scripts used for analysis.

1. Navigate to http://localhost:[frontend_port] in your web browser.
1. Log in with the provided credentials.
1. Use the web interface to upload datasets, manage models, and execute analysis tasks.

## License

This project is licensed under the [LICENSE] - see the LICENSE.md file for details.

## Acjnowledgments

* Dr. Frank, for developing the initial command line software.
* Contributors and maintainers of this project.