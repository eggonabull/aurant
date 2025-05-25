use axum::{extract::Path, Json};
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::PgPool;
use chrono::Utc;
use axum::{
    routing::get,
    Router,
    extract::Extension,
};


#[derive(Serialize, Deserialize)]
pub struct Menu {
    pub menu_id: String,
    pub restaurant_id: String,
    pub name: String,
    pub description: Option<String>,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Serialize, Deserialize)]
pub struct MenuItem {
    pub menu_item_id: String,
    pub menu_id: String,
    pub name: String,
    pub description: Option<String>,
    pub price: f64,
    pub created_at: String,
    pub updated_at: String,
}

pub async fn get_menu(
    Path(menu_id): Path<String>,
    pool: axum::extract::Extension<PgPool>,
) -> Result<Json<serde_json::Value>, String> {
    let menu = sqlx::query_as!(
        Menu,
        r#"
        SELECT 
            menu_id::text,
            restaurant_id::text,
            name,
            description,
            to_char(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at,
            to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS') as updated_at
        FROM menus
        WHERE menu_id = $1
        "#,
        &menu_id
    )
    .fetch_optional(&pool)
    .await
    .map_err(|e| format!("Database error: {}", e))?;

    let menu = match menu {
        Some(m) => m,
        None => return Err(format!("Menu not found: {}", menu_id)),
    };

    let menu_items = sqlx::query_as!(
        MenuItem,
        r#"
        SELECT 
            menu_item_id::text,
            menu_id::text,
            name,
            description,
            price,
            to_char(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at,
            to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS') as updated_at
        FROM menu_items
        WHERE menu_id = $1
        ORDER BY created_at DESC
        "#,
        &menu.menu_id
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| format!("Database error: {}", e))?;

    Ok(Json(json!({
        "menu": {
            "id": menu.menu_id,
            "restaurant_id": menu.restaurant_id,
            "name": menu.name,
            "description": menu.description,
            "created_at": menu.created_at,
            "updated_at": menu.updated_at,
            "items": menu_items
        }
    })))
}
