## API Report File for "gtm-event-tracker"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public
export type Configurations = {
    logger: LoggerConfigurations;
};

// @public
export const configure: (customConfigs: Partial<Configurations>) => void;

// @public
export function createTrackerContext(initialProps?: EventProperties, options?: TrackerContextOptions): TrackerContext;

// @public
export type EventProperties = Record<string, string | number>;

// @public
export type Logger = {
    log: (action: LoggerAction) => void;
    warn: (action: LoggerAction) => void;
    error: (action: LoggerAction) => void;
};

// @public
export type LoggerAction = {
    type: 'event';
    properties: EventProperties;
} | {
    type: 'context-created';
    contextName?: string;
    properties: EventProperties;
} | {
    type: 'context-updated';
    contextName?: string;
    previousProperties: EventProperties;
    currentProperties: EventProperties;
};

// @public
export type LoggerConfigurations = {
    debugAll: boolean;
    debugEvents: boolean;
    debugContext: boolean;
};

// @public
export const setLogger: (targetLogger: Logger) => void;

// @public
export type SubtractEventProperties<OriginalProps, PropsToSubtract> = Omit<OriginalProps, keyof PropsToSubtract> & EventProperties;

// @public
export type TrackerContext = Readonly<{
    setProps: (props: EventProperties) => void;
}>;

// @public
export type TrackerContextOptions = {
    debug?: boolean;
    name?: string;
};

// @public
export type TrackModule<CustomEventProperties extends EventProperties> = {
    trackEvent: (eventProps: CustomEventProperties & EventProperties) => void;
    setRepeatedProps: <RepeatedProps extends Partial<CustomEventProperties>>(repeatedProps: RepeatedProps) => (remainingProps: SubtractEventProperties<CustomEventProperties, RepeatedProps>) => void;
};

// @public
export function withTrackerContext<Properties extends EventProperties>({ context, }: TrackerContext): TrackModule<Properties>;

// (No @packageDocumentation comment for this package)

```