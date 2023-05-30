import { parse } from 'envfile'

export class Environment {
  loadedEnvironment: { [key: string]: string } = {}

  constructor(loadedEnvironment: { [key: string]: string } = {}) {
    this.loadedEnvironment = loadedEnvironment
  }

  get(key: string): string | undefined {
    return this.loadedEnvironment[key] ?? import.meta.env[key]
  }
}

export const loadEnvironment = async (): Promise<Environment> => {
  const response = await fetch('/env')
  const data = await response.text()
  return new Environment(parse(data))
}
