FROM rust:1.70-bullseye

WORKDIR /app

# Copy the Cargo.toml and Cargo.lock files
COPY Cargo.toml Cargo.lock ./

# Install dependencies
RUN cargo build --release

# Copy the source code
COPY src ./src

# Build the application
RUN cargo build --release

# Set the entrypoint
ENTRYPOINT ["./target/release/backend"]
