function getInitials(firstName, lastName) {
    let first = firstName.trim().charAt(0).toUpperCase();
    let last = lastName.trim().charAt(0).toUpperCase();

    if (!first && !last) return "?";
    if (!last) return first;

    return first + last;
}

function getWelcomeMessage(displayName) {
    displayName = displayName.trim();

    if (displayName.length === 0) {
        return "Welcome, user!";
    } else {
        return "Welcome, " + displayName + "!";
    }
}

function getDefaultAvatarColor() {
    return "var(--primary-color)";
}

function isProfileEmpty(profile) {
    return !profile.firstName &&
           !profile.lastName &&
           !profile.displayName &&
           !profile.householdName;
}

module.exports = {
    getInitials,
    getWelcomeMessage,
    getDefaultAvatarColor,
    isProfileEmpty
};