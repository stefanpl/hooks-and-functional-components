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

<h2 style="margin-top: 10rem;">A little warmup for today</h2>

Given this array of numbers …

```typescript
const numbers = [0, 1, 2, 3];
```

… try to produce an array `[2, 3]`:

- one time using `Array.prototype.splice`
- one time using `Array.prototype.slice`

```typescript
const odds1 = // numbers … and splice … somehow;
const odds2 = // numbers … and slice … somehow;
```

<h2 style="margin-top: 20rem;">The most incomplete introduction on Functional Programming concepts you'll ever get</h2>

<img style="margin: 5rem 0;" src="https://staticfiles.nvon.com/go-deeper.jpg" alt="Going deep" />

The react documentation (and a lot of stuff you'll find online) often refers to some of these concepts:

- idempotency
- side effects
- pure functions

Let's go over them real quick.

### Idempotency

A function is said to be idempotent when it always returns the same value when it's called with the same input.

`Same input` ➡️ `same output`. Easy as 🍰

Let's look at some functions and discuss their idempotency:

```typescript
function leOne(someNumber: number, anotherNumber: number): number {
  if (someNumber * 3 > 100) {
    return anotherNumber;
  }
  return someNumber + anotherNumber;
}

function leTwo(): Buffer {
  return readFileSync("/tmp/input.txt");
}

function leThree(someNumber: number): number {
  return Math.random() > 0.5 ? someNumber : someNumber * 2;
}

function leFour(obj: { name: string }): { name: string } {
  // eslint-disable-next-line no-param-reassign
  obj.name = "groot";
  return obj;
}

function leFive(obj: { name: string }): { name: string } {
  return {
    ...obj,
    name: "🌳",
  };
}

const leSix = fetch;

const leSeven = Array.prototype.splice;

const leEight = Array.prototype.slice;

const leNine = _.merge;
```

### Side effects

The definition here is a bit harder. Let's try two of them:

A side effect is:

- … an observable interaction with the outside world 🌍 👀
- … anything that is not required to map a certain input to a certain output `A` ➡️ `B`

Examples of side effects:

- logging
- network requests
- disk I/O
- DOM manipulations
- modifying input variables
- modifying external state
- launching rockets

Without side effects, our program is dead ([or is it not?](https://en.wikipedia.org/wiki/Schr%C3%B6dinger%27s_cat)). They are useful and powerful, but at the same time kind of dangerous.

**We want to have as much control over side effects as possible!**

### Pure functions

A pure function has no side effects, and is idempotent. 🍰 again

In functional programming (FP), pure functions are seen as the means to achieving programmer bliss. Our takeaways here:

- it's good to have control over side effects
- modifying input is (nearly almost) a bad idea

If you're hooked to FP, have a look [here](https://github.com/MostlyAdequate/mostly-adequate-guide). For now, let's get back to our light bulb.

<h2 style="margin-top: 20rem;">A quick disclaimer: react strict mode and function components</h2>

The function body of our function gets called twice in strict mode. This is to "discover [**detecting unexpected effects**"](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects) (cool, we know what that is now 😊). Also, from react 17 on, console methods are not called twice.

["… I certainly understand that the first time you discover this behavior, it's perplexing."](https://github.com/facebook/react/issues/20090#issuecomment-715926549)

We can use a little helper to get around the everything-twice-loggin-once weirdness:

```typescript
const { log } = console;
```

**The key takeaway here: our function component bodies should not contain side effects!**

"Ignoring this rule can lead to a variety of problems, including memory leaks and invalid application state."

Since side effects are also very handy, we'll find a way to use (hehe) them eventually.

## The lifecycle of a component

- The component gets mounted.
- The component gets rendered
- … and rendered again
- … and again
- The component gets unmounted.
