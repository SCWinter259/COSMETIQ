# Nugu Design Document

## Intended Features

- Authentication with email and password
- Email Verification for sign up
- Basic listing of items
- Saving/Remembering items (the user can choose not to save)
- Tags, storage locations, ...
- Near expiry notification
- Shopping Cart

///////////////////////////

- Authentication with Google
- AI filled descriptions
- Carelendar
- Price scrapping
- Ask AI

## NoSQL DB modelling

`pluralNoun: [key-value pairs]` for collections.

`key: {value fields}` for documents.

`pluralNoun: [dataType]` for lists.

`*` means mandatory (for user input data).

```json
users: [
    id(AutoString): {
        email: String*,
        userName: String*,
        imageUrl: String,
        createdOn: Date(Auto)
    }
]
```

```json
items: [
    userId(from_users)->items: [
        id(AutoString): {
            brand: String*,
            name: String*,
            imageUrl: String,
            tags: [String],
            size: Number*,
            unit: String*
            quantity: Number*,
            storageLocation: String*
            description: String,
            notes: String,
            expiryDate: Date*,
        }
    ]
]
```

Each user will be given a default set of units/locations/tags that they can add/delete

```json
units: [
    userId(from_users): {
        units: [String]
    }
]
```

```json
storageLocations: [
    userId(from_users): {
        storageLocations: [String]
    }
]
```

```json
tags: [
    userId(from_users): {
        tags: [String]
    }
]
```

```json
carts: [
    userId(from_users)->items: [
        id(AutoString): {
            referenceId(from_savedItems): String,
            brand: String*,
            name: String*,
            imageUrl: String,
            size: Number*,
            unit: String*
            quantity: Number*,
            description: String,
            notes: String,
        }
    ]
]
```

```json
savedItems: [
    userId(from_users)->items: [
        id(AutoString): {
            brand: String*,
            name: String*,
            imageUrl: String,
            tags: [String],
            size: Number*,
            unit: String*
            description: String,
        }
    ]
]
```