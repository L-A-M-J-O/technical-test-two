import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  ICustomer,
  IProduct,
} from '@/modules/customers/domain/core/CustomersEntity'

export const useCustomersResponse = defineStore('useCustomersResponse', () => {
  const items = ref<Partial<ICustomer>[]>([])
  const loading = ref<boolean>(false)
  const products = ref<IProduct[]>([])
  const toggleLoading = () => (loading.value = !loading.value)

  const setResponse = ({ collection }: { collection: ICustomer[] }): void => {
    items.value = collection
  }

  const selected = ref<ICustomer | undefined>()
  const setSelected = (customer: ICustomer & { products?: IProduct[] }) => {
    selected.value = customer
    if (customer.products) {
      products.value = customer.products
    }
  }

  return {
    items,
    loading,
    products,
    selected,
    toggleLoading,
    setResponse,
    setSelected,
  }
})

export type CustomsResponseStore = Omit<
  ReturnType<typeof useCustomersResponse>,
  keyof ReturnType<typeof defineStore>
>
