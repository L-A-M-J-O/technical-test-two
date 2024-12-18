<template>
  <div>
    <h1>Dashboard</h1>
    <div v-if="customersStore.loading">Cargando clientes...</div>
    <ul v-else>
      <li v-for="customer in customersStore.items" :key="customer.customerId">
        <router-link :to="`/customers/${customer.customerId}`">
          {{ customer.givenName }} {{ customer.familyName1 }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { CustomersBloc } from '@/modules/customers/presentation/bloc/CustomersBloc'
  import { GenericUseCase } from '@/modules/core/domain/application/useCases/GenericUseCase'
  import { CustomsRepository } from '@/modules/customers/data/repository/CustomersRepository'
  import { useCustomersResponse } from '@/modules/customers/presentation/store/CustomersStore'
  import type { ICustomer } from '@/modules/customers/domain/core/CustomersEntity'

  const repository = new CustomsRepository()
  const useCase = new GenericUseCase<ICustomer>(repository)
  const bloc = new CustomersBloc(useCase)

  const customersStore = useCustomersResponse()

  onMounted(() => {
    bloc.getAllCustomers()
  })
</script>
