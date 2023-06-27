import { fetchAll } from '@/services/users'
import type { User } from '@/services/users.types'
import { ref } from 'vue'

export function useCollaborators() {
  const users = ref<null | User[]>(null)
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  async function fetchData() {
    isLoading.value = true

    try {
      const response = await fetchAll()
      users.value = response
    } catch (err: unknown) {
      error.value = (err as Error).message
    } finally {
      isLoading.value = false
    }
  }

  fetchData()

  return { users, isLoading, error }
}
