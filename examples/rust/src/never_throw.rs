use thiserror::Error;

// Example of a function that never throws an error
fn get_user() -> Result<(), UserError> {
    Err(UserError::NotFound)
}

#[derive(Error, Debug)]
pub enum UserError {
    #[error("User not found")]
    NotFound,
}

// Other example of a function that never throws an error
fn get_api() -> Result<(), ApiError> {
    Err(ApiError::BadResponse)
}

#[derive(Error, Debug)]
pub enum ApiError {
    #[error("Bad response")]
    BadResponse,
}

// Program
fn main() -> Result<(), ProgramError> {
    get_user().map_err(ProgramError::User)?;
    get_api().map_err(ProgramError::Api)?;
    Ok(())
}

// Union of errors
pub enum ProgramError {
    User(UserError),
    Api(ApiError),
}
