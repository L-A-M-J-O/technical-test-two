<template>
  <div>
    <h1>Detalle del Cliente</h1>

    <div v-if="customersStore.loading">Cargando cliente...</div>

    <div v-else-if="customersStore.selected">
      <p><strong>Nombre:</strong> {{ customersStore.selected.givenName }}</p>
      <p><strong>Email:</strong> {{ customersStore.selected.email }}</p>
      <p><strong>Teléfono:</strong> {{ customersStore.selected.phone }}</p>

      <h2>Productos Contratados</h2>
      <ul v-if="(customersStore.products || []).length > 0">
        <li v-for="product in customersStore.products" :key="product._id">
          {{ product.productName }} - {{ product.productTypeName }}
        </li>
      </ul>
      <p v-else>No hay productos contratados para este cliente.</p>
    </div>

    <div v-else>
      <p>No se encontró el cliente.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { CustomersBloc } from '@/modules/customers/presentation/bloc/CustomersBloc'
  import { GenericUseCase } from '@/modules/core/domain/application/useCases/GenericUseCase'
  import { CustomsRepository } from '@/modules/customers/data/repository/CustomersRepository'
  import { useCustomersResponse } from '@/modules/customers/presentation/store/CustomersStore'
  import type { ICustomer } from '@/modules/customers/domain/core/CustomersEntity'

  const repository = new CustomsRepository()
  const useCase = new GenericUseCase<ICustomer>(repository)
  const bloc = new CustomersBloc(useCase)

  const customersStore = useCustomersResponse()
  const route = useRoute()

  const customerId = route.params.id as string
  onMounted(async () => {
    await bloc.getCustomerById(customerId)
  })
</script>
