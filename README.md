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
const spliced = // numbers … and splice … somehow;
const sliced = // numbers … and slice … somehow;
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

The **function body of our function gets called twice in strict mode**. This is to "discover [**detecting unexpected effects**"](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects) (cool, we know what that is now 😊). Also, from react 17 on, console methods are not called twice.

["… I certainly understand that the first time you discover this behavior, it's perplexing."](https://github.com/facebook/react/issues/20090#issuecomment-715926549)

We can use a little helper to get around the everything-twice-loggin-once weirdness:

```typescript
const { log } = console;
```

**The key takeaway here: our function component bodies should not contain side effects!**

"Ignoring this rule can lead to a variety of problems, including memory leaks and invalid application state."

Since side effects are also very handy, we'll find a way to use (hehe) them eventually.

<h2 style="margin-top: 20rem;">useState</h2>

- Use it when a component maintains its own state. (If the state is controlled from the outside, use props).
- Use the generic arguments to be explicit about the type: `useEffect<ThisIsTheDroidYoureLookingFor>();`
- The default syntax to use it is a form of [array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#array_destructuring). You'll want to use it.
- You can pass an initial value, or an initializer function. **Attention**: the initializer will be called twice in strice mode, too!
- Be careful about using props as initial values. This is mostly not want the component user expects.
- Setting a new state can be done by passing a value directly or through a callback. Callbacks make for nice sharable setters!

```typescript
/**
 * Simple initial value.
 */
const [isTurnedOn, setTurnedOn] = useState<boolean>(true);

/**
 * Using an initializer function. Must return a boolean.
 */
const [isTurnedOn, setTurnedOn] = useState<boolean>(() => {
  (function someReallyComplexInitializerLogic() {})();
  return true;
});

/**
 * Changing with a value directly
 */
const switchOff = setTurnedOn(false);

/**
 * Using the current state as a variable
 */
setTurnedOn(!isTurnedOn);

/**
 * Using the current state as a callback with a function declaration
 */
setTurnedOn(function toggle(currentState) {
  return !currentState;
});

/**
 * Using the current state as a callback with an arrow function
 */
setTurnedOn((currentState) => !currentState);
```

<h2 style="margin-top: 20rem;">useEffect</h2>

- this is **the place** to handle side effects.
- accepts two things: an `EffectCallback` and a `DependencyList`.
- `EffectCallback` gets called whenever at least one element of the `DependencyList` changes – at least once, on mount.
- the effect gets called asynchronously after the DOM has been rendered. Because performance.
- an empty `DependencyList` will cause the `EffectCallback` to run only once – on mount!

Let's give our light bulb a little side effect:

```typescript
function effectCallback(): void {
  window.document.title = `The light is now ${isTurnedOn ? "on" : "off"}`;
}

useEffect(effectCallback, [isTurnedOn]);
```

Pretty neat! Let's have a quick look to be sure about the double-calling …

What if we unmount the lightbulb?

- the `EffectCallback` function can return a `Destructor` function: this is a cleanup function that gets called when the component unmounts.
- (if you're now thinking … "wait! a function returning another function … what was the fancy word for that again?" – yup, `EffectCallback` can be a _higher order function_)

```typescript
function destructorFunction(): void {
  window.document.title = "The light bulb is gone";
}

function effectCallback(): () => void {
  window.document.title = `The light is now ${isTurnedOn ? "on" : "off"}`;
  return destructorFunction;
}

useEffect(effectCallback, [isTurnedOn]);
```

<h2 style="margin-top: 20rem;">The lifecycle of a component</h2>

- **The component gets mounted.** We care about this. There is likely some work to be done:
  - fetch data from APIs
  - subscribe to events
  - manipulate state
- **The component gets rendered. And rendered. And rendered.** We shouldn't care:
  - Our side effects should not happen on render
  - Think data-driven! Changes in your data should cause side effects. That's the mental model behind the `DependencyList`
- **The component gets unmounted.** We care about this in case we need to clean up 🧹
  - unsubscribe from events
  - cancel timeouts/intervals
  - restore state

<h2 style="margin-top: 20rem;">useRef</h2>

- flexible container for storing mutable values inside function components
- changing a ref does not re-render the component!
- often used for DOM references, but not limited to that

Let's make our lightbulb's cleanup a bit more useful:

- on mount, read the page title and store it in a ref.
- un unmount, read from the ref and restore it.

```typescript
const initialPageTitle = useRef<string>("");

function destructorFunction(): void {
  window.document.title = initialPageTitle.current;
}

function effectCallbackForHandlingInitialTitle(): () => void {
  initialPageTitle.current = window.document.title;
  return destructorFunction;
}

useEffect(effectCallbackForHandlingInitialTitle, []);
```

<h2 style="margin-top: 20rem;">custom hooks</h2>

There are a few [rules to follow when using hooks](https://reactjs.org/docs/hooks-rules.html). Let's have a look at them:

- Don’t call Hooks inside loops, conditions (or after early returns), or nested functions.

  - sometimes a bit frustrating, but you'll get used to it
  - eslint is here for us

- Only call hooks inside function components, or custom hooks.

With those in mind, let's write our first custom hook!

A function that modifies the page might wish to restore the title when it gets unmounted. This is not limited to our lightbulb! Let's make the functionality sharable!

```typescript
import { useEffect, useRef } from "react";

const useRestoreTitleOnUnmount = (): void => {
  const initialPageTitle = useRef<string>();

  function destructorFunction(): void {
    if (initialPageTitle.current) {
      window.document.title = initialPageTitle.current;
    }
  }

  function effectCallbackForHandlingInitialTitle(): () => void {
    initialPageTitle.current = window.document.title;
    return destructorFunction;
  }

  useEffect(effectCallbackForHandlingInitialTitle, []);
};

export default useRestoreTitleOnUnmount;
```

**This is what makes hooks so powerful: You can easily share functionality that spans the entire lifecycle of a component!**

We can also use hooks to put our logic in one central place, and keep it separate from the template code. At NVON, we call these kinds of hooks `ViewModel`. Let's write one for our Lightbulb!

```typescript
const useLightBulbViewModel = (): {
  style: CSSProperties;
  toggleLightbulb: () => void;
} => {
  const [isTurnedOn, setTurnedOn] = useState<boolean>(true);
  useRestoreTitleOnUnmount();

  useEffect(() => {
    window.document.title = `The light is now ${isTurnedOn ? "on" : "off"}`;
  }, [isTurnedOn]);

  return {
    style: {
      backgroundColor: isTurnedOn ? "yellow" : "black",
      width: 100,
      height: 100,
      borderRadius: "50%",
    },
    toggleLightbulb: () => setTurnedOn(toggle),
  };
};

const LightBulb: FunctionComponent = () => {
  const { style, toggleLightbulb } = useLightBulbViewModel();
  return (
    <>
      <Box style={style} />
      <Button onClick={toggleLightbulb}>toggle light</Button>
    </>
  );
};
```

Look at how clean the `const LightBulb: FunctionComponent` definition is now 🎉.
