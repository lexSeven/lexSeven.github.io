document.documentElement.style.fontSize =
    Math.min(100,document.documentElement.clientWidth / 3.75) + "px"

window.onresize = function () {
    document.documentElement.style.fontSize =
        Math.min(100,document.documentElement.clientWidth / 3.75) + "px"
} 