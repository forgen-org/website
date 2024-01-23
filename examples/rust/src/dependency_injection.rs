// Port
trait Talk {
    fn talk(&self) -> String;
}

// Service
struct SayHello {
    name: String,
}

impl Talk for SayHello {
    fn talk(&self) -> String {
        format!("Hello {}", self.name)
    }
}

// UseCase
struct UseCase {}

impl UseCase {
    fn handle<R>(&self, requirement: R) -> String
    where
        R: Talk,
    {
        requirement.talk()
    }
}

// Program
fn main() {
    let use_case = UseCase {};
    let service = SayHello {
        name: "World".to_string(),
    };
    let result = use_case.handle(service);
    println!("{}", result);
}
