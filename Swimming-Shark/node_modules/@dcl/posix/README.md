# @dcl/posix

Contains the environment type definitions for the exposed functions in the scenes. For that reason, this repository may be the most important part of the Decentraland's JS SDK.

## Why is it important?

**To ensure backwards compatibility**: according to its vision, Decentraland is a project that should be designed to last forever. That may be very difficult or even impractical, with this interface, we can ensure that every piece of JS code runs in a backwards compatible enviroment.

**To enable multiple runtimes**: keeping the interface simple, help the developers to implement new runtimes without being tied to platform specific APIs, i.e: IndexedDB, `localStorage`, or the `process` variable in NodeJS. As an example, the runtime does not expose `setTimeout` which is not a standard API.

## Contributions

This repository is append only, more specifically, nothing can be changed or removed once a type declaration gets released with a version tag (excluding the `@next` releases).

That makes this project almost static, because every addition is a maintainability compromise that will last forever.

For exceptional cases, like API additions, it should be a very thoughtful process for the reasons mentioned above, and the proposed mechanism is to first draft the full scope of the solution in a PR explaining the reasons and evaluating other options.

The most common and least "dangerous" addition to this repository are events from the Renderer or the Runtime (see `IEvents`).

Please follow the naming convention for events, it was decided to not use the `on` prefix on events since it is redundant and confusing with observables and event emiters: `events.on("eventName")` is better than `events.on("onEventName")`.

Also notice that `enum` are not allowed in ambient declarations, since enums are also values in Typescript. Use union types instead.
