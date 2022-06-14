import type { EventProperties } from '@/shared/data-layer'
import { loggerManager } from '@/shared/logger-manager'

type ContextCreatedParams = {
  contextName?: string
  properties: EventProperties
}

type ContextUpdatedParams = {
  contextName?: string
  currentProps: EventProperties
  newProps: EventProperties
}

export function logContextCreated(params: ContextCreatedParams) {
  const { contextName, properties } = params
  loggerManager.log({ type: 'context-created', contextName, properties })
}

export function logContextUpdated(params: ContextUpdatedParams) {
  const { contextName, currentProps, newProps } = params

  loggerManager.log({
    type: 'context-updated',
    contextName,
    previousProperties: currentProps,
    currentProperties: newProps,
  })
}
