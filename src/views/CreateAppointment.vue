<template>
  <Header />
  <form class="max-w-md p-4 mx-auto" @submit.prevent="submitForm">
    <h1 class="mb-8 text-2xl font-semibold">Create New Appointment</h1>
    <div class="mb-4">
      <label class="block mb-2 font-bold text-gray-700" for="name">
        Appointment Date & Time
      </label>
      <input
        class="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
        id="name"
        type="datetime-local"
        v-model="form.appt_datetime"
        required

      />
    </div>
    <div class="mb-4">
      <label class="block mb-2 font-bold text-gray-700" for="email">
        Patient Name
      </label>
      <input
        class="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
        placeholder="John Doe"
        v-model="form.patient_name"
        required

      />
    </div>
    <div class="mb-4">
      <label class="block mb-2 font-bold text-gray-700" for="password">
        Patient I/C Number
      </label>
      <input
        class="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
        id="icNumber"
        type="text"
        placeholder="XXXXXX-XX-XXXX"
        v-model="form.patient_ic"
        required
      />
    </div>
    <div class="mb-4">
      <label class="block mb-2 font-bold text-gray-700" for="phone">
        Patient MRN
      </label>
      <input
        class="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
        id="mrn"
        type="text"
        placeholder="A001"
        v-model="form.patient_mrn"
        required
      />
    </div>
    <div class="mb-4">
      <label class="block mb-2 font-bold text-gray-700" for="message">
        Patient Mobile Number
      </label>
      <input
        class="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
        id="mobileNo"
        type="text"
        placeholder="012-345xxxx"
        v-model="form.patient_mobile_no"
        required
      />
    </div>
    <button
      class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      type="submit"
    >
      Submit
    </button>
  </form>
</template>

<script>
import appointmentService from "@/services/appointment/appointment.service";
import Header from "./Header.vue";

export default {
  name: "CreateAppointment",
  components: {
    Header,
  },
  data() {
    return {
      form: {
        appt_datetime: "",
        patient_name: "",
        patient_ic: "",
        patient_mrn: "",
        patient_mobile_no: "",
      },
    };
  },
  mounted() {
    this.form.patient_name = this.$route.query.name;
    this.form.patient_ic = this.$route.query.ic_number;
    this.form.patient_mrn = this.$route.query.mrn;
    this.form.patient_mobile_no = this.$route.query.mobile_number;
  },
  methods: {
    async submitForm() {
      try {
        this.form.appt_datetime = this.formatDate(this.form.appt_datetime);
        const res = await appointmentService.createAppointment(this.form);
        console.log(res);
        if (res) {
          this.$router.push("/appointments");
        }
        // TODO: NOTIFY USER SUCCESS CREATED
      } catch (error) {
        console.error(error);
      }
    },

    formatDate(dt) {
      const newDt = new Date(dt);
      const year = newDt.getFullYear();
      const month = ("0" + (newDt.getMonth() + 1)).slice(-2);
      const day = ("0" + newDt.getDate()).slice(-2);
      const hours = ("0" + newDt.getHours()).slice(-2);
      const minutes = ("0" + newDt.getMinutes()).slice(-2);
      const seconds = ("0" + newDt.getSeconds()).slice(-2);
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
  },
};
</script>
