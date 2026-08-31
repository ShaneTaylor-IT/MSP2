const fs = require("fs");
const path = require("path");

// Load home.html into JSDOM
const html = fs.readFileSync(path.resolve(__dirname, "../../home.html"), "utf8");
document.documentElement.innerHTML = html;

const homeScript = require("../js/home.js");

describe("Home Page Tests", function () {

    beforeEach(function () {
        localStorage.clear();
    });

    test("getWeekRange returns a valid string", function () {
        const result = homeScript.getWeekRange();
        const isString = typeof result === "string";

        expect(isString).toBe(true);
        expect(result.length).toBeGreaterThan(5);
    });

    test("getCompletedToday counts completed chores for today", function () {
        const todayName = "wednesday";

        const chores = [
            { day: todayName, completed: true },
            { day: todayName, completed: false },
            { day: "monday", completed: true }
        ];

        const result = homeScript.getCompletedToday(chores, todayName);
        expect(result).toBe(1);
    });

    test("getWeeklyCompletionPercent calculates correct percentage", function () {
        const chores = [
            { completed: true },
            { completed: false },
            { completed: true }
        ];

        const result = homeScript.getWeeklyCompletionPercent(chores);
        expect(result).toBe(67);
    });

    test("getOverdueTasks counts overdue chores", function () {
        const todayName = "thursday"; // fixed day for stable testing

        const chores = [
            { day: todayName, completed: false }, // not overdue
            { day: "monday", completed: false },  // overdue
            { day: "sunday", completed: false }   // overdue
        ];

        const result = homeScript.getOverdueTasks(chores, todayName);
        expect(result).toBe(2);
    });

    test("Weekly summary counts chores per day", function () {
        const chores = [
            { day: "monday", completed: true },
            { day: "monday", completed: false },
            { day: "tuesday", completed: true }
        ];

        const mondayElement = document.getElementById("home-count-monday");
        const tuesdayElement = document.getElementById("home-count-tuesday");

        homeScript.updateWeeklySummary(chores);

        expect(mondayElement.textContent).toBe("1/2");
        expect(tuesdayElement.textContent).toBe("1/1");
    });

});
