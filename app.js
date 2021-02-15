const app = {
    start : function() {

        app.myWork = app.creativeNavBar("myWork");
        app.myHobbies = app.createNavBar("myHobbies");
        app.myFamily = app.createNavBar("myFamily");
        app.contactMe = app.createNavBar("contactMe");

        document.onmousemove = app.mouseMoveHandler;
        window.onresize = app.resizeHandler;
        app.resizeHandler();
    },

    createNavBar : function(inWhich) {
        let whichLink = inWhich;
        if (inWhich === app.currentPage) {
            inWhich = "index";
        }

        const navBarOuter = document.createElement("a");
        navBarOuter.setAttribute("href", `${inWhich}.html`);
    
        const navBarInner = document.createElement("div");
        navBarInner.setAttribute("id", inWhich);
        navBarInner.setAttribute("class", `navBar ${whichLink}`);

        const navBarText = 
            { contactMe : "Get In Touch With Me",
            myHobbies : "My Hobbies",
            myFamily : "My Family Life",
            index : "Home Page"
            };
        
        navBarInner.innerHTML = navBarText[inWhich];
        navBarOuter.appendChild(navBarInner);
        document.body.appendChild(navBarOuter);

        return document.getElementById(inWhich);
    },

    resizeHandler : function() {
        app.myWork.style.top = "-40px";
        app.myHobbies.style.left = `${window.innerWidth}px`;
        app.myFamily.style.left = "-40px";
        app.contactMe.style.top = `${window.innerHeight}4px`;
    },

    mouseMoveHandler : function(inEvent) {
        if (!app.firstMouseEventDone) {
            if (inEvent.x > 80 &&
                inEvent.x < (window.innerWidth - 80) &&
                inEvent.y > 80 && inEvent.y < (window.innerHeight - 80)
            )   {
                    app.firstMouseEventDone = true;
                } else {
                    return;
                }
        }
        if (inEvent.y < 80) {
            if (app.slideWhich !== "myWork") {
                app.slideIn("myWork");
            }
        } else if (inEvent.x > (window.innerWidth - 80)) {
            if (app.slideWhich !== "myHobbies")
            {
                app.slideIn("myHobbies");
            }
        } else if (inEvent.x < 80) {
            if (app.slideWhich !== "myFamily")
            {
                app.slideIn("myFamily");
            }
        } else if (inEvent.y > (window.innerHeight - 80)) {
            if (app.slideWhich !== "contactMe")
            {
                app.slideIn("contactMe");
            }
        } else {
            if (!app.slideInterval) {
                clearInterval (app.slideInterval);
                app.slideinterval = null;
            }
            app.slideWhich = null;
            app.resizeHandler();
        }
    },

    slideIn : function(inWhich) {

        if (app.slideInterval) {
            clearInterval(app.slideInterval);
            app.slideInterval = null;
        }

        app.resizeHandler();

        app.slideWhich = inWhich;
        app.slideVal = 0;
        app.slideTicks = 0;

        switch (app.slideWhich) {
            case "myWork": app.slideVal = -40;
            break;
            case "myHobbies": app.slideVal = window.innerWidth; 
            break;
            case "myFamily": app.slideVal = -40;
            break;
            case "contactMe": app.slideVal = window.innerHeight;
            break;
        }

        app.slideInterval = setInterval(function() {
            switch (app.slideWhich) {
                case "myWork": app.myWork.style.top = `${app.slideVal}px`;
                app.slideVal++;
                break;
                case "myHobbies": app.myHobbies.style.left = `${app.slideVal}px`;
                app.slideVal--;
                break;
                case "myFamily": app.myFamily.style.left = `${app.slideVal}px`;
                app.slideVal++;
                break;
                case "contactMe": app.contactMe.style.top = `${app.slideVal}px`;
                app.slideVal--;
                break;
            }
            app.slideTicks++;
            if (app.slideTicks === 40) {
                clearInterval (app.slideInterval);
            } 
        }, 5);
    },


};