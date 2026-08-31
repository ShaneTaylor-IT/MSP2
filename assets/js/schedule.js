$(document).ready(function () {

    function loadMemberFilter() {
        const admin = JSON.parse(localStorage.getItem("userProfile"));
        const members = JSON.parse(localStorage.getItem("members")) || [];

        $("#filterMember").find("option:not([value=''])").remove();

        if (admin) {
            $("#filterMember").append(
                `<option value="${admin.initials}">${admin.displayName}</option>`
            );
        }

        members.forEach(m => {
            $("#filterMember").append(
                `<option value="${m.initials}">${m.displayName}</option>`
            );
        });
    }

    loadMemberFilter();

    function initWeekRange() {
        const today = new Date();
        const day = today.getDay();

        let diffToMonday;
        if (day === 0) {
            diffToMonday = -6;
        } else {
            diffToMonday = 1 - day;
        }

        const monday = new Date(today);
        monday.setDate(today.getDate() + diffToMonday);

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        const format = function (d) {
            return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
        };

        $("#weekRange").text(format(monday) + " - " + format(sunday));
    }

    initWeekRange();

    let currentFilter = "all";

    $("#filterMember").on("change", function () {
        currentFilter = $(this).val() || "all";
        renderSchedule();
    });

    // Heavy help from AI on this script in order to add chore from add-chore.html and display within schedule.html after spending several hours attempting to build myself with the use of https://api.jquery.com/ AI helped me break down the script into smaller code blocks in order to understand what is happening here.
    function renderSchedule() {
        const chores = JSON.parse(localStorage.getItem("chores")) || [];

        const filtered = chores.filter(chore =>
            currentFilter === "all" ? true : chore.assignedTo === currentFilter
        );

        const days = [
            "monday", "tuesday", "wednesday",
            "thursday", "friday", "saturday", "sunday"
        ];

        days.forEach(day => {
            $(`#day-${day}`).empty();
        });

        const dayCounts = {};
        days.forEach(day => {
            dayCounts[day] = { total: 0, completed: 0 };
        });

        filtered.forEach(chore => {
            const day = chore.day;
            if (!dayCounts[day]) return;

            dayCounts[day].total++;
            if (chore.completed) dayCounts[day].completed++;

            let cardClass = "";

            if (currentFilter === "all") {
                cardClass = "chore-card small";
            } else {
                cardClass = "chore-card";
            }

            if (chore.completed === true) {
                cardClass += " chore-completed";
            }

            $(`#day-${day}`).append(`
                <div class="${cardClass} row" data-id="${chore.id}">
                    <h5>${chore.title}</h5>
                    <p><strong>Assigned:</strong> ${chore.assignedTo}</p>
                    <p><strong>Time:</strong> ${chore.time}</p>
                    <p><strong>Duration:</strong> ${chore.duration} minutes</p>
                    <p><strong>Priority:</strong> ${chore.priority}</p>
                    <p><strong>Notes:</strong> ${chore.notes || "None"}</p>
                    <button class="btn btn-sm btn-success mark-complete-btn">
                        ${chore.completed ? "Completed" : "Mark complete"}
                    </button>

                    <button class="btn btn-sm btn-danger remove-chore-btn">
                        Remove
                    </button>
                </div>
            `);
        });

        days.forEach(day => {
            const c = dayCounts[day];
            $(`#count-${day}`).text(`${c.completed}/${c.total}`);
        });

        updateTotals(chores);
    }

    $(document).on("click", ".mark-complete-btn", function () {
        const card = $(this).closest(".chore-card");
        const id = Number(card.data("id"));

        let chores = JSON.parse(localStorage.getItem("chores")) || [];

        chores = chores.map(chore => {
            if (chore.id === id) {
                return { ...chore, completed: !chore.completed };
            }
            return chore;
        });

        localStorage.setItem("chores", JSON.stringify(chores));
        renderSchedule();
    });

    $(document).on("click", ".remove-chore-btn", function () {
        const card = $(this).closest(".chore-card");
        const id = Number(card.data("id"));

        let chores = JSON.parse(localStorage.getItem("chores")) || [];
        chores = chores.filter(chore => chore.id !== id);

        localStorage.setItem("chores", JSON.stringify(chores));
        renderSchedule();
    });

    function getTodayName() {
        const days = [
            "sunday", "monday", "tuesday",
            "wednesday", "thursday", "friday", "saturday"
        ];

        const todayIndex = new Date().getDay();
        return days[todayIndex];
    }

    function dayNameToIndex(dayName) {
        const map = {
            "sunday": 0,
            "monday": 1,
            "tuesday": 2,
            "wednesday": 3,
            "thursday": 4,
            "friday": 5,
            "saturday": 6
        };
        return map[dayName];
    }

    function updateTotals(chores) {
        const totalPlanned = chores.length;

        let totalCompleted = 0;
        let totalPending = 0;
        let totalOverdue = 0;

        const todayName = getTodayName();

        chores.forEach(chore => {
            if (chore.completed) {
                totalCompleted++;
            } else {
                totalPending++;

                const choreDayIndex = dayNameToIndex(chore.day);
                const todayIndex = dayNameToIndex(todayName);

                if (choreDayIndex < todayIndex) {
                    totalOverdue++;
                }
            }
        });

        $("#summaryTotal").text(totalPlanned);
        $("#summaryCompleted").text(totalCompleted);
        $("#summaryPending").text(totalPending);
        $("#summaryOverdue").text(totalOverdue);
    }

    renderSchedule();

});