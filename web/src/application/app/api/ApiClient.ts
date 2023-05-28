import { Person } from '@/application/app/api/Person'
import { PersonsResponse } from '@/application/app/api/PersonsResponse'
import { Timeslot } from '@/application/app/api/Timeslot'
import { TimeslotsResponse } from '@/application/app/api/TimeslotsResponse'

export interface ApiClient {
  getPersons: (accessToken: string) => Promise<Person[]>
  getTimeslots: (accessToken: string) => Promise<Timeslot[]>
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

  const getTimeslots = async (accessToken: string): Promise<Timeslot[]> => {
    return (
      await get<TimeslotsResponse>(`${apiBaseUrl}/timeslots`, accessToken)
    ).data
  }

  return {
    getPersons,
    getTimeslots,
  }
}

export const useApiClient = (): ApiClient => apiClient()
