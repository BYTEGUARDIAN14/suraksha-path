FROM node:20

WORKDIR /app

COPY package.json package-lock.json* ./
# Force install including devDependencies inside container
RUN npm install --include=dev

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]

