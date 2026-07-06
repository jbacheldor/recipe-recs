
// this is an async function
// type is app of REFERENCE TO App
// i guess this is a refernece to the tauri app
async fn setup_db(app: &App) -> Db {
    let mut path = app.path().app_data_dir().expect("failed to get data_dir");
 
    match std::fs::create_dir_all(path.clone()) {
        Ok(_) => {}
        Err(err) => {
            panic!("error creating directory {}", err);
        }
    };
 
    path.push("db.sqlite");
 
    Sqlite::create_database(
        format!(
            "sqlite:{}",
            path.to_str().expect("path should be something")
        )
        .as_str(),
    )
    .await
    .expect("failed to create database");
 
    let db = SqlitePoolOptions::new()
        .connect(path.to_str().unwrap())
        .await
        .unwrap();
 
    sqlx::migrate!("./migrations").run(&db).await.unwrap();
 
    db
}