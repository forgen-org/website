// Retrieved from outside
struct ApiResponse {
    first_name: String,
    last_name: String,
}

// Used internally
struct Fullname(String);

// Returned to outside
struct ClientResponse {
    fullname: String,
}

impl Into<Fullname> for ApiResponse {
    fn into(self) -> Fullname {
        Fullname(format!("{} {}", self.first_name, self.last_name))
    }
}

impl From<Fullname> for ClientResponse {
    fn from(fullname: Fullname) -> Self {
        ClientResponse {
            fullname: fullname.0,
        }
    }
}
