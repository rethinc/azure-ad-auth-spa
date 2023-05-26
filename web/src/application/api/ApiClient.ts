import { Person } from '@/application/api/Person'
import { PersonsResponse } from '@/application/api/PersonsResponse'

export interface ApiClient {
  getPersons: () => Promise<Person[]>
}

const apiClient = (): ApiClient => {
  const apiBaseUrl = 'https://my-auth-test-api.azurewebsites.net'

  const get = async <T>(url: string): Promise<T> => {
    const response = await fetch(url)
    return JSON.parse(await response.text())
  }

  const getPersons = async (): Promise<Person[]> => {
    return (await get<PersonsResponse>(`${apiBaseUrl}/persons`)).data
  }

  return {
    getPersons,
  }
}

export const useApiClient = (): ApiClient => apiClient()
