const { addMember, removeMember } = require("../js/membersFunctions");

describe("Members Logic", () => {

    test("addMember adds a new member", () => {
        const members = [];
        const updated = addMember(members, "Sarah", "Household Member", "red");

        expect(updated.length).toBe(1);
        expect(updated[0].displayName).toBe("Sarah");
        expect(updated[0].role).toBe("Household Member");
        expect(updated[0].avatarColor).toBe("red");
        expect(updated[0].initials).toBe("S");
    });

    test("removeMember removes the correct member", () => {
        const members = [
            { id: 1, displayName: "Sarah" },
            { id: 2, displayName: "Ben" }
        ];

        const updated = removeMember(members, 1);

        expect(updated.length).toBe(1);
        expect(updated[0].id).toBe(2);
    });

});