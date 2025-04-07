Querity React Components
========================

## Introduction

**Querity React Components** is a set of React components designed to simplify the creation of user interfaces for querying data from Java backends using the [Querity library](https://github.com/queritylib/querity).

[Querity](https://github.com/queritylib/querity) is a Java query builder that enables developers to construct complex queries using a simple query language or a fluent Java API. It supports various data sources, including both SQL and NoSQL databases.

This component library is built with **TypeScript** and aims to keep peer dependencies to a minimum, ensuring a lightweight and flexible integration.

## Requirements

- React 19

## Installation

You can install the package using **npm** or **yarn**:

```sh
npm install @queritylib/react
```

or

```sh
yarn add @queritylib/react
```

## Components

### QuerityField

`QuerityField` is a text input component designed for entering and validating queries. It includes built-in validation, event handling, and customizable styling.

#### Usage

```tsx
import { QuerityField } from "@queritylib/react";

<QuerityField
  value="" // Optional: Default query value
  placeholder="Enter query" // Optional: Placeholder text
  className="custom-class" // Optional: Custom CSS class
  onChange={(value) => console.log(value)} // Optional: Handle query input change
  onEnter={(value) => console.log(value)} // Optional: Handle Enter key press
  onInvalidQuery={(error) => console.log(error)} // Optional: Handle invalid queries
/>
```

#### Props

| Prop             | Type                      | Description                             | Default |
|------------------|---------------------------|-----------------------------------------|---------|
| `value`          | `string`                  | Initial query value                     | `""`    |
| `placeholder`    | `string`                  | Input placeholder text                  | `""`    |
| `className`      | `string`                  | Additional CSS classes                  | `""`    |
| `onChange`       | `(value: string) => void` | Called when the query input changes     | `-`     |
| `onEnter`        | `(value: string) => void` | Called when the user presses Enter      | `-`     |
| `onInvalidQuery` | `(error: string) => void` | Called when an invalid query is entered | `-`     |

### QuerityBuilderUI

`QuerityBuilderUI` is a component that provides a user interface for building queries. 

It includes all the necessary components to create a query in a visual way, including filters, sorting, and pagination.

#### Usage

```tsx
import { QuerityBuilderUI } from "@queritylib/react";

<QuerityBuilderUI
  query={query}
  onChange={(q) => console.log('Query updated', q)}
  className="custom-class"
/>
```

#### Props

| Prop        | Type                      | Description                      | Default |
|-------------|---------------------------|----------------------------------|---------|
| `query`     | `QuerityQuery`            | Initial query object             | `-`     |
| `onChange`  | `(query: string) => void` | Called when the query is updated | `-`     |
| `className` | `string`                  | Additional CSS classes           | `-`     |

## Utilities

### QuerityParser

`QuerityParser` is a utility for parsing and validating the Querity query language. It provides methods to check the validity of a query and to parse it into a structured format.

#### Usage

```tsx
import { QuerityParser } from "@queritylib/react";

try {
  const input = 'lastName="Skywalker" sort by firstName page 1,10'
  const query = QuerityParser.parseQuery(input)
  console.log(query)
  /*
  {
    filter: {
      propertyName: "lastName", 
      operator: Operator.EQUALS, 
      value: "Skywalker"
    }, 
    sort: [{
      propertyName: "firstName", 
      direction: Direction.ASC
    }], 
    pagination: {
      page: 1, 
      size: 10
    }, 
    distinct: false
  }
  */
} catch (e) {
  console.log('Query parsing error', e)
}
```

### QuerityBuilder

`QuerityBuilder` is a utility for building query string from a structured format. It provides methods to convert a query object into a string representation.

#### Usage

```tsx
import { QuerityBuilder, Query, Operator } from "@queritylib/react";

const queryObj: Query = {
  filter: { propertyName: "lastName", operator: Operator.EQUALS, value: "Skywalker" }
}
const queryStr = QuerityBuilder.buildQuery(queryObj)
console.log(queryStr)
// lastName="Skywalker"
```

## Development

To make changes to the components in this library and test them in a real application, we strongly suggest to use 
`npm link` to link the library to your local environment and use it into the [Querity Demo](https://github.com/queritylib/querity) frontend.

To do this, follow these steps:

```shell
npm link # in the library directory

npm link @queritylib/react # in the Querity Demo frontend directory
```

## Contributing

We welcome contributions! If you’d like to improve this library, feel free to submit a pull request or open an issue.

## License

This project is licensed under the Apache-2.0 License. See the [LICENSE](LICENSE) file for details.

---

For any questions or feedback, please reach out via the [GitHub repository](https://github.com/queritylib/querity-react).
