function dayNameToIndex(dayName) {
    const map = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6
    };
    return map[dayName];
}

function getTodayName(dateObj = new Date()) {
    const days = [
        "sunday", "monday", "tuesday",
        "wednesday", "thursday", "friday", "saturday"
    ];
    return days[dateObj.getDay()];
}

function filterChoresByMember(chores, member) {
    if (member === "all") return chores;
    return chores.filter(chore => chore.assignedTo === member);
}

function calculateTotals(chores, todayName) {
    let totalPlanned = chores.length;
    let totalCompleted = 0;
    let totalPending = 0;
    let totalOverdue = 0;

    const todayIndex = dayNameToIndex(todayName);

    chores.forEach(chore => {
        if (chore.completed) {
            totalCompleted++;
        } else {
            totalPending++;

            const choreDayIndex = dayNameToIndex(chore.day);

            if (choreDayIndex < todayIndex) {
                totalOverdue++;
            }
        }
    });

    return {
        totalPlanned,
        totalCompleted,
        totalPending,
        totalOverdue
    };
}

module.exports = {
    dayNameToIndex,
    getTodayName,
    filterChoresByMember,
    calculateTotals
};