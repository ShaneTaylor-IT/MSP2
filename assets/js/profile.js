$(document).ready(function () {

    const colorMap = {
        red: "var(--profile-color-red)",
        blue: "var(--profile-color-blue)",
        yellow: "var(--profile-color-yellow)",
        cyan: "var(--profile-color-cyan)",
        green: "var(--profile-color-green)"
    };

    let selectedAvatarColor = null;

    let saved = localStorage.getItem("userProfile");

    if (saved) {
        let profile = JSON.parse(saved);

        $("#firstName").val(profile.firstName);
        $("#lastName").val(profile.lastName);
        $("#displayName").val(profile.displayName);
        $("#householdName").val(profile.householdName);

        selectedAvatarColor = profile.avatarColor;

        // Fallback if initials were missing or corrupted
        let initials = profile.initials || getInitials(profile.firstName, profile.lastName);

        $("#avatarPreview")
            .css("background-color", colorMap[selectedAvatarColor])
            .text(initials);

        updateWelcomeName();
    }

    function getInitials(firstName, lastName) {
        firstName = firstName || "";
        lastName = lastName || "";

        let first = firstName.trim().charAt(0).toUpperCase();
        let last = lastName.trim().charAt(0).toUpperCase();

        if (!first && !last) return "?";
        if (!last) return first;

        return first + last;
    }

    function getWelcomeMessage(displayName) {
        if (!displayName) return "Welcome, user!";
        displayName = displayName.trim();
        return displayName.length === 0
            ? "Welcome, user!"
            : "Welcome, " + displayName + "!";
    }

    function updateAvatarPreview() {
        let first = $("#firstName").val();
        let last = $("#lastName").val();
        let initials = getInitials(first, last);

        $("#avatarPreview").text(initials);
    }

    function updateWelcomeName() {
        let displayName = $("#displayName").val().trim();
        $("#welcomeName").text(getWelcomeMessage(displayName));
    }

    $(".avatar-option").on("click", function () {

        $(".avatar-option").removeClass("selected");
        $(this).addClass("selected");

        selectedAvatarColor = $(this).data("color");

        $("#avatarPreview").css("background-color", colorMap[selectedAvatarColor]);

        updateAvatarPreview();
    });

    $("#firstName, #lastName").on("input", function () {
        updateAvatarPreview();
    });

    $("#displayName").on("input", function () {
        updateWelcomeName();
    });

    $("#cancelBtn").on("click", function () {

        $("#firstName").val("");
        $("#lastName").val("");
        $("#displayName").val("");
        $("#householdName").val("");

        $(".avatar-option").removeClass("selected");
        selectedAvatarColor = null;

        $("#avatarPreview")
            .css("background-color", "var(--primary-color)")
            .text("?");

        $("#welcomeName").text("Welcome, user!");
    });

    // Disabled feature. To be updated in future updates
    $("#createHouseholdBtn").on("click", function () {
        alert("This feature will be available in future update.");
    });

    $("#confirmBtn").on("click", function (e) {
        e.preventDefault();

        let role = $("input[name='role']:checked").val() || "guest";

        let profile = {
            avatarColor: selectedAvatarColor,
            firstName: $("#firstName").val().trim(),
            lastName: $("#lastName").val().trim(),
            displayName: $("#displayName").val().trim(),
            householdName: $("#householdName").val().trim(),
            role: role,
            initials: getInitials($("#firstName").val(), $("#lastName").val())
        };

        localStorage.setItem("userProfile", JSON.stringify(profile));

        $("#avatarPreview").text(profile.initials);
        updateWelcomeName();

        alert("Profile saved!");
    });

});
