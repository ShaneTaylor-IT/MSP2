$(document).ready(function () {

    const choreTemplates = {
        hoover: {
            title: "Hoover rooms",
            priority: "medium",
            recurrence: "weekly",
            duration: 45,
        },
        laundry: {
            title: "Do laundry",
            priority: "medium",
            recurrence: "daily",
            duration: 30,
        },
        grass: {
            title: "Cut the grass",
            priority: "high",
            recurrence: "fortnightly",
            duration: 60,
        },
        bathroom: {
            title: "Clean the bathroom",
            priority: "low",
            recurrence: "daily",
            duration: 15,
        },
        shopping: {
            title: "Weekly shopping",
            priority: "medium",
            recurrence: "weekly",
            duration: 60,
        },
        mop: {
            title: "Mop floors",
            priority: "medium",
            recurrence: "weekly",
            duration: 30,
        },
        rubbish: {
            title: "Take rubbish out",
            priority: "medium",
            recurrence: "daily",
            duration: 15,
        },
    };

    $(".template-btn").on("click", function () {
        const key = $(this).data("template");
        const t = choreTemplates[key];

        $("#choreTitle").val(t.title);
        $(`input[name="priority"][value="${t.priority}"]`).prop("checked", true);
        $(`input[name="recurrence"][value="${t.recurrence}"]`).prop("checked", true);
        $("#choreDuration").val(t.duration);

        updatePreview();
    });

    function loadAssignToProfiles() {
        const admin = JSON.parse(localStorage.getItem("userProfile"));
        const members = JSON.parse(localStorage.getItem("members")) || [];

        $("#assignTo").empty();

        if (admin) {
            $("#assignTo").append(`
            <button type="button" class="member-select rounded-circle" data-member="${admin.initials}">
                ${admin.initials}
            </button>
        `);
        }

        members.forEach(m => {
            $("#assignTo").append(`
            <button type="button" class="member-select rounded-circle" data-member="${m.initials}">
                ${m.initials}
            </button>
        `);
        });

        $(document).on("click", ".member-select", function () {
            $(".member-select").removeClass("selected");
            $(this).addClass("selected");
            updatePreview();
        });
    }

    loadAssignToProfiles();

    function updatePreview() {
        const title = $("#choreTitle").val().trim();
        const assignedTo = $(".member-select.selected").data("member") || "Not selected";
        const priority = $("input[name='priority']:checked").val() || "Not selected";
        const recurrence = $("input[name='recurrence']:checked").val() || "Not selected";
        const day = $(".day-select.selected").data("day") || "Not selected";
        const time = $("#choreTime").val() || "Not selected";
        const duration = $("#choreDuration").val() || "Not selected";
        const notes = $("#choreNotes").val().trim() || "None";

        $("#chorePreview").html(`
        <h4>${title || "Chore Preview"}</h4>
        <p><strong>Assigned to:</strong> ${assignedTo}</p>
        <p><strong>Priority:</strong> ${priority}</p>
        <p><strong>Recurrence:</strong> ${recurrence}</p>
        <p><strong>Day:</strong> ${day}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Duration:</strong> ${duration} minutes</p>
        <p><strong>Notes:</strong> ${notes}</p>
    `);
    }

    $("#choreTitle, #choreTime, #choreDuration, #choreNotes").on("input", updatePreview);
    $("input[name='priority'], input[name='recurrence']").on("change", updatePreview);

    $(".day-select").on("click", function () {
        $(".day-select").removeClass("selected");
        $(this).addClass("selected");
        updatePreview();
    });

    $("#confirmChoreBtn").on("click", function (e) {
        e.preventDefault();

        const title = $("#choreTitle").val().trim();
        const assignedTo = $(".member-select.selected").data("member");
        const priority = $("input[name='priority']:checked").val();
        const recurrence = $("input[name='recurrence']:checked").val();
        const day = $(".day-select.selected").data("day");
        const time = $("#choreTime").val();
        const duration = $("#choreDuration").val();
        const notes = $("#choreNotes").val().trim();

        if (!title || !assignedTo || !priority || !recurrence || !day || !time) {
            alert("Please complete all required fields.");
            return;
        }

        const chores = JSON.parse(localStorage.getItem("chores")) || [];

        const newChore = {
            id: Date.now(),
            title,
            assignedTo,
            priority,
            recurrence,
            day,
            time,
            duration,
            notes,
            completed: false
        };

        chores.push(newChore);
        localStorage.setItem("chores", JSON.stringify(chores));

        $("#addChoreForm")[0].reset();
        $(".member-select").removeClass("selected");
        $(".day-select").removeClass("selected");

        $("#chorePreview").html(`
        <h4>Chore Preview</h4>
        <p>Your chore details will appear here once completed.</p>
    `);

        alert("Chore added!");
    });

    $("#cancelChoreBtn").on("click", function () {
        $("#addChoreForm")[0].reset();
        $(".member-select").removeClass("selected");
        $(".day-select").removeClass("selected");

        $("#chorePreview").html(`
        <h4>Chore Preview</h4>
        <p>Your chore details will appear here once completed.</p>
    `);
    });

});