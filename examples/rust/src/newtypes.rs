struct NonEmptyString(String);

impl NonEmptyString {
    fn new(s: String) -> Option<Self> {
        if s.is_empty() {
            None
        } else {
            Some(Self(s))
        }
    }
}
