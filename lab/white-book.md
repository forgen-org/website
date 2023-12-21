# Livre blanc : une architecture logicielle moderne

## Introduction

L'informatique est un domaine où la logique se mêle à la représentation de notre réalité. On y trouve des personnes, des transactions, des lieux, des dates etc. Cet art se divise en deux écoles primordiales : la **programmation orienté objet** (OOP) et la **programmation fonctionnel** (FP). L'OOP, par son approche naturaliste, modélise des interactions entre objets, tandis que la FP, d'une nature algébrique, conçoit des systèmes statiques sujets à transformation. La FP, reconnue pour générer un code plus épuré et fiable grâce à des concepts tels que l'immutabilité et les fonctions pures, se distingue. Toutefois, comme l'a souligné Dijkstra, une perspective trop mathématique peut s'éloigner de la réalité pragmatique de l'informatique. [citation requise]

Imaginer l'architecture d'un système informatique comme celle d'une maison aide à comprendre son importance. Une bonne architecture, pensée et étudiée, facilite l'évolution du système et la transmission des connaissances. Parmi les pratiques courantes, le développement piloté par les tests (TDD) se distingue. Selon cette approche, bien qu'un programme ne puisse être prouvé vrai, on peut démontrer qu'il n'est pas faux.

> Program testing can be used to show the presence of bugs, but never to show their absence!\
> — <cite>Edsger Dijkstra</cite>

Cependant, la réalisation d'une couverture de test à 100% est souvent irréalisable pour diverses raisons : complexité d'écriture des tests, lenteur d'exécution, difficulté à anticiper tous les cas, maintien des tests, etc. Bien que les tests soient cruciaux, ils ne constituent pas une solution miracle.

Une approche prometteuse est la Clean Architecture ou Hexagonal Architecture, qui sépare la logique métier de la logique technique et facilite l'interaction entre différentes composantes via des contrats d'interface. Cette méthode surpasse les modèles antérieurs (MVC, Services, Singletons...), mais soulève de nouvelles interrogations. Les architectures « serverless » ou « micro-services » offrent des solutions techniques et structurelles, mais ne traitent pas les fondements architecturaux.

L'objectif de ce document est de poursuivre une réflexion pour définir une architecture informatique idéale en 2023, sans considérer les contraintes matérielles comme la puissance de calcul ou l'espace de stockage, postulant des ressources virtuellement infinies.

## Métier

Un métier ou **domain** en anglais, est un ensemble de concepts et de règles qui définissent un système. Par exemple, un système bancaire peut être défini par les concepts de compte, de transaction, de solde, etc. et par les règles de transfert, de dépôt, de retrait, etc.

### Événements

En matière de persistance de l'état d'un système, deux approches prédominent. La première, similaire aux sauvegardes de jeux vidéo, capture l'état actuel, mais est par nature destructive. La seconde envisage l'état comme résultant d'une série d'étapes, permettant ainsi de reconstruire non seulement l'état final mais aussi tout état intermédiaire.

Ces étapes sont communéments appelés **événements**. Le fait de persister l'état d'un système via la somme de ses événéments est appelé **event sourcing**. Par convention, les événements sont nommés au singulier par un nom d'action au participe passé.

```rs
enum Event {
    MoneySent(u64),
    MoneyReceived(u64)
}
```

Les événements sont de haute qualité car ils sont exhaustifs, exclusifs, consistents, successifs et objectifs.

- Exhaustivité: un événement contient toutes les informations nécessaires à décrire un fait.
- Exclusivité: un événement contient seulement les informations nécessaires à décrire un fait.
- Consistence: un événement est quelque chose qui est arrivé, il ne peut pas être modifié.
- Successivité : des événements peuvent être triés chronologiquement.
- Objectivité : un événement représente un fait naturel et réel.

### Projections

Par ailleurs, les **projections** dérivent des états à partir de l'ensemble des événements, offrant des interprétations objectives ou subjectives selon le contexte.

Par exemple, depuis la liste des transactions de mon compte bancaires, je peux déduire une projection qui est mon solde (objectif). Ou bien être attribué des traits qualitatifs (subjectif) selon mes dépenses (est-ce que je vais souvent au restaurant ? est-ce que j'ai des frais médicaux ? etc.).

```rs
trait Project {
    fn project(events: Vec<Event>) -> Self;
}
```

### Commande

Nous avons des événements mais encore faudrait-il pouvoir les générer. Ceci est assuré par les **commandes**. Une commande indique une intention et peut être exécutée pour générer des événements ou des échecs.

Par convention, les commandes sont des noms d'action au participe présent.

Une commande doit disposer de toutes les informations nécessaires à son exécution. Par exemple, pour envoyer de l'argent, il faut connaître le montant et le destinataire.

```rs
enum Command {
  SendMoney { amount: u64, current_balance: u64 }
}

impl Command {
  fn execute() -> Result<Vec<Event>, Failure> {
    ...
  }
}
```

### Échecs

Une commande peut échouer pour diverses raisons. Par exemple, si le montant est négatif ou si le destinataire n'existe pas. Un échec est un événement qui contient un message d'erreur.

```rs
enum Failure {
  InsufficientBalance,
  NegativeAmount
}
```

### Conclusion

Avec ces simples briques, nos modules métiers disposent d'outils puissants pour définir les actions qu'ils savent traiter. Ces métiers ne dépendent pas de services externes ou techniques. Ainsi, ils sont très simplement testables, maintenables et vérifiables.

Nous verrons par la suite comment mettre ces règles métiers à disposition d'applications concrètes.

## Use-cases


