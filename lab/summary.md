# Architecture

## Events

Event are superior because they hold exhaustive, exclusive and immutable information.

- Exhaustive: an event contains all the information needed to describe a fact.
- Exclusive: an event contains only the information needed to describe a fact.
- Immutable: an event cannot be modified.

```rs
enum Event {
    MoneySent(u64),
    MoneyReceived(u64),
}
```

## Projection

A projection is a subjective view of a system. It is derived from the sum of events.

```rs
impl From<Timeline> for Projection {
    fn from(timeline: Timeline) -> Self {
        ...
    }
}
```

## Commands

```rs
enum Command {
    SendMoney(u64),
}
```

## Executor

A function that takes a stimulus and returns either a list of events or an error.

```rs
trait Execute {
    fn execute(command: Command) -> Result<Vec<Event>, Error>;
}

impl Execute for Timeline { ... }
```

## CQRS

Command Query Responsibility Segregation (CQRS) is a pattern that separates the read and write operations of a system.

### Store

By convention, a store is responsible for persisting events.

```rs
trait Store {
    fn pull(&self) -> Result<Vec<Event>, Error>;
    fn push(&mut self, events: Vec<Event>) -> Result<(), Error>;
}
```

### Repository

By convention, a repository is responsible for persisting projections.

```rs
trait Repository {
    fn read(&self) -> Result<Projection, Error>;
    fn save(&self, projection: Projection) -> Result<(), Error>;
}
```

### Event Bus

An Event Bus is responsible for dispatching events.

```rs
trait EventBus {
    fn dispatch(&mut self, events: Vec<Event>) -> Result<(), Error>;
}
```

### Command

A Command is responsible for generating events.

```rs
trait Command {
    fn execute(&self) -> Result<(), Error>;
}
```

### Query

A query is responsible for retrieving projections.

```rs
trait Query {
    fn execute(&self) -> Result<Projection, Error>;
}
```
