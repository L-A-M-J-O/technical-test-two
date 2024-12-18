<template>
  <Navbar />
  <div>
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Usuarios</h2>

        <div v-if="customersStore.loading" class="text-gray-500">
          Cargando clientes...
        </div>

        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div
            v-for="customer in customersStore.items"
            :key="customer.customerId"
            class="bg-white overflow-hidden shadow rounded-lg animate-fade-in"
          >
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-12 w-12">
                  <img
                    class="h-12 w-12 rounded-full"
                    :src="`https://via.placeholder.com/150?text=${customer.givenName.charAt(
                      0
                    )}`"
                    alt=""
                  />
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900">
                    {{ customer.givenName }} {{ customer.familyName1 }}
                  </h3>
                  <p class="text-sm text-gray-500">{{ customer.email }}</p>
                  <router-link
                    :to="`/customers/${customer.customerId}`"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800"
                  >
                    Ver Detalle
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
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

  onMounted(() => {
    bloc.getAllCustomers()
  })
</script>

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
</style>
