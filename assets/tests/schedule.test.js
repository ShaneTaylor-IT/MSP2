const {dayNameToIndex, getTodayName, filterChoresByMember, calculateTotals} = require("../js/scheduleFunctions");

describe("Schedule Logic Tests", () => {

    const sampleChores = [
        { id: 1, assignedTo: "ST", day: "monday", completed: false },
        { id: 2, assignedTo: "JB", day: "monday", completed: true },
        { id: 3, assignedTo: "ST", day: "tuesday", completed: false },
        { id: 4, assignedTo: "BS", day: "sunday", completed: false }
    ];

    test("dayNameToIndex returns correct index", () => {
        expect(dayNameToIndex("monday")).toBe(1);
        expect(dayNameToIndex("friday")).toBe(5);
    });

    test("getTodayName returns correct day name", () => {
        const fakeDate = new Date("2026-08-24"); // Monday
        expect(getTodayName(fakeDate)).toBe("monday");
    });

    test("filterChoresByMember returns all chores when member = all", () => {
        const result = filterChoresByMember(sampleChores, "all");
        expect(result.length).toBe(4);
    });

    test("filterChoresByMember filters correctly by member initials", () => {
        const result = filterChoresByMember(sampleChores, "ST");
        expect(result.length).toBe(2);
        expect(result[0].assignedTo).toBe("ST");
    });

    test("calculateTotals counts planned, completed, pending", () => {
        const totals = calculateTotals(sampleChores, "monday");

        expect(totals.totalPlanned).toBe(4);
        expect(totals.totalCompleted).toBe(1);
        expect(totals.totalPending).toBe(3);
    });

    test("calculateTotals identifies overdue chores correctly", () => {
        const totals = calculateTotals(sampleChores, "tuesday");

        expect(totals.totalOverdue).toBe(2);
    });

});