const { createChoreObject, addChore } = require("../js/add-choreFunctions");

describe("Add Chore Logic", () => {

    test("createChoreObject creates a valid chore", () => {
        const chore = createChoreObject(
            "Hoover rooms",
            "ST",
            "high",
            "weekly",
            "monday",
            "14:00",
            30,
            "Living room"
        );

        expect(chore.title).toBe("Hoover rooms");
        expect(chore.assignedTo).toBe("ST");
        expect(chore.priority).toBe("high");
        expect(chore.recurrence).toBe("weekly");
        expect(chore.day).toBe("monday");
        expect(chore.time).toBe("14:00");
        expect(chore.duration).toBe(30);
        expect(chore.notes).toBe("Living room");
        expect(chore.completed).toBe(false);
        expect(chore.id).toBeDefined();
    });

    test("createChoreObject throws error if required fields missing", () => {
        expect(() => {
            createChoreObject("", "ST", "high", "weekly", "monday", "14:00", 30, "");
        }).toThrow("Missing required fields");
    });

    test("addChore adds a chore to the list", () => {
        const chores = [];
        const chore = createChoreObject(
            "Do laundry",
            "JB",
            "medium",
            "weekly",
            "tuesday",
            "10:00",
            45,
            ""
        );

        const updated = addChore(chores, chore);

        expect(updated.length).toBe(1);
        expect(updated[0].title).toBe("Do laundry");
    });

});