use sqlx::postgres::PgPool;
use std::env;
use anyhow::Result;
use url::Url;
use std::str::FromStr;
use sqlx::postgres::PgConnectOptions;

pub async fn init_db() -> Result<PgPool> {
    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");

    // reconnect to the database
    let pool = PgPool::connect_with(PgConnectOptions::from_str(&database_url)?)
        .await?;

    Ok(pool)
}
