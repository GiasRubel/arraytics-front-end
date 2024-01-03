# Use the official Node.js image with version 16.16.0 as the base image
FROM node:16.16.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set environment variable for API base URL
ENV REACT_APP_API_BASE_URL=http://localhost:8000

# Build the React app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
