FROM rust:1.87-bullseye AS builder

ENV SQLX_OFFLINE true
WORKDIR /app

# Install PostgreSQL client for SQLx
RUN apt-get update && apt-get install -y postgresql-client

# Install SQLx CLI
RUN cargo install sqlx-cli --no-default-features --features postgres

# Copy the Cargo.toml and Cargo.lock files
COPY Cargo.toml Cargo.lock ./

COPY . .

RUN cargo build --release

FROM rust:1.87-bullseye

# Set the working directory
WORKDIR /app

# Copy the binary from the previous stage
COPY --from=builder /app/target/release/backend .

# Set the entrypoint
ENTRYPOINT ["./backend"]
