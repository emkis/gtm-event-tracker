# gtm-event-tracker

![Downloads](https://img.shields.io/npm/dt/gtm-event-tracker?colorA=000&colorB=000 "Downloads")
![Bundle Size](https://img.shields.io/bundlephobia/minzip/gtm-event-tracker/latest?style=flat&colorA=000&colorB=000&label=bundle%20size "Bundle Size")
![Version](https://img.shields.io/npm/v/gtm-event-tracker?style=flat&colorA=000&colorB=000 "Version")

A tiny, type-safe and scalable solution for triggering [Google Tag Manager](https://tagmanager.google.com) track events.

It's designed for applications that need to trigger many track events, it solves common problems like writing similar events multiple times, managing "global" required event properties, and debugging track events. It is framework agnostic and configurable, so it probably is the only solution you need for your web application.

## Installation
It's required you have [Google Tag Manager](https://tagmanager.google.com) installed already in your application because it depends on `window.dataLayer` by default. If you use a different `targetProperty` to push your events, you can use the `configure` function to change this behavior.

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

#### Usage
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


### `withTrackerContext`
Accepts a tracker context as the first argument and returns functions responsible for triggering the track events and pushing them to the `targetProperty`.

#### Usage
With Typescript (recommended):
```ts
type TrackEventProperties = {
  event: string
  category?: string
  current_page: string
  business_context: string
}

// this Generic will ensure that track events have the same contract
withTrackerContext<TrackEventProperties>(trackerContext)
```

Without Typescript:
```ts
withTrackerContext(trackerContext)
```

#### Track functions
The return of the `withTrackerContext` function is an object containing all available functions for tracking events.

```ts
const tracker = withTrackerContext<TrackEventProperties>(trackerContext)
```

##### `trackEvent`
It pushes events to the `targetProperty` (`window.dataLayer` by default). It receives an object as the first argument, and it must contain all required properties in the type provided as the Generic, which in this case, is the `TrackEventProperties`.

```ts
tracker.trackEvent({
  event: 'recommended_page_viewed',
  current_page: 'feed/recommended-for-you',
  business_context: 'feed',
  category: 'views',
})

// you can include different properties if you need
tracker.trackEvent({
  event: 'notifications_enabled',
  channel_id: 'jqk-aof',
  current_page: 'channel/:id',
  business_context: 'content',
})
```

When this function is called an object will be pushed to the `targetProperty`. This object is created combining the tracker context properties and event properties you provide as the first argument. They are combined using the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax), so you can override the "global" event properties from tracker context in your events if you need to.

**Check out the examples below:**

<details>
  <summary>Common usage</summary>

```ts
import { createTrackerContext, withTrackerContext } from 'gtm-event-tracker'

type TrackEventProperties = {
  foo: string
  bar: string
  baz: string
}

const trackerContext = createTrackerContext({ global_property: 'from context' })
const { trackEvent } = withTrackerContext<TrackEventProperties>(trackerContext)

trackEvent({ foo: 'AAA', bar: 'BBB', baz: 'CCC' })
```

Object pushed to the `targetProperty`:
```json
{
  "global_property": "from context",
  "foo": "AAA",
  "bar": "BBB",
  "baz": "CCC"
}
```
</details>

<details>
  <summary>Overriding track context properties</summary>

```ts
import { createTrackerContext, withTrackerContext } from 'gtm-event-tracker'

type TrackEventProperties = {
  foo: string
  bar: string
  baz: string
}

const trackerContext = createTrackerContext({ global_property: 'from context' })
const { trackEvent } = withTrackerContext<TrackEventProperties>(trackerContext)

trackEvent({
  global_property: 'overwritten in this event',
  foo: 'DDD',
  bar: 'EEE',
  baz: 'FFF',
})
```

Object pushed to the `targetProperty`:
```json
{
  "global_property": "overwritten in this event",
  "foo": "DDD",
  "bar": "EEE",
  "baz": "FFF"
}
```
</details>

<details>
  <summary>Adding new properties to specific events</summary>

```ts
import { createTrackerContext, withTrackerContext } from 'gtm-event-tracker'

type TrackEventProperties = {
  foo: string
  bar: string
  baz: string
}

const trackerContext = createTrackerContext({ global_property: 'from context' })
const { trackEvent } = withTrackerContext<TrackEventProperties>(trackerContext)

trackEvent({
  foo: 'GGG',
  bar: 'HHH',
  baz: 'III',
  some_property: 'some property that I will need just for this event',
  another_one: 'you got it',
})
```

Object pushed to the `targetProperty`:
```json
{
    "global_property": "from context",
    "foo": "GGG",
    "bar": "HHH",
    "baz": "III",
    "some_property": "some property that I will need just for this event",
    "another_one": "you got it"
}
```
</details>

<details>
  <summary>Using TypeScript Generics with annotations</summary>

```ts
// ℹ️ These are the track event properties we support in this app.
type TrackEventProperties = {
  event: string
  category: string

  // ℹ️ you can create optional properties too
  current_page?: string
  business_context?: string

  // ℹ️ you can add custom descriptions that helps your
  // team to use the correct properties.

  /**
   * This property isn't supported anymore. Use the `currentPage` property instead.
   * @deprecated
   */
  url?: string
}

const trackerContext = createTrackerContext()
const { trackEvent } = withTrackerContext<TrackEventProperties>(trackerContext)

trackEvent({
  event: 'user_photo_updated',
  category: 'settings',
  business_context: 'account',
  current_page: 'user/settings',
})
```
</details>
