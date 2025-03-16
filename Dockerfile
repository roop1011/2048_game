# Use a separate step for dependencies to leverage caching
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

CMD ["npm", "start"]
