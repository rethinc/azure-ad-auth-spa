import { Person } from '@/application/app/api/Person'
import { PersonsResponse } from '@/application/app/api/PersonsResponse'

export interface ApiClient {
  getPersons: (accessToken: string) => Promise<Person[]>
}

const apiClient = (): ApiClient => {
  const apiBaseUrl = 'https://my-auth-test-api.azurewebsites.net'

  const get = async <T>(url: string, accessToken: string): Promise<T> => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return JSON.parse(await response.text())
  }

  const getPersons = async (accessToken: string): Promise<Person[]> => {
    return (await get<PersonsResponse>(`${apiBaseUrl}/persons`, accessToken))
      .data
  }

  return {
    getPersons,
  }
}

export const useApiClient = (): ApiClient => apiClient()
