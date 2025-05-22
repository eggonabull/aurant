use sqlx::postgres::PgPool;
use std::env;
use anyhow::Result;

pub async fn init_db() -> Result<PgPool> {
    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");

    // Now connect to our new database
    println!("Connecting to database: {}", database_url);
    let pool = PgPool::connect(&database_url).await?;
    
    // Enable UUID extension
    sqlx::query!(
        r#"
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        "#
    ).execute(&pool).await?;

    // Create tables if they don't exist
    sqlx::query!(
        r#"
        CREATE TABLE IF NOT EXISTS users (
            user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            first_name TEXT,
            last_name TEXT,
            role TEXT NOT NULL DEFAULT 'user',
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW(),
            last_login TIMESTAMPTZ,
            is_active BOOLEAN DEFAULT true
        )
        "#
    ).execute(&pool).await?;

    sqlx::query!(
        r#"
        CREATE TABLE IF NOT EXISTS restaurants (
            restaurant_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name TEXT NOT NULL,
            owner_id UUID REFERENCES users(user_id),
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        )
        "#
    ).execute(&pool).await?;

    sqlx::query!(
        r#"
        CREATE TABLE IF NOT EXISTS staff (
            staff_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            restaurant_id UUID REFERENCES restaurants(restaurant_id),
            user_id UUID REFERENCES users(user_id),
            position TEXT NOT NULL,
            hire_date TIMESTAMPTZ DEFAULT NOW(),
            is_active BOOLEAN DEFAULT true,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        )
        "#
    ).execute(&pool).await?;

    sqlx::query!(
        r#"
        CREATE TABLE IF NOT EXISTS menus (
            menu_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            restaurant_id UUID REFERENCES restaurants(restaurant_id),
            name TEXT NOT NULL,
            description TEXT,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        )
        "#
    ).execute(&pool).await?;

    sqlx::query!(
        r#"
        CREATE TABLE IF NOT EXISTS menu_items (
            menu_item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            menu_id UUID REFERENCES menus(menu_id),
            name TEXT NOT NULL,
            description TEXT,
            price DECIMAL(10,2) NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        )
        "#
    ).execute(&pool).await?;

    sqlx::query!(
        r#"
        CREATE TABLE IF NOT EXISTS tables (
            table_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            restaurant_id UUID REFERENCES restaurants(id),
            number INTEGER NOT NULL,
            capacity INTEGER NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        )
        "#
    ).execute(&pool).await?;

    sqlx::query!(
        r#"
        CREATE TABLE IF NOT EXISTS orders (
            order_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            table_id UUID REFERENCES tables(id),
            status TEXT NOT NULL,
            total DECIMAL(10,2) NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        )
        "#
    ).execute(&pool).await?;

    sqlx::query!(
        r#"
        CREATE TABLE IF NOT EXISTS order_items (
            order_item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            order_id UUID REFERENCES orders(id),
            menu_item_id UUID REFERENCES menu_items(id),
            quantity INTEGER NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        )
        "#
    ).execute(&pool).await?;

    Ok(pool)
}
