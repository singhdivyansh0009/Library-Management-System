// utils.js
export const calculateEndDate = (startDate, duration) => {
    if (!startDate) return '';

    const start = new Date(startDate);
    let endDate = new Date(start);

    if (duration === '6 Months') {
        endDate.setMonth(start.getMonth() + 6);
    } else if (duration === '1 Year') {
        endDate.setFullYear(start.getFullYear() + 1);
    } else if (duration === '2 Years') {
        endDate.setFullYear(start.getFullYear() + 2);
    }

    // Format date to YYYY-MM-DD
    return endDate.toISOString().split('T')[0];
};

export const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
}
