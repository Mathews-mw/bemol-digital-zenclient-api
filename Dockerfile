FROM node:lts

WORKDIR /app

# COPY package.json and package-lock.json files
COPY package.json package-lock.json ./
COPY package*.json ./

# COPY
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# Install package.json dependencies
RUN npm install

# COPY
COPY . .

# Generate prisma client
RUN npx prisma generate

# Run and expose the server on port 3000
EXPOSE 3636

# A command to start the server
CMD ["npm","run","dev"]