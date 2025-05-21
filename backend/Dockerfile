FROM rust:1.87 as builder

WORKDIR /app

# Copy the Cargo.toml and Cargo.lock files
COPY . .

# Install SQLx CLI
RUN cargo install sqlx-cli --no-default-features --features postgres

# Set SQLx to offline mode
RUN echo "DATABASE_URL=postgresql://user:password@localhost:5432/db" > .env

# Prepare SQLx queries in offline mode
RUN cargo sqlx prepare -- --offline

# Install dependencies and build
RUN cargo build --release

FROM alpine:latest

# Set the working directory
WORKDIR /app

# Copy the binary from the previous stage
COPY --from=builder /app/target/release/backend .

# Set the entrypoint
ENTRYPOINT ["./backend"]
