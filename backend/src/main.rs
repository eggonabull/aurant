use axum::{
    routing::get,
    Router,
    response::Html,
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
    let addr = SocketAddr::from(([127, 0, 0, 1], 3001));
    tracing::debug!("listening on {}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app.into_make_service())
        .await
        .unwrap();
}

async fn health_check() -> Html<&'static str> {
    Html("<h1>jazz.menu backend is healthy!</h1>")
}

async fn echo_handler() -> Json<serde_json::Value> {
    Json(json!({
        "message": "Echo endpoint",
        "timestamp": chrono::Utc::now().to_rfc3339()
    }))
}
