function createChoreObject(title, assignedTo, priority, recurrence, day, time, duration, notes) {
    if (!title || !assignedTo || !priority || !recurrence || !day || !time) {
        throw new Error("Missing required fields");
    }

    return {
        id: Date.now(),
        title,
        assignedTo,
        priority,
        recurrence,
        day,
        time,
        duration: Number(duration),
        notes: notes || "",
        completed: false
    };
}

function addChore(chores, choreObj) {
    return [...chores, choreObj];
}

module.exports = {
    createChoreObject, addChore
};