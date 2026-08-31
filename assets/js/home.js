function getWeekRange() {
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

    function format(d) {
        return d.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short"
        });
    }

    const text = format(monday) + " - " + format(sunday);
    return text;
}

function getTodayName() {
    const days = [
        "sunday", "monday", "tuesday",
        "wednesday", "thursday", "friday", "saturday"
    ];
    const index = new Date().getDay();
    return days[index];
}

function dayNameToIndex(dayName) {
    const map = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6
    };
    return map[dayName];
}

function getCompletedToday(chores, todayName) {
    let count = 0;

    chores.forEach(function (chore) {
        if (chore.completed === true && chore.day === todayName) {
            count = count + 1;
        }
    });

    return count;
}

function getWeeklyCompletionPercent(chores) {
    let total = 0;
    let completed = 0;

    chores.forEach(function (chore) {
        total = total + 1;
        if (chore.completed === true) {
            completed = completed + 1;
        }
    });

    let percent;
    if (total === 0) {
        percent = 0;
    } else {
        percent = Math.round((completed / total) * 100);
    }

    return percent;
}

function getOverdueTasks(chores, todayName) {
    let overdue = 0;
    const todayIndex = dayNameToIndex(todayName);

    chores.forEach(function (chore) {
        if (chore.completed === false) {
            const choreIndex = dayNameToIndex(chore.day);
            if (choreIndex < todayIndex) {
                overdue = overdue + 1;
            }
        }
    });

    return overdue;
}

function updateWeeklySummary(chores) {
    const days = [
        "monday", "tuesday", "wednesday",
        "thursday", "friday", "saturday", "sunday"
    ];

    days.forEach(function (day) {
        let total = 0;
        let completed = 0;

        chores.forEach(function (chore) {
            if (chore.day === day) {
                total = total + 1;
                if (chore.completed === true) {
                    completed = completed + 1;
                }
            }
        });

        const element = document.getElementById("home-count-" + day);
        if (element !== null) {
            element.textContent = completed + "/" + total;
        }
    });
}

function loadAdminRewards() {
    let admin = JSON.parse(localStorage.getItem("userProfile"));

    if (admin === null) {
        admin = {
            displayName: "Admin User",
            role: "Administrator",
            avatarColor: "#6c757d",
            initials: "A"
        };
    }

    const rewardAdminName = document.getElementById("rewardAdminName");
    const rewardAdminRole = document.getElementById("rewardAdminRole");
    const rewardPoints = document.getElementById("rewardPoints");
    const availableRewards = document.getElementById("availableRewards");
    const lastRedeemed = document.getElementById("lastRedeemed");

    if (rewardAdminName !== null) {
        rewardAdminName.textContent = admin.displayName;
    }

    if (rewardAdminRole !== null) {
        rewardAdminRole.textContent = admin.role;
    }

    if (rewardPoints !== null) {
        rewardPoints.textContent = 120;
    }

    if (availableRewards !== null) {
        availableRewards.textContent = 3;
    }

    if (lastRedeemed !== null) {
        lastRedeemed.textContent = "None";
    }
}

function loadWeather() {
    const apiKey = "6a6a8b67e821d86b020f0bf50abf4365";

    function fetchWeather(lat, lon) {
        const url = "https://api.openweathermap.org/data/2.5/weather?lat="
            + lat
            + "&lon="
            + lon
            + "&appid="
            + apiKey
            + "&units=metric";

        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                const tempElement = document.getElementById("weatherTemp");
                if (tempElement !== null) {
                    tempElement.textContent = data.main.temp;
                }

                const feelsElement = document.getElementById("weatherFeels");
                if (feelsElement !== null) {
                    feelsElement.textContent = data.main.feels_like;
                }

                const conditionElement = document.getElementById("weatherCondition");
                if (conditionElement !== null) {
                    conditionElement.textContent = data.weather[0].main;
                }

                const idealElement = document.getElementById("weatherIdeal");
                if (idealElement !== null) {

                    let ideal = "No";
                    const condition = data.weather[0].main;
                    const temp = data.main.temp;

                    if (condition === "Clear") {
                        ideal = "Yes";
                    }

                    if (condition === "Clouds") {
                        if (temp >= 5) {
                            ideal = "Yes";
                        }
                    }

                    if (condition === "Rain") {
                        ideal = "No";
                    }

                    if (condition === "Snow") {
                        ideal = "No";
                    }

                    idealElement.textContent = ideal;
                }
            })
            .catch(function (error) {
                console.log("Weather API error:", error);
            });
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeather(lat, lon);
            },
            function () {
                fetchWeather(53.540, -2.111);
            }
        );
    } else {
        fetchWeather(53.540, -2.111);
    }
}

document.addEventListener("DOMContentLoaded", function () {

    const weekText = getWeekRange();
    const weekRangeElement = document.getElementById("homeWeekRange");
    if (weekRangeElement !== null) {
        weekRangeElement.textContent = weekText;
    }

    let chores = JSON.parse(localStorage.getItem("chores"));
    if (!Array.isArray(chores)) {
        chores = [];
    }

    const todayName = getTodayName();

    const completedToday = getCompletedToday(chores, todayName);
    const completedTodayElement = document.getElementById("home-completed-today");
    if (completedTodayElement !== null) {
        completedTodayElement.textContent = "Tasks completed today: " + completedToday;
    }

    const weeklyPercent = getWeeklyCompletionPercent(chores);
    const weeklyPercentElement = document.getElementById("home-weekly-percent");
    if (weeklyPercentElement !== null) {
        weeklyPercentElement.textContent = "Tasks completed this week: " + weeklyPercent + "%";
    }

    const overdueCount = getOverdueTasks(chores, todayName);
    const overdueElement = document.getElementById("home-overdue");
    if (overdueElement !== null) {
        overdueElement.textContent = "Tasks overdue: " + overdueCount;
    }

    updateWeeklySummary(chores);

    loadAdminRewards();
    loadWeather();
});

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        getWeekRange: getWeekRange,
        getTodayName: getTodayName,
        dayNameToIndex: dayNameToIndex,
        getCompletedToday: getCompletedToday,
        getWeeklyCompletionPercent: getWeeklyCompletionPercent,
        getOverdueTasks: getOverdueTasks,
        updateWeeklySummary: updateWeeklySummary
    };
}
