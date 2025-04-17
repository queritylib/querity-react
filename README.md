Querity React Components
========================

## Introduction

**Querity React Components** is a set of React components designed to simplify the creation of user interfaces for querying data from Java backends using the [Querity library](https://github.com/queritylib/querity).

[Querity](https://github.com/queritylib/querity) is a Java query builder that enables developers to construct complex queries using a simple query language or a fluent Java API. It supports various data sources, including both SQL and NoSQL databases.

This component library is built with **TypeScript** and aims to keep peer dependencies to a minimum, ensuring a lightweight and flexible integration.

## Demo

Check out the simplest demo application using Querity at [querity-demo](https://github.com/queritylib/querity-demo).

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

## Provider & Styling

To use the Querity components, you need to wrap your application with the `QuerityComponentsProvider`. This provider is responsible for providing the HTML components and the CSS styles needed for the Querity components to function properly.

You can override the default components and styles by passing custom components and styles to the provider.

This allows you to use any CSS framework or custom styles you prefer, such as **Tailwind CSS**, **MUI**, **Bootstrap**, or any other CSS-in-JS solution.

### Usage

#### With default theme

Wrap your application with the `QuerityComponentsProvider` and use the default components:

```tsx
import { 
  QuerityComponentsProvider, 
  defaultQuerityComponents, 
  QuerityField, 
  QuerityBuilderUI 
} from "@queritylib/react";

function App() {
  return (
    <QuerityComponentsProvider value={...defaultQuerityComponents}>
      <QuerityField />
      <QuerityBuilderUI />
    </QuerityComponentsProvider>
  );
}
```

And import the default theme CSS file:

```css
@import '@queritylib/react/themes/default/style.css';
```

#### Custom components styled with **Tailwind CSS**

Don't import the default theme CSS file, but instead use your own CSS framework or custom styles.

```tsx
import {
  QuerityComponentsProvider,
  defaultQuerityComponents,
  QuerityField,
  QuerityBuilderUI
} from "@queritylib/react";

const querityComponents: ComponentOverrides = {
  ...defaultQuerityComponents,
  Input: (props) => <input {...props} className={`${props.className} border p-2`} />,
  Select: (props) => <select {...props} className={`${props.className} border p-2`} />,
  Button: (props) => <button {...props} className={`${props.className} bg-gray-200 p-2 cursor-pointer`} />,
  Checkbox: (props) => (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" {...props} className="sr-only peer" />
      <div
        className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{props.label}</span>
    </label>
  )
};

function App() {
  return (
    <QuerityComponentsProvider value={querityComponents}>
      <QuerityField />
      <QuerityBuilderUI />
    </QuerityComponentsProvider>
  );
}
```

See `src/themes/default/style.css` as an example of how to style the default components.

## Components

### QuerityField

`QuerityField` is a text input component designed for entering and validating queries. It includes built-in validation, event handling, and customizable styling.

The invalid state can be styled by detecting the `aria-invalid` attribute.

Here's how it looks (with custom styles, see [Provider & Styling](#provider--styling)):

![QuerityField with valid query](/assets/querity-field-valid.png)

![QuerityField with invalid query](/assets/querity-field-invalid.png)

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

To apply a style when state is invalid add this CSS to your stylesheet:

```css
.querity-field[aria-invalid="true"] {
  border-color: red;
}
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

Here's how it looks (with default theme, see [Provider & Styling](#provider--styling)):

![QuerityBuilderUI](/assets/querity-builder-ui.png)

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
`npm link` to link the library to your local environment and use it into the [Querity Demo](https://github.com/queritylib/querity-demo) frontend.

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
