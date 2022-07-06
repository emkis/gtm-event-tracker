# gtm-event-tracker

![Downloads](https://img.shields.io/npm/dt/gtm-event-tracker?colorA=000&colorB=000 "Downloads")
![Bundle Size](https://img.shields.io/bundlephobia/minzip/gtm-event-tracker/latest?style=flat&colorA=000&colorB=000&label=bundle%20size "Bundle Size")
![Version](https://img.shields.io/npm/v/gtm-event-tracker?style=flat&colorA=000&colorB=000 "Version")

A tiny, type-safe and scalable solution for triggering [Google Tag Manager](https://tagmanager.google.com) track events. Has a powerful API powered by TypeScript that auto-completes your event properties.

It was designed for applications that need to trigger a lot of track events, it solves common problems like writing similar events multiple times, managing "global" required event properties and debugging track events. It's framework agnostic and configurable, so probably is the only solution you need for your modern web application.


## Installation
It's a requirement for this package that you have [Google Tag Manager](https://tagmanager.google.com) installed already in your application, because it depends on `window.dataLayer` by default. If you use a different `targetProperty` to push your events, you can use the `configure` function to change this behavior.

```bash
yarn add gtm-event-tracker # or npm install gtm-event-tracker
```


## Why this library over `dataLayer.push`?
- Type-safe events with auto-complete
- Less repetition of similar track events
- Centralized way to manage "global" required event properties
- Easy way to debug your track events
- Server-side compatible


## Server-Side Rendering (SSR)
This library is SSR compatible, there is only one caveat though. The `targetProperty` isn't available on Server-Side, this means you can't call `trackEvent` function. The reason why is because Google Tag Manager creates the `targetProperty` (`window.dataLayer` by default) only on Client-Side.

If you're using some modern framework such as React or Vue, you need to call the `trackEvent` function on `useEffect` or `onMounted` callback. This way you ensure that track events are being only triggered on Client-Side.


## API
### `createTrackerContext`
It creates a tracker context, which is responsible for centralizing all "global" event properties you want to include in your track events.

> This function accepts shallow objects only. This is a restriction from this library to prevent issues with object references.

#### Initialization
```ts
// no arguments are allowed
// you can create a tracker context with no initial properties
createTrackerContext()

// or you can create a tracker context with some properties
createTrackerContext({
  some: 'data',
  foo: 'bar',
})

// if you need, you can provide options as well
createTrackerContext({ foo: 'bar' }, { name: 'main-context' })
```

#### Options
In the second argument, you can provide options to customize it.

> No options are required.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| name | `string` | `undefined` | It's the name of this tracker context that is used by the Logger. Is only useful if your application has more than one tracker context, and you want to be able to identify them on Logs by their names. |

####  Updating values
You have full control of the values of a tracker context with the `setProps` function, you can change them completely. After you set a new value, all next track events which use this tracker context with `withTrackerContext` will contain the updated tracker context value.

```ts
// a common tracker context example, no user id is defined by default
const trackerContext = createTrackerContext({ userId: null })

// we can set the same properties with different values
trackerContext.setProps({ userId: 'uuid' })

// we can set completely different properties
trackerContext.setProps({ new: 'values' })

// or both
trackerContext.setProps({ userId: 'uuid', new: 'values' })
```
