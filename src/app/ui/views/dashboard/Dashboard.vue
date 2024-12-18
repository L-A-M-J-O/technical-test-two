<template>
  <div>
    <h1>Dashboard</h1>
    <div v-if="customersStore.loading">Cargando clientes...</div>
    <ul v-else>
      <li v-for="customer in customersStore.items" :key="customer.customerId">
        {{ customer.givenName }} {{ customer.familyName1 }}
      </li>
    </ul>
    <div v-if="customersStore.selected">
      <h2>Cliente Seleccionado:</h2>
      <p>Nombre: {{ customersStore.selected.givenName }}</p>
      <p>Email: {{ customersStore.selected.email }}</p>
    </div>
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
