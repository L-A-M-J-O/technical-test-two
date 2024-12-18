<template>
  <Navbar />
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-semibold text-gray-800">Detalle del Cliente</h1>
    <div v-if="customersStore.loading" class="text-gray-500 mt-4">
      Cargando cliente...
    </div>

    <div v-else-if="customersStore.selected">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg mt-6">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Información del Usuario
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Detalles personales y productos contratados.
          </p>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div
              class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">Nombre Completo</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ customersStore.selected.givenName }}
                {{ customersStore.selected.familyName1 }}
              </dd>
            </div>
            <div
              class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">
                Correo Electrónico
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ customersStore.selected.email }}
              </dd>
            </div>
            <div
              class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">Teléfono</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ customersStore.selected.phone }}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Productos Contratados
        </h2>
        <ul v-if="customersStore.products.length > 0" class="space-y-4">
          <li
            v-for="product in customersStore.products"
            :key="product._id"
            class="bg-white shadow overflow-hidden sm:rounded-lg"
          >
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ product.productName }}
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                Tipo: {{ product.productTypeName }}
              </p>
              <p class="mt-1 text-sm text-gray-500">
                Velocidad:
                {{ product.mbSpeed ? product.mbSpeed + ' MB' : 'N/A' }}
              </p>
              <p class="mt-1 text-sm text-gray-500">
                Datos: {{ product.gbData ? product.gbData + ' GB' : 'N/A' }}
              </p>
            </div>
          </li>
        </ul>
        <p v-else class="text-gray-500">
          No hay productos contratados para este cliente.
        </p>
      </div>
    </div>
    <div v-else class="text-red-500 mt-4">No se encontró el cliente.</div>

    <div
      class="mt-6 flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3"
    >
      <button
        type="button"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Editar Cliente
      </button>
      <router-link
        to="/"
        class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Volver a la Lista
      </router-link>
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

  import Navbar from '@/app/ui/components/navbar/Navbar.vue'

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
