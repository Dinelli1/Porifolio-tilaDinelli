const icons = document.querySelectorAll(
    ".desktop-icon[data-window]"
);

const windows = document.querySelectorAll(
    ".window"
);

const taskButtons =
    document.getElementById("taskButtons");

let zIndex = 20;

function openWindow(windowName) {

    const windowElement =
        document.getElementById(
            `window-${windowName}`
        );

    if (!windowElement) {
        return;
    }

    windowElement.classList.add("active");

    bringToFront(windowElement);

    createTaskButton(
        windowName,
        windowElement
    );

    positionWindow(windowElement);
}

function bringToFront(windowElement) {

    zIndex++;

    windowElement.style.zIndex = zIndex;

    updateTaskButtons();
}

function positionWindow(windowElement) {

    if (
        windowElement.dataset.positioned === "true"
    ) {
        return;
    }

    const opened =
        document.querySelectorAll(
            ".window.active"
        ).length;

    const offset =
        opened * 25;

    const width =
        windowElement.offsetWidth;

    const maxLeft =
        window.innerWidth -
        width -
        20;

    windowElement.style.left =
        Math.max(
            100,
            Math.min(
                250 + offset,
                maxLeft
            )
        ) + "px";

    windowElement.style.top =
        Math.max(
            50,
            80 + offset
        ) + "px";

    windowElement.dataset.positioned =
        "true";
}

function closeWindow(windowElement) {

    windowElement.classList.remove(
        "active"
    );

    windowElement.classList.remove(
        "maximized"
    );

    windowElement.dataset.positioned =
        "false";

    windowElement.style.left = "";
    windowElement.style.top = "";

    removeTaskButton(
        windowElement.id
    );

    updateTaskButtons();
}

windows.forEach(windowElement => {

    const close =
        windowElement.querySelector(
            ".close"
        );

    const minimize =
        windowElement.querySelector(
            ".minimize"
        );

    const maximize =
        windowElement.querySelector(
            ".maximize"
        );

    close.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            closeWindow(
                windowElement
            );

        }
    );



    minimize.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            windowElement.classList.remove(
                "active"
            );

            updateTaskButtons();

        }
    );

    maximize.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            windowElement.classList.toggle(
                "maximized"
            );

            bringToFront(
                windowElement
            );

        }
    );

    windowElement.addEventListener(
        "mousedown",
        () => {

            bringToFront(
                windowElement
            );

        }
    );

});


icons.forEach(icon => {

    icon.addEventListener(
        "dblclick",
        () => {

            const windowName =
                icon.dataset.window;

            openWindow(
                windowName
            );

        }
    );

});

function createTaskButton(
    windowName,
    windowElement
) {

    const existing =
        document.querySelector(
            `.task-button[data-window="${windowName}"]`
        );

    if (existing) {
        return;
    }


    const button =
        document.createElement(
            "button"
        );


    button.className =
        "task-button";


    button.dataset.window =
        windowName;


    button.textContent =
        windowElement
            .querySelector(
                ".window-header span"
            )
            .textContent;


    button.addEventListener(
        "click",
        () => {

            if (
                windowElement.classList.contains(
                    "active"
                )
            ) {

                windowElement.classList.remove(
                    "active"
                );

            } else {

                windowElement.classList.add(
                    "active"
                );

                bringToFront(
                    windowElement
                );

            }

            updateTaskButtons();

        }
    );


    taskButtons.appendChild(
        button
    );
}


function removeTaskButton(
    windowId
) {

    const windowName =
        windowId.replace(
            "window-",
            ""
        );


    const button =
        document.querySelector(
            `.task-button[data-window="${windowName}"]`
        );


    if (button) {
        button.remove();
    }
}


function updateTaskButtons() {

    document
        .querySelectorAll(
            ".task-button"
        )
        .forEach(button => {

            const windowName =
                button.dataset.window;


            const windowElement =
                document.getElementById(
                    `window-${windowName}`
                );


            if (
                windowElement &&
                windowElement.classList.contains(
                    "active"
                )
            ) {

                button.classList.add(
                    "active"
                );

            } else {

                button.classList.remove(
                    "active"
                );

            }

        });
}


const startButton =
    document.getElementById(
        "startButton"
    );

const startMenu =
    document.getElementById(
        "startMenu"
    );


startButton.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        startMenu.classList.toggle(
            "active"
        );

    }
);


document.addEventListener(
    "click",
    () => {

        startMenu.classList.remove(
            "active"
        );

    }
);


startMenu.addEventListener(
    "click",
    event => {

        event.stopPropagation();

    }
);


document
    .querySelectorAll(
        ".start-options div"
    )
    .forEach(item => {

        item.addEventListener(
            "click",
            () => {

                openWindow(
                    item.dataset.window
                );

                startMenu.classList.remove(
                    "active"
                );

            }
        );

    });


const popup =
    document.querySelector(
        ".welcome-popup"
    );

const popupClose =
    document.querySelector(
        ".popup-close"
    );


popupClose.addEventListener(
    "click",
    () => {

        popup.style.display =
            "none";

    }
);


function updateClock() {

    const clock =
        document.getElementById(
            "clock"
        );


    const now =
        new Date();


    let hours =
        now.getHours();


    const minutes =
        String(
            now.getMinutes()
        ).padStart(
            2,
            "0"
        );


    const period =
        hours >= 12
            ? "PM"
            : "AM";


    hours =
        hours % 12 || 12;


    clock.textContent =
        `${hours}:${minutes} ${period}`;
}


updateClock();


setInterval(
    updateClock,
);
1000