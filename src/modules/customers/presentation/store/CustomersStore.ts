import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ICustomer } from '@/modules/customers/domain/core/CustomersEntity'

export const useCustomersResponse = defineStore('useCustomersResponse', () => {
  const items = ref<Partial<ICustomer>[]>([])
  const loading = ref<boolean>(false)

  const toggleLoading = () => (loading.value = !loading.value)

  /**
   * Required: this methods sets the items in the composable, so it can apply filters, sorting and pagination over this items
   * @param Object collection
   */

  const setResponse = ({ collection }: { collection: ICustomer[] }): void => {
    items.value = collection
  }

  const selected = ref<ICustomer | undefined>()
  const setSelected = (custom?: ICustomer) => {
    selected.value = custom
  }
  return {
    items,
    selected,
    loading,
    toggleLoading,
    setResponse,
    setSelected,
  }
})

export type CustomsResponseStore = Omit<
  ReturnType<typeof useCustomersResponse>,
  keyof ReturnType<typeof defineStore>
>
