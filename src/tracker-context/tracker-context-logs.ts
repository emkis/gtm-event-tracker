import { EventProperties } from '../data-layer'
import { getLogger } from '../logger'

type ContextCreatedParams = {
  contextName?: string
  properties: EventProperties
}

export function logContextCreated(params: ContextCreatedParams) {
  const logger = getLogger()
  const { contextName, properties } = params
  logger.log({ type: 'context-created', contextName, properties })
}

type ContextUpdatedParams = {
  contextName?: string
  currentProps: EventProperties
  newProps: EventProperties
}

export function logContextUpdated(params: ContextUpdatedParams) {
  const logger = getLogger()
  const { contextName, currentProps, newProps } = params

  logger.log({
    type: 'context-updated',
    contextName,
    previousProperties: currentProps,
    currentProperties: newProps,
  })
}
