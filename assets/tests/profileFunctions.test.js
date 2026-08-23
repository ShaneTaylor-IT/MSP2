const { getInitials, getWelcomeMessage, isProfileEmpty, getDefaultAvatarColor } = require("../js/profileFunctions");

describe("getInitials", () => {

    test("returns two initials for first and last name", () => {
        expect(getInitials("John", "Doe")).toBe("JD");
    });

    test("returns one initial if last name missing", () => {
        expect(getInitials("Sarah", "")).toBe("S");
    });

    test("returns ? if both names missing", () => {
        expect(getInitials("", "")).toBe("?");
    });

    test("trims spaces before generating initials", () => {
        expect(getInitials("  Ben  ", "  Smith ")).toBe("BS");
    });

});

describe("getWelcomeMessage", () => {

    test("returns default welcome message when empty", () => {
        expect(getWelcomeMessage("")).toBe("Welcome, user!");
    });

    test("returns personalised welcome message", () => {
        expect(getWelcomeMessage("Shane")).toBe("Welcome, Shane!");
    });

    test("trims spaces before generating message", () => {
        expect(getWelcomeMessage("  Johnny  ")).toBe("Welcome, Johnny!");
    });

});

describe("getDefaultAvatarColor", () => {

    test("returns the correct default color", () => {
        expect(getDefaultAvatarColor()).toBe("var(--primary-color)");
    });

});

describe("isProfileEmpty", () => {

    test("returns true for empty profile", () => {
        const profile = {
            firstName: "",
            lastName: "",
            displayName: "",
            householdName: ""
        };
        expect(isProfileEmpty(profile)).toBe(true);
    });

    test("returns false when any field is filled", () => {
        const profile = {
            firstName: "John",
            lastName: "",
            displayName: "",
            householdName: ""
        };
        expect(isProfileEmpty(profile)).toBe(false);
    });

});

