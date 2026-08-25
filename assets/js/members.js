$(document).ready(function () {

    const colorMap = {
        red: "var(--profile-color-red)",
        blue: "var(--profile-color-blue)",
        yellow: "var(--profile-color-yellow)",
        cyan: "var(--profile-color-cyan)",
        green: "var(--profile-color-green)"
    };

    function loadAdminProfile() {
        const admin = JSON.parse(localStorage.getItem("userProfile"));
        if (!admin) return;

        $("#adminAvatar")
            .css("background-color", colorMap[admin.avatarColor])
            .text(admin.initials);

        $("#adminName").text(admin.displayName);
        $("#adminRole").text(admin.role);
    }

    loadAdminProfile();

    let members =
        JSON.parse(localStorage.getItem("members")) || placeholderMembers;

    function renderMembers() {
        $("#membersContainer").empty();

        members.forEach((member) => {
            const card = `
                <div class="col-md-4 mb-3 member-card">
                    <div class="card p-3 app-card text-center">
                        <div class="rounded-circle mx-auto mb-3 app-avatar member-avatar"
                             style="background-color: ${colorMap[member.avatarColor]};">
                             ${member.initials}
                        </div>
                        <h5 class="my-1">${member.displayName}</h5>
                        <p class="profileRole">${member.role}</p>
                        <p class="mb-0">Chores completed for the day: 0</p>
                        <p class="mb-2">Day streak: 0</p>

                        <button class="btn btn-warning btn-sm edit-member-btn data-id="${member.id}>
                            Edit Member 

                        <button class="btn btn-danger btn-sm remove-member-btn" data-id="${member.id}">
                             Remove Member
                        </button>
                    </div>
                </div>
            `;
            $("#membersContainer").append(card);
        });
    }

    renderMembers();

    $("#addMemberBtn").on("click", function () {
        const modal = new bootstrap.Modal(
            document.getElementById("addMemberModal"),
        );
        modal.show();
    });

    let selectedColor = "blue";

    $("#memberColorOptions .avatar-option").on("click", function () {
        selectedColor = $(this).data("color");

        $("#memberColorOptions .avatar-option").removeClass("selected");
        $(this).addClass("selected");
    });

    $("#saveMemberBtn").on("click", function () {
        const name = $("#newMemberName").val().trim();
        const role = $("#newMemberRole").val();
        const color = selectedColor;

        if (!name) {
            alert("Please enter a name.");
            return;
        }

        const initials = name.charAt(0).toUpperCase();

        const newMember = {
            id: Date.now(),
            displayName: name,
            role: role,
            avatarColor: color,
            initials: initials,
        };

        members.push(newMember);
        localStorage.setItem("members", JSON.stringify(members));

        renderMembers();

        const modal = bootstrap.Modal.getInstance(
            document.getElementById("addMemberModal"),
        );
        modal.hide();

        $("#newMemberName").val("");
    });

    $(document).on("click", ".remove-member-btn", function () {
        const memberId = $(this).data("id");

        members = members.filter(member => member.id !== memberId);

        localStorage.setItem("members", JSON.stringify(members));

        renderMembers();
    });

    $("#householdComments").val(localStorage.getItem("householdComments") || "");
    $("#householdSuggestions").val(localStorage.getItem("householdSuggestions") || "");
    $("#householdComments").on("input", function () {
        localStorage.setItem("householdComments", $(this).val());
    });
    $("#householdSuggestions").on("input", function () {
        localStorage.setItem("householdSuggestions", $(this).val());
    });
});


