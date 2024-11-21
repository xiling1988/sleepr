# Use the official Node.js image as the base image
FROM node:18-slim AS development

# Set the working directory
WORKDIR /usr/src/app

# Install the necessary dependencies
RUN apt-get update && apt-get install -y openssl libssl3 && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json
COPY package*.json ./

# Configure npm to use an alternative registry and increase network timeout
# This was set up because the default npm registry was slow and causing the build to fail
# It increases the network timeout to 120 seconds
RUN npm config set registry https://registry.yarnpkg.com/ && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm install

# Set environment variable
ENV DATABASE_URL=${DATABASE_URL}


# Copy the rest of the application code
# The first argument is the path to the file or directory on the host machine,
# and the second argument is the path where it should be copied in the image.
COPY . .

# Expose the port the app runs on
# The EXPOSE instruction is primarily for documentation purposes and does not actually publish the port. 
# The ports property in docker-compose.yaml is what actually maps the container's port to the host.
# However, keeping the EXPOSE line can be useful for readability and documentation,
# especially when working with multiple microservices, 
# as it indicates which port the application inside the container is expected to run on.
EXPOSE 3000

# This command builds the application and transpiles the TypeScript code to JavaScript code using the Nest CLI 
RUN npm run build

FROM node:18-slim AS production

# Set the NODE_ENV build argument to production (used during build time)
ARG NODE_ENV=production

# Set the NODE_ENV environment variable to production (used during runtime)
ENV NODE_ENV=${NODE_ENV}

# Set the DATABASE_URL environment variable to be used during runtime
ENV DATABASE_URL=${DATABASE_URL}

# Set the working directory
WORKDIR /usr/src/app

# Install the necessary dependencies
RUN apt-get update && apt-get install -y openssl libssl3 && rm -rf /var/lib/apt/lists/*

# Copy package.json AND package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

# The CMD instruction specifies the command that should be executed when the Docker container starts up.
CMD ["node", "dist/apps/auth/main.js"]
