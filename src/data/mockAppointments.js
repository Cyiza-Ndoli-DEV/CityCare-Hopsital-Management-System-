// src/data/mockAppointments.js

// Helper to format dates as YYYY-MM-DD
const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
};

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);


export const mockAppointments = [
  {
    id: 'APP001',
    patientName: 'John Doe',
    patientId: 'PT001',
    doctorName: 'Dr. Emily Carter',
    department: 'Cardiology',
    date: formatDate(today), // Today!
    time: '10:00 AM',
    status: 'Confirmed',
    reason: 'Routine check-up.',
  },
  {
    id: 'APP002',
    patientName: 'Jane Smith',
    patientId: 'PT002',
    doctorName: 'Dr. Michael Lee',
    department: 'Pediatrics',
    date: formatDate(today), // Today!
    time: '11:30 AM',
    status: 'Pending', // Pending!
    reason: 'Follow-up on seasonal flu.',
  },
  {
    id: 'APP003',
    patientName: 'Peter Jones',
    patientId: 'PT003',
    doctorName: 'Dr. Sarah Chen',
    department: 'General Medicine',
    date: formatDate(tomorrow), // Tomorrow
    time: '09:00 AM',
    status: 'Confirmed',
    reason: 'Annual physical examination.',
  },
  {
    id: 'APP004',
    patientName: 'Mary Williams',
    patientId: 'PT004',
    doctorName: 'Dr. Emily Carter',
    department: 'Cardiology',
    date: formatDate(yesterday), // Yesterday
    time: '02:00 PM',
    status: 'Completed',
    reason: 'Patient rescheduled to a later date.',
  },
  {
    id: 'APP005',
    patientName: 'Carlos Garcia',
    patientId: 'PT005',
    doctorName: 'Dr. Robert Brown',
    department: 'Orthopedics',
    date: formatDate(nextWeek), // Next Week
    time: '03:30 PM',
    status: 'Confirmed',
    reason: 'Consultation for knee pain.',
  },
];

export const mockDoctors = ['Dr. Emily Carter', 'Dr. Michael Lee', 'Dr. Sarah Chen', 'Dr. Robert Brown'];