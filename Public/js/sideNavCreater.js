
var usefullLinks = [
    {
        title: "For Authours",
        link: "/usefull-links",
        icon: "ti ti-user-circle"
    },
    {
        title: "For Editors",
        link: "/foreditors",
        icon: "ti ti-user-circle"
    },
    {
        title: "For Reviewers",
        link: "/forreviewers",
        icon: "ti ti-user"
    },
];
var mainMenuLinks = [
    {
        title: "Add Journal",
        link: "/admin",
        icon: "ti ti-list-details"
    },
    {
        title: "Cover Banner",
        link: "/coverbanner",
        icon: "ti ti-cards"
    },
    {
        title: "Aims and Scope",
        link: "/aimsscope",
        icon: "ti ti-activity-heartbeat"
    },
    {
        title: "Editorial &nbsp; Board",
        link: "/editorialboard",
        icon: "ti ti-user-circle"
    },
    {
        title: "Editors &nbsp; Management",
        link: "/editors-management",
        icon: "ti ti-user-circle"
    },
    {
        title: "Instructions &nbsp; For &nbsp; Authors",
        link: "/instructions",
        icon: "ti ti-aperture"
    },
    {
        title: "Processing &nbsp; Charge",
        link: "/proccessing-charge",
        icon: "ti ti-currency-dollar"
    },
]
class GenerateSideNav {
    constructor() {
        // Constructor, if needed
    }
    create(page,activeTxt) {
        let ListItem = ""
        var links = []
        if (page == "usefullLinks") {
            links = usefullLinks
        } else if(page == "mainMenu") {
            links = mainMenuLinks
        }
        links.forEach(element => {
            if (element.title === activeTxt) {
                ListItem += `<li class="sidebar-item">
                            <a class="sidebar-link active protected-link" onclick="navigatetopage('${element.link}')" href="#" aria-expanded="false">
                                <span>
                                    <i class="${element.icon}"></i>
                                </span>
                                <span class="hide-menu">${element.title}</span>
                            </a>
                            </li>`
            } else {
                ListItem += `<li class="sidebar-item">
                            <a class="sidebar-link protected-link" onclick="navigatetopage('${element.link}')" href="#" aria-expanded="false">
                                <span>
                                    <i class="${element.icon}"></i>
                                </span>
                                <span class="hide-menu">${element.title}</span>
                            </a>
                            </li>`
            }

        });
        return ListItem;
    }

}