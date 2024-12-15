FROM  python:3.10.11-alpine
# Set the working directory in the container
WORKDIR /app

RUN apk add --no-cache \
    bash \
    g++ \
    libstdc++ \
    libgcc \
    linux-headers \
    musl-dev \
    openblas-dev \
    curl \
    && curl -sSL https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r0/glibc-2.35-r0.apk -o /tmp/glibc.apk \
    && apk add --no-cache /tmp/glibc.apk \
    && rm /tmp/glibc.apk

# Copy the requirements file into the container
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["python", "main.py"]