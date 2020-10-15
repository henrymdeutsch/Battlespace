
function toggle() {
    $('#sidebar, #content').toggleClass('active');
};

//var htmlAndBody = document.getElementsByClassName("disableScrollingMaybe");

// for testing purposes; make sure to replace its innerHTML in the flexNav function.
//var replace = document.getElementById("replace");
var currentlyToggled = false;

function changeBodyTextOnToggle() {
    // switch the variable currentlyToggled
    currentlyToggled = !currentlyToggled;
    //replace.innerHTML = currentlyToggled;

}

/* adjust spacer height and toggle icon visibility with screen width */
var sp1 = document.getElementById("spacer1");
var sp2 = document.getElementById("spacer2");
var tog = document.getElementById("toggle");
var mainNav = document.getElementById("mainNav");
var proBooks = document.getElementById("proBooks");
var container = document.getElementById("container");
var menuAndLogo = document.getElementById("menuAndLogo");
var chapters  = document.getElementsByClassName("toggleOnMobile");
var chaptersQuestions = document.getElementById("chaptersQuestions");
var toggleHasBeenAdded = false;



/*on page load, make other tabs dissapear */
var tabcontent = document.getElementsByClassName("tabcontent");
for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
}

var chap = document.getElementById('chapter1');
chap.style.display = "block";

/* if user is on a mobile phone, make the font smaller & timer farther away */
var bigText = document.getElementsByClassName("style1-big");
var smallText = document.getElementsByClassName("style1-small");
var timerContainer = document.getElementById("timerContainer");

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

    timerContainer.style.padding = "5px 0 0 0";


    for (var x = 0; x < bigText.length; x++) {
        //bigText[x].style.className = "style1-big";
        bigText[x].style.fontWeight = "400";
        bigText[x].style.fontWeight = "40px";
        bigText[x].style.lineHeight = "50px";

        if (bigText[x].classList.contains("relative")) {
            bigText[x].style.position = "relative";
            bigText[x].style.bottom = "20px";

        }
    }
    for (var z = 0; z < smallText.length; z++) {
        //smallText[z].className = "style2-small";
        bigText[x].style.fontWeight = "600";
        bigText[x].style.fontWeight = "25px";
    }
}
else {
    timerContainer.style.padding = "5px 20% 0 0";
}

function flexNav() {
    // for testing purposes
    //replace.innerHTML = currentlyToggled;

    // make horizontal nav that toggles between chapters and questions responsive
    var widthOfChaptersQuestions = chaptersQuestions.clientWidth;

    if (widthOfChaptersQuestions > 455) {
        chaptersQuestions.style.paddingLeft = "60px";
        chaptersQuestions.style.textAlign = "left";
    }
    else if (widthOfChaptersQuestions > 270) {
        chaptersQuestions.style.paddingLeft = "0px";
        chaptersQuestions.style.textAlign = "center";
        chaptersQuestions.style.margin = "15px 50px 55px 50px";
    }

    if (window.innerWidth < 500) {
        chaptersQuestions.style.paddingLeft = "0px";
        chaptersQuestions.style.textAlign = "center";
        chaptersQuestions.style.margin = "15px 0px 55px 0px";
        chaptersQuestions.style.minWidth = "270px";

        var spacer = document.getElementById("spacer");
        if (window.innerWidth < 420) {
            spacer.style.display = "inline-block";
        }
        else {
            spacer.style.display = "none";
        }
    }
    // make it disappear so there is no momentary weirdness in the fraction of a second before the javascript runs

    chaptersQuestions.style.visibility = "visible";

    /* makes the main header and vertical nav responsive */
    if (window.innerWidth >= 1200) {
        container.style.top = "5px";
        sp1.style.height = "50px";
        sp2.style.height = "50px";
        tog.style.visibility = "hidden";
    }
    else if (window.innerWidth >= 992) {
        container.style.top = "5px";
        sp1.style.height = "40px";
        sp2.style.height = "40px";
        tog.style.visibility = "hidden";
    }
    else if (window.innerWidth >= 769) {
        container.style.top = "0px";
        sp1.style.height = "40px";
        sp2.style.height = "40px";
        tog.style.visibility = "hidden";
        if (toggleHasBeenAdded) {
            for (var i = 0; i < chapters.length; i++) {
                chapters[i].removeEventListener('click', toggle);
            }
        }
    }
    else if (window.innerWidth >= 295) {
        container.style.top = "0px";
        sp1.style.height = "40px";
        sp2.style.height = "40px";
        tog.style.visibility = "visible";

        toggleHasBeenAdded = true;
        for (var i = 0; i < chapters.length; i++) {
            //chapters[i].setAttribute("onclick", "toggle()");
            chapters[i].addEventListener('click', toggle);
        }

        if (!(proBooks.hasAttribute("class"))) {
            proBooks.setAttribute("src", "../Home/images/proBooks.png");
            proBooks.setAttribute("class", "min");
            proBooks.setAttribute("id", "proBooks");
            proBooks.setAttribute("height", "20%");
            proBooks.style.position = "static";
            proBooks.style.left = "0px";
            proBooks.style.top = "0px";
            proBooks.style.width = "150px";
            menuAndLogo.style.width = "187px";
            menuAndLogo.style.position = "static";
            menuAndLogo.style.bottom = "0px";
        }
    }
    else {
        container.style.bottom = "5px";
        sp1.style.height = "40px";
        sp2.style.height = "40px";
        tog.style.visibility = "visible";
        proBooks.setAttribute("src", "images/proBooksMini.png");
        proBooks.removeAttribute("class");
        proBooks.removeAttribute("id");
        proBooks.removeAttribute("height");
        proBooks.style.width = "100px";
        proBooks.style.position = "relative";
        proBooks.style.left = "10px";
        proBooks.style.top = "10px";
        menuAndLogo.style.width = "145px";
        menuAndLogo.style.position = "relative";
        menuAndLogo.style.bottom = "5px";
        tog.style.position = "relative";
        tog.style.bottom = "50px";
    }
}
window.onresize = flexNav;

/* make sure right chapter is shown */
function openChapter(listNum, chapter) {

    // Get all elements with class="tabcontent" and hide them, then show the right one.
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    var chap = document.getElementById(chapter);
    chap.style.display = "block";

    // Get all elements with class="tablinks" and remove the class "active", then add it on the right one.
    var tablinks = document.getElementsByClassName("list-item-li");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    var listItem = document.getElementById(listNum);
    listItem.className += " active";

    // Show the current tab, and add an "active" class to the link that opened the tab
    //document.getElementById(chapter).style.display = "block";
    //
}

// to style the buttons in the form, in QUESTIONS tab.
function styleButton(buttonId) {
    var butn = document.getElementById(buttonId);
    var allButns = document.getElementsByClassName("option");
    for (var i = 0; i < allButns.length; i++) {
        allButns[i].children[0].children[0].classList = "fas fa-circle fa-inverse";
        allButns[i].style.backgroundColor = "#f1f1f1";
    }
    butn.style.backgroundColor = "#ccc";
    butn.children[0].children[0].classList = "fas fa-dot-circle fa-inverse";
}



/* nav is 73px tall when screen >=1200px; 66px >=992 (or is it 769?) and shorter. */
/* proBooks is 222px wide when screen >=1200px; 186px >=992px; 150px for 991px and shorter. */

/*
document.write("this hopefully fills space so that I can see the rest tttttttttttttttttttttttttt")
document.write("your device's screen width is "+window.screen.width);
document.write("your device's screen height is "+window.screen.height);
*/

/* screen widths of my devices (width x height):

iPhone 6: 375 x 667
iPad: 768 x 1024
Mom's 15" computer: 1680 x 1050

 */