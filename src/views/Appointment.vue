<template>
  <Header />
  <div class="flex justify-between p-4">
    <h1 class="text-2xl font-semibold">Appointments</h1>
    <router-link
      :to="{ name: 'CreateAppointment' }"
      class="px-4 py-2 font-medium tracking-wide text-green-800 bg-green-300 rounded hover:bg-green-500 hover:text-green-100"
      >Create Appointment</router-link
    >
  </div>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200 table-auto">
      <thead class="bg-gray-50">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
          >
            Appointment Date & Time
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
          >
            Patient Name
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
          >
            Patient IC Number
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
          >
            Status
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
          >
            Arrived At
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
          >
            Created At
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="appointment in appointments" :key="appointment.id">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900">
              {{ appointment.appt_datetime }}
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">
              {{ appointment.patient ? appointment.patient.name : "N/A" }}
            </div>
          </td>

          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">
              {{ appointment.patient ? appointment.patient.ic_number : "N/A" }}
            </div>
          </td>

          <td class="px-6 py-4 whitespace-nowrap">
            <span
              class="inline-flex px-2 text-xs font-semibold leading-5 capitalize rounded-full"
              :class="{
                'text-green-800 bg-green-100': appointment.status == 'pending',
                'text-cyan-800 bg-cyan-100': appointment.status == 'arrived',
                'text-orange-800 bg-orange-100': appointment.status == 'rescheduled',
              }"
            >
              {{ appointment.status }}
            </span>
          </td>

          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900">
              {{ appointment.arrived_at ?? "N/A" }}
            </div>
          </td>

          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900">
              {{ appointment.created_at }}
            </div>
          </td>

          <td
            class="flex justify-between px-6 py-4 whitespace-nowrap"
            v-if="appointment.status === 'pending'"
          >
            <!-- <router-link ></router-link> -->
            <form @submit.prevent="markAsArrived(appointment)">
              <button
                class="inline-flex px-4 py-2 mr-2 text-sm font-semibold leading-5 capitalize rounded text-cyan-800 bg-cyan-100 hover:bg-cyan-300"
              >
                Arrived
              </button>
            </form>
            <form @submit.prevent="markAsRescheduled(appointment)">
              <button
                class="inline-flex px-4 py-2 text-sm font-semibold leading-5 text-yellow-800 capitalize bg-yellow-100 rounded hover:bg-yellow-300"
              >
                Rescheduled
              </button>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import appointmentService from "@/services/appointment/appointment.service";
import Header from "@/views/Header.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {
      appointments: [],
    };
  },
  async mounted() {
    try {
      const appointments = await this.fetchAppointments();
      this.appointments = appointments;
    } catch (error) {
      console.error(error);
    }
  },

  methods: {
    async fetchAppointments() {
      const response = await appointmentService.getListAppointment();
      return response.data;
    },

    async markAsArrived(appointment) {
      try {
        const response = await appointmentService.arriveAppointment({
          id: appointment.id,
        });
        appointment.status = response.data.appointment.status;
        return;
      } catch (error) {
        console.error(error);
      }
    },

    async markAsArrived(appointment) {
      try {
        const response = await appointmentService.arriveAppointment({
          id: appointment.id,
        });
        appointment.status = response.data.appointment.status;
        appointment.arrived_at = response.data.appointment.arrived_at;
        return;
      } catch (error) {
        console.error(error);
      }
    },

    async markAsRescheduled(appointment) {
      try {
        const response = await appointmentService.rescheduleAppointment({
          id: appointment.id,
        });
        if (response) {
          this.$router.push({
            name: "CreateAppointment",
            query: {
              name: appointment.patient.name,
              ic_number: appointment.patient.ic_number,
              mrn: appointment.patient.mrn,
              mobile_number: appointment.patient.mobile_number,
            },
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
