let size;
(function () {
    size = {}
    setProperties()
    window.addEventsListener('rezise',setProperties)
    function setProperties () {
        size.screenWidth = roundify (window.screen.width)
        size.screenHeight = roundify (window.screen.height)
        size.pageWidht = roundify (document.body.clientWidth)
        size.pageHeight = roundify (document.body.clientHeight)
        size.windowWidth = roundify (window.innerWidth)
        size.windowHeight = roundify (window.innerHeight)
        function roundify (n) {
            return Math.round (n * window.devicePixelRatio)
        }
    }
} ) ();
function displaySize () {
    console.clear()
    console.log(size)
    document.querySelector ("#screenSize").innerHTML =
    `Ṩ {size.pageWidth}px,Ṩ{size.pageHeight}px`; 
}
displaySize ()
window.addEventListener('resize',displaySize)