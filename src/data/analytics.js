// Lightweight analytics sample data for dashboards
export const monthlyData = [
    { month: 'Jan', appointments: 65, revenue: 12000 },
    { month: 'Feb', appointments: 78, revenue: 15000 },
    { month: 'Mar', appointments: 92, revenue: 17500 },
    { month: 'Apr', appointments: 85, revenue: 16000 },
    { month: 'May', appointments: 110, revenue: 21000 },
    { month: 'Jun', appointments: 130, revenue: 24000 },
    { month: 'Jul', appointments: 140, revenue: 26000 },
    { month: 'Aug', appointments: 125, revenue: 23000 },
    { month: 'Sep', appointments: 150, revenue: 28500 },
    { month: 'Oct', appointments: 170, appointments: 170, revenue: 32000 },
    { month: 'Nov', appointments: 160, revenue: 30000 },
    { month: 'Dec', appointments: 190, revenue: 35000 },
];

export const admissionData = [
    { day: 'Mon', admitted: 12, discharged: 8 },
    { day: 'Tue', admitted: 14, discharged: 10 },
    { day: 'Wed', admitted: 10, discharged: 7 },
    { day: 'Thu', admitted: 16, discharged: 9 },
    { day: 'Fri', admitted: 18, discharged: 11 },
    { day: 'Sat', admitted: 8, discharged: 6 },
    { day: 'Sun', admitted: 6, discharged: 5 },
];

export const departmentData = [
    { name: 'Cardiology', value: 28 },
    { name: 'Pediatrics', value: 22 },
    { name: 'Neurology', value: 18 },
    { name: 'Orthopedics', value: 20 },
    { name: 'Others', value: 12 },
];

export const statusData = [
    { name: 'Completed', value: 45 },
    { name: 'Scheduled', value: 35 },
    { name: 'Cancelled', value: 12 },
    { name: 'No-show', value: 8 },
];

// Small trend series for KPI sparklines
export const statsTrends = {
    'Total Patients': [10, 12, 11, 14, 16, 18, 20, 22, 24, 23, 25, 28],
    'Total Doctors': [4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8],
    'Appointments': [60, 70, 65, 80, 90, 95, 110, 105, 120, 140, 135, 160],
    'Available Beds': [30, 29, 29, 28, 28, 27, 26, 26, 25, 25, 24, 23],
};

export default {
    monthlyData,
    admissionData,
    departmentData,
    statusData,
    statsTrends,
};
