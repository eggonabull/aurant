FROM rust:1.87-slim-bullseye as builder

WORKDIR /app

# Install PostgreSQL client for SQLx
RUN apt-get update && apt-get install -y postgresql-client

# Install SQLx CLI
RUN cargo install sqlx-cli --no-default-features --features postgres

# Copy the Cargo.toml and Cargo.lock files
COPY Cargo.toml Cargo.lock ./

# Set SQLx to offline mode
RUN echo "DATABASE_URL=postgresql://user:password@localhost:5432/db" > .env

COPY . .

RUN cargo build --release

FROM rust:1.87-slim-bullseye

# Set the working directory
WORKDIR /app

# Copy the binary from the previous stage
COPY --from=builder /app/target/release/backend .

# Set the entrypoint
ENTRYPOINT ["./backend"]
