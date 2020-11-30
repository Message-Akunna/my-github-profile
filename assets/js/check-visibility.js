function isVisible(element) {
    var bounding = element.getBoundingClientRect();
    var elementHeight = bounding.top - bounding.bottom;
    return (
        bounding.top > 0 &&
        bounding.left > 0 &&
        bounding.bottom < (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right < (window.innerWidth || document.documentElement.clientWidth)
    );
}