// Data
struct Counter(u32);

// Logic
impl Counter {
    fn add(&mut self, n: u32) -> &mut Self {
        self.0 += n;
        self
    }

    fn times(&mut self, n: u32) -> &mut Self {
        self.0 *= n;
        self
    }

    fn print(&self) -> () {
        println!("Counter: {}", self.0);
    }
}

// Program
fn main() {
    let mut counter = Counter(0);

    counter.add(1).times(5).add(2).print(); // Counter: 7
}
