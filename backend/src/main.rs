mod db;
mod handlers;

use axum::{Json, Router, routing::get};
use dotenv::dotenv;
use serde_json::json;
use std::fmt;
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    dotenv().ok();

    // Initialize tracing
    tracing_subscriber::fmt::init();

    // Build our application with routes
    let app = Router::new()
        .route("/health", get(health_check))
        .route("/api/v1/echo", get(echo_handler))
        .route("/api/v1/menus/:menu_id", get(handlers::menu::get_menu));

    // Initialize database
    let pool = db::init_db().await.expect("Failed to initialize database");

    // Run it
    let addr = SocketAddr::from(([0, 0, 0, 0], 8080));
    tracing::debug!("listening on {}", addr);

    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect(&format!("Failed to bind to address {}", addr));
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
