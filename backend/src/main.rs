use axum::{
    routing::get,
    Router,
    Json,
};
use std::net::SocketAddr;
use tracing_subscriber;
use serde_json::json;
use chrono::Utc;
use sqlx::PgPool;
use dotenv::dotenv;
mod db;

#[tokio::main]
async fn main() {
    dotenv().ok();

    // Initialize tracing
    tracing_subscriber::fmt::init();

    // Build our application with a route
    let app = Router::new()
        .route("/health", get(health_check))
        .route("/api/v1/echo", get(echo_handler));

    // Initialize database
    let pool = db::init_db().await.unwrap();

    // Run it
    let addr = SocketAddr::from(([127, 0, 0, 1], 8080));
    tracing::debug!("listening on {}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app.into_make_service())
        .await
        .unwrap();
}

async fn health_check() -> Json<serde_json::Value> {
    Json(json!({
        "status": "ok",
        "timestamp": chrono::Utc::now().to_rfc3339()
    }))
}

async fn echo_handler() -> Json<serde_json::Value> {
    Json(json!({
        "message": "Echo endpoint",
        "timestamp": chrono::Utc::now().to_rfc3339()
    }))
}
