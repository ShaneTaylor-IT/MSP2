function addMember(members, name, role, color) {
    const initials = name.charAt(0).toUpperCase();

    const newMember = {
        id: Date.now(),
        displayName: name,
        role: role,
        avatarColor: color,
        initials: initials
    };

    return [...members, newMember];
}

function removeMember(members, id) {
    return members.filter(member => member.id !== id);
}

module.exports = {
    addMember,
    removeMember
};