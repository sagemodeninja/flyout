class Flyout {
    static get layer() {
        return document.querySelector("#flyout_layer");
    }

    static show(show) {
        Flyout.layer.classList.toggle("active", show);
    }

    constructor(container, anchor, config) {
        this.container = container;
        this.anchor = anchor;
        this.config = config;
        
        /* Move to flyout layer. */
        container.parentElement.removeChild(container);
        Flyout.layer.appendChild(container);

        /* Display */
        const styles = window.getComputedStyle(container);
        this.displayToRestore = styles.display;
        this.container.style.display = "none";
        this.container.style.position = "fixed";

        /* Event listeners. */
        container.addEventListener("click", e => e.stopPropagation());
        anchor.addEventListener("click", e => e.stopPropagation());
        window.addEventListener("click", e => this.hide());
    }

    show() {
        Flyout.show(true);
        this.container.style.display = this.displayToRestore;

        const containerRect = this.container.getClientRects()[0];
        const anchorRect = this.anchor.getClientRects()[0];
        const layerWidth = Flyout.layer.offsetWidth;
        const layerHeight = Flyout.layer.offsetHeight;
        
        /* Config */
        const margin = this.config?.margin ?? 5;
        const anchorPoint = this.config?.anchorPoint ?? "bottomLeft";
        const validAnchorPoints = ["topLeft", "top", "topRight", "right", "bottomRight", "bottom", "bottomLeft", "left"];
        const verticalPoints = anchorPoint.toLowerCase().replace("left", "").replace("right", "");
        const horizontalPoints = anchorPoint.toLowerCase().replace("top", "").replace("bottom", "");
        const rightBoundary = layerWidth - containerRect.width - margin;

        if (!validAnchorPoints.includes(anchorPoint)) throw `${anchorPoint} is not a valid anchor point.`;

        var top = 0;
        var left = 0;

        switch(verticalPoints) {
            case "top":
                top = anchorRect.top - containerRect.height - margin;
                break;
            case "bottom":
                top = anchorRect.bottom + margin; 
                break;
            default: top = anchorRect.top;
        }

        switch(horizontalPoints) {
            case "left":
                left = anchorRect.left - (verticalPoints !== "" ? 0 : containerRect.width + margin);
                break;
            case "right":
                left = anchorRect.right - (verticalPoints !== "" ? containerRect.width : -margin);
                break;
            default:
                left = anchorRect.right - (anchorRect.width / 2) - (containerRect.width / 2);
        }

        /* Boundaries */
        if (top + containerRect.height > layerHeight)
            top = (anchorPoint !== "left" ? anchorRect.top : layerHeight) - containerRect.height - margin;
        
        if (top < 0)
            top = anchorRect.bottom + margin;

        var horizontalBound = {
            min: margin + (!verticalPoints && (anchorRect.left - containerRect.width) < 0) * anchorRect.right,
            max: rightBoundary
        };
        left = Math.max(Math.min(left, horizontalBound.max), horizontalBound.min);

        this.container.style.top = top + "px";
        this.container.style.left = left + "px";
    }

    hide() {
        Flyout.show(false);
        this.container.style.display = "none";
    }
}

(() => {
    const flyoutLayerStyle = document.head.appendChild(document.createElement("style"));
    const flyoutLayer = document.body.appendChild(document.createElement("div"));

    flyoutLayer.id = "flyout_layer";
    flyoutLayerStyle.innerHTML = `
    /* Styles for flyout.js */
    #flyout_layer {
        display: none;
        height: 100%;
        left: 0;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1;
    }

    #flyout_layer.active {
        display: block;
    }
    `;
})();