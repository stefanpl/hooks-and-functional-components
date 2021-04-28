# React hooks and function components

- this project has been created using [create-react-app](https://create-react-app.dev/) using a [TypeScript template](https://create-react-app.dev/docs/adding-typescript/)
- I ran `npm run eject` ("stuff can break") so we see a bit more
- during setup I discovered [eslint-config-auto](https://github.com/davidjbradshaw/eslint-config-auto). Pretty nice, if you're into linters.

## Let's have a look on how this all works (roughly)

- an application entry point is defined in the webpack config. It's `src/index.tsx`. webpack's journey starts here, we mostly don't care.
- whenever you call some `npm run` thingy,
- `index.tsx` loads `app.tsx`, which is our entry point to the application (you could rename it, of course … but why?).
- **at build time**, webpack (leveraging most notably [babel](https://babeljs.io/) and TypeScript plugins) transforms our code into browser-understandable JavaScript:

  - no more types (TypeScript's job)
  - no more fancy ES6 stuff (babel's job)
  - **no more JSX (babel's job)**

- at runtime, react starts on it's way by means of `ReactDOM.render` (from `index.tsx`, remember?).
- JSX will be [compiled to something (JavaScript, of course) that react understands and knows how to handle](https://reactjs.org/docs/introducing-jsx.html#jsx-represents-objects). This is what's called a **React element**.

## So where do function components come into play?

- a function component is a piece of code that will **return a React Element** (e.g. a JSX-runtime-equivalent) when being called:

```typescript
type SimpleFunctionComponent = () => ReactElement;

const MyComponent: SimpleFunctionComponent = () => <h1>hello 🌍</h1>;

function JustAnotherWayOfWritingIt(): ReactElement {
  return <h1>hello 🌍</h1>;
}
```

### Before we get any deeper – why use function components?

- [From the react docs](https://reactjs.org/docs/hooks-faq.html#should-i-use-hooks-classes-or-a-mix-of-both): "When you’re ready, we’d encourage you to start trying Hooks in new components you write."
- ["Classes confuse both people and machines"](https://reactjs.org/docs/hooks-intro.html#classes-confuse-both-people-and-machines). Hell yes.
- React hooks make it easy to share functionality between components. We'll get to this later.

<img src="https://staticfiles.nvon.com/js-classes.jpg" alt="JavaScript classes" />

### So … it's "just" a plain JS function! Store it, pass it around, do whatever you like

```typescript
const MyComponent: SimpleFunctionComponent = () => <h1>hello 🌍</h1>;

const componentWithMetaInformation = {
  theComponent: MyComponent,
  description: "A very stupid hello world component",
  tags: ["stupid", "hello world", "examples are hard"],
};
```

You can even call it directly using good ol' `()`, but that'll trick react to a certain extent. If you can, avoid this.

```typescript
return componentWithMetaInformation.theComponent();
```

One last example to underline the dynamic nature and endless possibilities you have with functions:

```typescript
/**
 * A function taking an input (an emoji, preferrably) and returning another function.
 *
 * If you want to sound fancy, you can call this a "higher-order function".
 */
function createEmojiComponent(emoji: string): FunctionComponent {
  return () => <h1>Hello {emoji}</h1>;
}

const MyUnicornComponent = createEmojiComponent("🦄");

const theWholeGang = ["🐳", "🦄", "🐒", "🦈"].map(createEmojiComponent);

// …
<>
  <MyUnicornComponent />
  {theWholeGang.map((Member) => (
    <Member />
  ))}
</>;
{
  theWholeGang.map((Member) => <Member />);
}
```

## Functions can accept arguments. In the component world, we call them `props`

```typescript
/**
 * The most simple case. TS will scream.
 */
const MyComponent = (props) => <h1>hello {props.name}</h1>;
```

Let's make TS happy:

```typescript
/**
 * Same thing, but no red squiggly and hints at the callsite 🎉
 */
const MyComponent1 = (props: { name: string }): ReactElement => (
  <h1>hello {props.name}</h1>
);

/**
 * Let's use the types that react gives us! `props` is now aware of `children`!
 */
const MyComponent2: FunctionComponent<{ name: string }> = (props) => (
  <h1>hello {props.name}</h1>
);

/**
 * Let's actually be explicit about our interface! (no changes in functionality)
 * This is (currently) the NVON-preferred way of defining functional components.
 */
interface SomethingWithAName {
  name: string;
}

const MyComponent3: FunctionComponent<SomethingWithAName> = (props) => (
  <h1>hello {props.name}</h1>
);
```

- React by default passes a `children` prop to our components. Its of the type `ReactElement`.

## The lifecycle of a component

- The component gets mounted.
- The component gets rendered
- … and rendered again
- … and again
- The component gets unmounted.

function body gets called twice!
"But I certainly understand that the first time you discover this behavior, it's perplexing."
https://github.com/facebook/react/issues/20090#issuecomment-715926549
