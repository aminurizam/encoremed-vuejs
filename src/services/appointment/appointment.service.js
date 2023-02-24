import axios from 'axios'
import authHeader from '@/services/auth-header' 

const API_URL = window.API_URL+'appointment/';

class AppointmentService {
    async getListAppointment() {
        return await axios.get(API_URL + 'list', { headers: authHeader() });
    }

    async createAppointment(body) {
        return await axios.post(API_URL + 'create', body, { headers: authHeader() });
    }

    async rescheduleAppointment(body) {
        return await axios.post(API_URL + 'reschedule', body, { headers: authHeader() });
    }

    async arriveAppointment(body) {
        return await axios.post(API_URL + 'arrive', body, { headers: authHeader() });
    }
}

export default new AppointmentService();