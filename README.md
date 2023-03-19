# gtm-event-tracker
![Downloads](https://img.shields.io/npm/dt/gtm-event-tracker?colorA=000&colorB=000 "Downloads")
![Bundle Size](https://img.shields.io/bundlephobia/minzip/gtm-event-tracker/latest?style=flat&colorA=000&colorB=000&label=bundle%20size "Bundle Size")
![Version](https://img.shields.io/npm/v/gtm-event-tracker?style=flat&colorA=000&colorB=000 "Version")

A tiny (1KB gzip), type-safe and zero-dependency solution for triggering [Google Tag Manager](https://tagmanager.google.com) track events.

It's designed for applications that need to trigger a lot of track events, and it solves common problems like writing similar events multiple times, managing "global" event properties, and debugging track events. This solution is framework agnostic and configurable, so it's probably the only solution you need for your web application for triggering track events.


## Installation
It's required you have [Google Tag Manager](https://tagmanager.google.com) installed already in your application because it depends on `window.dataLayer` by default. If you use a different `targetProperty` to push your events, you can use the `configure` function to change this behavior.

```bash
yarn add gtm-event-tracker # or npm install gtm-event-tracker
```


## Why this library over `dataLayer.push`?
- Type-safe events
- Less repetition of similar track events
- Centralized way to manage "global" event properties
- Easy way to debug your track events
- Server-side compatible


## Server-Side Rendering (SSR)
This library is SSR compatible, there is only one caveat though. The `targetProperty` isn't available on Server-Side, this means you can't call the `trackEvent` function. The reason why is because Google Tag Manager creates the `targetProperty` (`window.dataLayer` by default) only on Client-Side.

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
It pushes events to the `targetProperty` (`window.dataLayer` by default). It receives an object as the first argument, and it must contain all required properties in the type provided as the Generic (`TrackEventProperties` in this case).

```ts
tracker.trackEvent({
  event: 'recommended_page_viewed',
  current_page: 'feed/recommended-for-you',
  business_context: 'feed',
  category: 'views',
})

// you can add different properties if you need
tracker.trackEvent({
  event: 'notifications_enabled',
  channel_id: 'jqk-aof', // this property was not declared in TrackEventProperties type
  current_page: 'channel/:id',
  business_context: 'content',
})
```

When this function is called an object will be pushed to the `targetProperty`. This object is created combining the tracker context properties and these event properties you provide. They are combined using the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax), so you can override the "global" event properties from tracker context in your events if you need to.

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

##### `partialTrackEvent`
It receives track event properties in the same way as the `trackEvent` function, but all properties are optional here. The return is the `trackEvent` function with these track event properties injected by default. Useful when you need to track a lot of similar events on the same page with multiple repeated properties.

```ts
const trackAwesomeEvent = tracker.partialTrackEvent(repeatedProperties)
trackAwesomeEvent(missingRequiredProperties)
```

Once the returned function is called, the final object will be pushed to the `targetProperty`. This object is also created by combining event properties using the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax), this means you can override all of them wherever you think is appropriate.

How's the final object is created:
```ts
{ ...trackerContextProps, ...repeatedProperties, ...missingRequiredProperties }
```

**Check out the examples below:**

<details>
  <summary>TypeScript auto-completion demo</summary>

  ![](/.github/readme/videos/example-withTrackerContext.gif)
</details>

<details>
  <summary>Common usage</summary>

```ts
type TrackEventProperties = {
  event: string
  category?: string
  current_page: string
  business_context: string
}

const trackerContext = createTrackerContext({
  user_type: user.profileType,
  user_id: user.id,
  B2B_partner_id: partner.id,
})

const tracker = withTrackerContext<TrackEventProperties>(trackerContext)

const trackAccountEvent = tracker.partialTrackEvent({
  current_page: 'account/security',
  business_context: 'account',
})

trackAccountEvent({ event: 'security_page_viewed', category: 'views' })
trackAccountEvent({ event: 'password_changed' })
trackAccountEvent({ event: 'new_device_authorized' })
```

First object pushed to the `targetProperty`:
```json
{
  "user_type": "administrator",
  "user_id": "fancy-uuid",
  "B2B_partner_id": "fancy-uuid",
  "current_page": "account/security",
  "business_context": "account",
  "event": "security_page_viewed",
  "category": "views"
}
```
</details>


### `setLogger`
Is a function that allows you to replace globally the default logger used to log track events and context changes. By default, the `window.console` is used.

> The logger is disabled by default, to enable it, use the `configure` function.

#### Usage
```ts
setLogger({
   log: action => {
      yourCustomLogger(action)
   },
 })
```

#### Logger actions
There are different types of log actions, each one of them can be identified by the `type` property in the action object. Each action type has different properties in it's object, because they need different information to give you more context when debugging.

**The available logger action types are:**

<details>
  <summary>event</summary>
  It's logged when a tracker event is triggered by the `trackEvent` function.
  <br><br>

  **Output object format:**
  | Object key | Type | Description |
  | --- | --- | --- |
  | type | `string` | The logger action type |
  | properties | `object` | All properties included in this track event  |
  | contextName | `string?` | The name of the tracker context which is being used for this track event |

  **Example:**
  ```ts
  const context = createTrackerContext({ foo: 'bar' }, { name: 'main-context' })
  const tracker = withTrackerContext(context)
  tracker.trackEvent({ lorem: 'ipsum' }) // it's triggered here
  ```

  **Logger output:**
  ```json
  {
    "type": "event",
    "contextName": "main-context",
    "properties": {
      "foo": "bar",
      "lorem": "ipsum"
    }
  }
  ```
</details>

<details>
  <summary>context-created</summary>
  It's logged when a tracker context is created.
  <br><br>

  **Output object format:**
  | Object key | Type | Description |
  | --- | --- | --- |
  | type | `string` | The logger action type |
  | properties | `object` | All initial properties provided on the `createTrackerContext` function |
  | contextName | `string?` | The name of the tracker context which is being updated |

  **Example:**
  ```ts
  createTrackerContext({ foo: 'bar', oi: 'tchau' }, { name: 'sample-context' }) // it's triggered here
  ```

  **Logger output:**
  ```json
  {
    "type": "context-created",
    "contextName": "sample-context",
    "properties": {
      "foo": "bar",
      "oi": "tchau"
    }
  }
  ```
</details>

<details>
  <summary>context-updated</summary>
  It's logged when a tracker context is updated.
  <br><br>

  **Output object format:**
  | Object key | Type | Description |
  | --- | --- | --- |
  | type | `string` | The logger action type |
  | previousProperties | `object` | Previous properties within this tracker context, before calling `setProps`  |
  | currentProperties | `object` | Current properties within this tracker context, after calling `setProps` |
  | contextName | `string?` | The name of the tracker context created |

  **Example:**
  ```ts
  const context = createTrackerContext({ user: null, cool: false })
  context.setProps({ user: 'jf9hd0' })  // it's triggered here
  ```

  **Logger output:**
  ```json
  {
    "type": "context-updated",
    "previousProperties": {
      "user": null,
      "cool": false
    },
    "currentProperties": {
      "user": "jf9hd0"
    }
  }
  ```
</details>


### `configure`
It's the function responsible for configuring/customizing this package. Each option is responsible for one specific thing, so you can read the full list below.

#### Usage
```ts
configure({
  debugAll: false,
  debugEvents: true,
  targetProperty: () => myCustomDataLayer
})
```

#### Available options
  | Object key | Type | Default value | Description |
  | --- | --- | --- | --- |
  | debugEvents | `boolean` | `false` | Enables logging track events, these events are logged when the `trackEvent` function is called. |
  | debugContext | `boolean` | `false` | Enables logs for context operations. These events are logged when you call `createTrackerContext`, and when you call `setProps` in a created tracker context. |
  | debugAll | `boolean` | `false` | Enables logs for everything, is equivalent of setting all `debug*` options to `true`. |
  | targetProperty | `function` | `() => window.dataLayer` | This is the function that returns the array which the events are going to be pushed into. You should change it if you don't use the default `window.dataLayer`. |


## Error codes
To reduce the amount of data transferred over the network, the full error messages are excluded in the production build of this package. This means in development mode you will be able to see the full error messages when debugging your application, but if you have an error in production, this error will be identified by an error code.

### Available error codes:
| Code | Message |
| ---- | ------- |
| 0 | You've called configure function without a configuration object. |
| 1 | Triggering events is not possible on server-side. Make sure to only trigger events after your app is running on the client-side. |
| 2 | The targetProperty is not defined. Make sure you didn't forget to add Google Tag Manager's script in your application. If you did but you don't use the default 'window.dataLayer' array, you can set your custom targetProperty with the configure function. |
| 3 | The targetProperty is not an array. Either you didn't installed Google Tag Manager correctly or you configured the targetProperty incorrectly. |
