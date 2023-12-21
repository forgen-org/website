

## Séparations du modèle de lecture et d'écriture

Il peut être nécessaire de persister l'ensemble ou une partie des événements et des projections. Par convention, on appelle **store** la persistance des événements et **repository** la persistance des projections.

On l'a vu, les événements sont objectifs et immuables. Notre store ne peut donc faire que deux chose : ajouter des événements ou les lire.

```rs
trait Store {
  fn pull(&self, id: String) -> Result<Vec<Event>, Error>;
  fn push(&mut self, id: String, events: Vec<Event>) -> Result<(), Error>;
}
```

Les projections sont subjectives et peuvent être modifiées allégrements.

```rs
trait Repository {
  fn read(&self, id: String) -> Result<Projection, Error>;
  fn save(&mut self, id: String, projection: Projection) -> Result<(), Error>;
}
```

Ainsi, naturellement nous nous dirigeons vers la séparation de notre modèle de persistence en deux parties : une partie objective et immuable, et une partie subjective et mutable. Cela s'appelle le **CQRS** (Command Query Responsibility Segregation).

## Réactivité

Idéalement, nous aimerions que les projections soient recalculées automatiquement à l'émission de chaque événement. Ou bien que certains événements déclenchent des actions. C'est ce qu'on appelle l'**EDA** (event driven architecture). Il va nous falloir un **event bus** pour cela.

```rs
pub trait Bus {
    fn publish(&self, events: Vec<Event>);
    fn subscribe(&mut self, event_type: Event, callback: Box<dyn Fn(T) + Send>);
}
```

## Services

Pour l'instant, nous n'avons fait que définir des traits qui sont des interfaces basiques. Dans la pratique, nous aurons besoin d'implémenter ces interfaces. C'est ce qu'on appelle des **services**.

Cependant, nous ne voulons pas contaminer notre logique existante avec la logique des services. Nous allons donc séparer notre code en trois parties : la logique métier, les contrats d'interface et la logique technique. Cela s'appelle l'injection de dépendances et l'inversion de contrôle.

```rs
struct InMemoryStore {
    events: HashMap<String, Vec<Event>>,
}

impl Store for InMemoryStore {
  ...
}
```

## Conteneur

Maintenant que nous avons défini nos services, nous avons besoin d'un **conteneur** pour les instancier et les injecter dans notre système.

```rs
struct Services {
    bus: Box<dyn Bus>,
    store: Box<dyn Store>,
    repository: Box<dyn Repository>,
}
```

## API

Finalement, nous avons besoin d'une API pour interagir avec notre système. Nous pouvons y définir des **commandes** et des **requêtes** ainsi qu'initialiser notre bus d'événements.

```rs
// Nos dépendances
struct API {
  services: Services
}

impl API {
    // Réactivité
    fn new(container: Services) -> Self {
      services.bus.subscribe(Event::MoneySent, ...);
      services.bus.subscribe(Event::MoneyReceived, ...);

      Self {
        services
      }
    }

    // Commandes
    fn command(&mut self) -> Result<(), Error> {
      let events = SendMoney::execute()?;
      self.services.store.push(events);
      self.services.bus.notify(events);
    }

    // Requêtes
    fn query(&self) -> Result<Projection, Error> {
      self.services.repository.read(...)
    }
}
```
