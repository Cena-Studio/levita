/**
 * 
 * @author Jidong Luo
 * @copyright Cena Studio 2023
 * @license MIT
 * @version 0.0.1
 * 
 */

//transition指定属性

/**
 * @typedef LevitaConfig
 * @property {number} amplitude
 * @property {number} glare
 * @property {string} material
 */

/**
 * @class
 */
class LevitaConfig{

    /**
     * 
     * @constructor
     * @memberof LevitaConfig
     * 
     * 
     */
    constructor(arg){
        
        arg = LevitaConfig.#preprocessArg(arg);
        
        /**
         * @type {HTMLElement[]}
         */
        this.subjects = LevitaConfig.#standardizeSubjects(arg.subject);

        /**
         * @type {string}
         */
        this.direction = LevitaConfig.#standardizeDirection(arg.direction);

        /**
         * @type {string}
         */
        this.transition = LevitaConfig.#standardizeTransition(arg.transition);

        /**
         * @type {number}
         */
        this.amplitude = LevitaConfig.#standardizeAmplitude(arg.amplitude);

        /**
         * @type {number}
         */
        this.glare = LevitaConfig.#standardizeGlare(arg.glare);

        /**
         * @type {number}
         */
        this.zoom = LevitaConfig.#standardizeZoom(arg.zoom);

        /**
         * @type {string}
         */
        this.material = LevitaConfig.#standardizeMaterial(arg.material);

        /**
         * @type {boolean}
         */
        this.reverse = LevitaConfig.#standardizeReverse(arg.reverse);
        
        /**
         * @type {boolean}
         */
        this.rebound = LevitaConfig.#standardizeRebound(arg.rebound);
    }

    /**
     * 
     * @private
     * @memberof LevitaConfig
     * @param {string|HTMLElement|HTMLCollection|Object} arg The dom, its id, or the dom collection that specifies the container. Or, a configuration object.
     * 
     */
    static #preprocessArg(arg){

        let preprocessedArg = {
            "direction": "default",
            "transition": "default",
            "amplitude": "default",
            "glare": "default",
            "zoom": "default",
            "material": "default",
            "reverse": "default",
            "rebound": "default"
        };
        let strArgType = Object.prototype.toString.call(arg);

        if(strArgType !== "[object Object]"){
            preprocessedArg.subject = arg;
        }else{
            preprocessedArg.subject = arg.subject;
        }

        if(arg.hasOwnProperty("direction")){
            preprocessedArg.direction = arg.direction;
        }

        if(arg.hasOwnProperty("transition")){
            preprocessedArg.transition = arg.transition;
        }

        if(arg.hasOwnProperty("amplitude")){
            preprocessedArg.amplitude = arg.amplitude;
        }

        if(arg.hasOwnProperty("glare")){
            preprocessedArg.glare = arg.glare;
        }

        if(arg.hasOwnProperty("zoom")){
            preprocessedArg.zoom = arg.zoom;
        }

        if(arg.hasOwnProperty("material")){
            preprocessedArg.material = arg.material;
        }

        if(arg.hasOwnProperty("reverse")){
            preprocessedArg.reverse = arg.reverse;
        }

        if(arg.hasOwnProperty("rebound")){
            preprocessedArg.rebound = arg.rebound;
        }

        return preprocessedArg;
    }

    /**
     * Convert the subject parameter to an array of HTMLElement.
     * @private
     * @memberof LevitaConfig
     * @param {string|HTMLElement|HTMLCollection} subject
     * @return {HTMLElement[]} The standardized array of subjects.
     */
    static #standardizeSubjects(subject){

        let subjects = [];
        let strSubjectArgType = Object.prototype.toString.call(subject);
        let typeRegex = /HTML[a-zA-Z]*Element/;

        if(strSubjectArgType === "[object HTMLCollection]"){

            let intContainerSize = subject.length;
            
            for(let i = 0; i < intContainerSize; i++){

                subjects.push(subject[i]);

            }

        }else if(typeRegex.test(strSubjectArgType)){

            subjects.push(subject);

        }else if(strSubjectArgType === "[object String]"){

            subjects.push(document.getElementById(subject));
        
        }

        return subjects;

    }

    /**
     * Convert the direction parameter to a standard direction value.
     * @private
     * @memberof LevitaConfig
     * @param {string} direction
     * @returns {string} The standardized direction.
     * 
     */
    static #standardizeDirection(direction) {

        let options = ["both", "horizontal", "vertical"];

        if (options.includes(direction)) {

            return direction;

        }

        return "both";

    }

    /**
     * Convert the transition parameter to a standard transition value.
     * @private
     * @memberof LevitaConfig
     * @param {string} transition
     * @returns {string} The standardized transition.
     * 
     */
    static #standardizeTransition(transition) {

        let transitionRegex = /^\d+(\.\d+)?m?s$/;

        if (transitionRegex.test(transition)) {

            return transition;

        }

        return "360ms";

    }

    /**
     * Convert the amplitude parameter to a standard amplitude value.
     * @private
     * @memberof LevitaConfig
     * @param {string|number} amplitude
     * @returns {number} The standardized amplitude.
     * 
     */
    static #standardizeAmplitude(amplitude){

        let strAmplitudeType = Object.prototype.toString.call(amplitude);

        if(strAmplitudeType === "[object Number]"){

            if(amplitude < 0){

                return 0;

            }else if(amplitude > 1){

                return 1;

            }

            return amplitude;
        
        }

        return 0.5;

    }
    
    /**
     * Convert the glare parameter to a standard glare value.
     * @private
     * @memberof LevitaConfig
     * @param {string|number} glare
     * @returns {number} The standardized glare.
     * 
     */
    static #standardizeGlare(glare) {

        let strGlareType = Object.prototype.toString.call(glare);

        if(strGlareType === "[object Number]"){

            if(glare < 0){

                return 0;

            }else if(glare > 1){

                return 1;

            }

            return glare;
        
        }

        return 0.5;

    }

    /**
     * Convert the zoom parameter to a standard zoom value.
     * @private
     * @memberof LevitaConfig
     * @param {string|number} zoom
     * @returns {number} The standardized zoom.
     * 
     */
    static #standardizeZoom(zoom) {

        let strZoomType = Object.prototype.toString.call(zoom);

        if(strZoomType === "[object Number]"){

            if(zoom < 0){

                return 0;

            }else if(zoom > 1){

                return 1;

            }

            return zoom;
        
        }

        return 0.1;

    }

    /**
     * Convert the material parameter to a standard material value.
     * @private
     * @memberof LevitaConfig
     * @param {string} material
     * @returns {string} The standardized material.
     * 
     */
    static #standardizeMaterial(material) {

        let options = ["textured", "smooth"];

        if (options.includes(material)) {

            return material;

        }

        return "textured";

    }

    /**
     * Convert the reverse parameter to a standard reverse value.
     * @private
     * @memberof LevitaConfig
     * @param {string|boolean} reverse
     * @returns {boolean} The standardized reverse.
     * 
     */
    static #standardizeReverse(reverse) {

        let strReverseType = Object.prototype.toString.call(reverse);

        if(strReverseType === "[object Boolean]"){

            return reverse;
        
        }

        return false;

    }

    /**
     * Convert the rebound parameter to a standard rebound value.
     * @private
     * @memberof LevitaConfig
     * @param {string|boolean} rebound
     * @returns {boolean} The standardized rebound.
     * 
     */
    static #standardizeRebound(rebound) {

        let strReboundType = Object.prototype.toString.call(rebound);

        if(strReboundType === "[object Boolean]"){

            return rebound;
        
        }

        return true;

    }
    
}

/**
 * @class
 */
class Levita{

    /**
     * @constructor
     * @memberof Levita
     * @param {HTMLElement} subject
     * @param {LevitaConfig} levitaConfig
     */
    constructor(subject, levitaConfig){

        /**
         * @type {HTMLElement} 
         */
        this.subject = subject;

        /**
         * @type {string}
         */
        this.direction = levitaConfig.direction;
        
        /**
         * @type {string}
         */
        this.transition = levitaConfig.transition;

        /**
         * @type {number}
         */
        this.amplitude = levitaConfig.amplitude * 24;

        /**
         * @type {number}
         */
        this.glare = levitaConfig.glare;

        /**
         * @type {number}
         */
        this.zoom = levitaConfig.zoom * 0.5 + 1;

        /**
         * @type {string}
         */
        this.material = levitaConfig.material;

        /**
         * @type {boolean}
         */
        this.reverse = levitaConfig.reverse;
        
        /**
         * @type {boolean}
         */
        this.rebound = levitaConfig.rebound;

        this.#setSubjectStyle();
        this.#renderFilterSvg();
        this.#renderGlareWrapper();

        this.#resetPercentageDistance();

        this.#bindBasicEvent();
        this.#bindTiltEvent();
        this.#bindGlareEvent();
        
    }

    /**
     * Apply the levita effect with optional custom configurations to the specified elements. 
     * A levita atrribute will be added to each of the elements.
     * 
     * @public
     * @memberof Levita
     * @param {string|HTMLElement|HTMLCollection|Object} arg The dom, its id, or the dom collection that specifies the container. Or, a configuration object.
     * @param {string|HTMLElement|HTMLCollection} arg.subjects The dom, its id, or the dom collection that applies the levita effect. e.g. "myid", document.getElementByClassName("myclass").
     * @param {string} arg.direction "both", "horizontal", or "vertical". The allowed direction of the element tilt.
     * @param {string} arg.transition  e.g. "360ms". The transition speed of the element tilt.
     * @param {number} arg.amplitude 0-1. The tilt range of the element.
     * @param {number} arg.glare 0-1. The strength of the specular reflection.
     * @param {number} arg.zoom 0-1. The scaling factor upon element hovered.
     * @param {string} arg.material "textured", or "smooth". It simulates different materials to form corresponding reflective effects.
     * @param {boolean} arg.reverse true, or false. It determines whether to move in the same or the opposite direction as the cursor.
     * @param {boolean} arg.rebound true, or false. It determines whether the background bounces back to its original position when the mouse cursor leaves.
     */
    static initialize(arg){

        const levitaConfig = new LevitaConfig(arg);
        for(const subject of levitaConfig.subjects){
            subject.levita = new Levita(subject, levitaConfig);
        }

    }

    #setSubjectStyle(){
        this.subject.setAttribute("style",
            "transform-style: preserve-3d;" +
            "perspective: 120vw;" +
            "transition: " + window.getComputedStyle(this.subject).transition + ", box-shadow " + this.transition + " ease-out, transform " + this.transition + " ease-out;"
        )
    }

    #renderBackgroundWrapper(){
        
    }

    #renderGlareWrapper(){
        this.glareWrapper = document.createElement("div");
        if(this.material === "textured"){
            this.#setTexturedGlareStyle();
        }else if(this.material === "smooth"){
            this.#setSmoothGlareStyle();
        }

        this.bottomGlare = document.createElement("div");
        this.bottomGlare.setAttribute("style",
            "position: absolute;" + 
            "top: 0;" +
            "left: -50%;" +
            "width: 200%;" +
            "height: 100%;" +
            "background-image: radial-gradient(ellipse at 50% 100%, #ffffffa0, #ffffff10);" +
            "transition: transform " + this.transition + " ease-out, opacity " + this.transition + " ease-out;" +
            "opacity: 0"
        );

        this.rightGlare = document.createElement("div");
        this.rightGlare.setAttribute("style",
            "position: absolute;" + 
            "top: -50%;" +
            "left: 0;" +
            "width: 100%;" +
            "height: 200%;" +
            "background-image: radial-gradient(ellipse at 100% 50%, #ffffff80, #ffffff10);" +
            "transition: transform " + this.transition + " ease-out, opacity " + this.transition + " ease-out;" +
            "opacity: 0"
        );

        this.subject.appendChild(this.glareWrapper);
        this.glareWrapper.appendChild(this.bottomGlare);
        this.glareWrapper.appendChild(this.rightGlare);

        if(this.material === "textured"){
            this.#renderCardNoise();
        }
    }

    #setTexturedGlareStyle(){
        this.glareWrapper.setAttribute("style",
            "position: absolute;" +
            "top: 0;" +
            "left: 0;" +
            "width: 100%;" +
            "height: 100%;" +
            "border-radius: " + window.getComputedStyle(this.subject).borderRadius + ";" +
            "background-color: #000;" +
            "overflow: hidden;" +
            "filter: url(#js_levita_mask_filter);" +
            "pointer-events: none;" +
            "z-index: 99999"
        );
    }

    #setSmoothGlareStyle(){
        this.glareWrapper.setAttribute("style",
            "position: absolute;" +
            "top: 0;" +
            "left: 0;" +
            "width: 100%;" +
            "height: 100%;" +
            "border-radius: " + window.getComputedStyle(this.subject).borderRadius + ";" +
            "overflow: hidden;" +
            "pointer-events: none;" +
            "z-index: 99999"
        );
    }

    #renderCardNoise(){
        const cardNoise = document.createElement("div");
        cardNoise.setAttribute("style",
            "position: absolute;" + 
            "top: 0;" +
            "left: 0;" +
            "width: 100%;" +
            "height: 100%;" +
            "filter: url(#js_levita_noise_filter);" +
            "mix-blend-mode: overlay;"
        );
        this.glareWrapper.appendChild(cardNoise);
    }

    #renderFilterSvg(){
        if(document.getElementById("js_levita_filters") === null){
            const filtersWrapper = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            filtersWrapper.id = "js_levita_filters";
            filtersWrapper.setAttribute("width", "0");
            filtersWrapper.setAttribute("height", "0");
            filtersWrapper.innerHTML = "<defs><filter id='js_levita_noise_filter'><feTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='5'/><feColorMatrix type='saturate' values='0'/></filter><filter id='js_levita_mask_filter'><feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0.299 0.587 0.114 0 0'/></filter></defs>";
            document.body.appendChild(filtersWrapper);
        }
    }

    #resetDimension() {
        this.halfWidth = this.subject.getBoundingClientRect().width / 2;
        this.halfHeight = this.subject.getBoundingClientRect().height / 2;
        this.centerX = this.subject.getBoundingClientRect().left + this.halfWidth;
        this.centerY = this.subject.getBoundingClientRect().top + this.halfHeight;
    }

    #resetPercentageDistance() {
        this.percentageDisX = 0;
        this.percentageDisY = 0;
    }

    #bindBasicEvent(){

        const levita = this;

        /** 
         * @param {MouseEvent} e 
         */
        const mouseMoveHandler = function(e){
            const mouPosX = e.clientX;
            const mouPosY = e.clientY;
            levita.#resetDimension();
            levita.#setPercentageDistance(mouPosX, mouPosY);
        }

        const mouseLeaveHandler = function(){
            levita.#resetPercentageDistance();
        }

        this.subject.addEventListener('mousemove', mouseMoveHandler);
        if(this.rebound){
            this.subject.addEventListener('mouseleave', mouseLeaveHandler);
        }
    }

    #bindTiltEvent(){
        this.subject.addEventListener('mousemove', this.#setTiltStyle.bind(this));
        if(this.rebound){
            this.subject.addEventListener('mouseleave', this.#resetTiltStyle.bind(this));
        }
    }

    #bindGlareEvent(){
        this.subject.addEventListener('mousemove', this.#setGlareStyle.bind(this));
        if(this.rebound){
            this.subject.addEventListener('mouseleave', this.#resetGlareStyle.bind(this));
        }
    }

    /**
     * 
     * @param {number} mouPosX
     * @param {number} mouPosY
     */
    #setPercentageDistance(mouPosX, mouPosY){
        
        if(this.reverse){
            this.#setReversedDistance(mouPosX, mouPosY);
        }else{
            this.#setNormalDistance(mouPosX,mouPosY);
        }

    }

    /**
     * 
     * @param {number} mouPosX
     * @param {number} mouPosY
     */
    #setNormalDistance(mouPosX, mouPosY){
        this.percentageDisX = (mouPosX - this.centerX) / this.halfWidth;
        this.percentageDisY = (this.centerY - mouPosY) / this.halfHeight;
    }

    /**
     * 
     * @param {number} mouPosX
     * @param {number} mouPosY
     */
    #setReversedDistance(mouPosX, mouPosY){
        this.percentageDisX = (this.centerX - mouPosX) / this.halfWidth;
        this.percentageDisY = (mouPosY - this.centerY) / this.halfHeight;
    }

    #setTiltStyle(){
        if(this.direction === "horizontal"){
            this.#setHorizontalTiltStyle();
        }else if(this.direction === "vertical"){
            this.#setVerticalTiltStyle();
        }else if(this.direction === "both"){
            this.#setBothTiltStyle();
        }

        this.subject.style.boxShadow = '18px 18px 36px 0 #00000080';
    }

    #calcTilDegX(){
        return - this.percentageDisY * this.amplitude;
    }

    #calcTilDegY(){
        return - this.percentageDisX * this.amplitude;
    }

    #setHorizontalTiltStyle(){
        this.subject.style.transform = 'perspective(120vw) rotateY(' + this.#calcTilDegY() + 'deg) scale(' + this.zoom + ')';
    }

    #setVerticalTiltStyle(){
        this.subject.style.transform = 'perspective(120vw) rotateX(' + this.#calcTilDegX() + 'deg) scale(' + this.zoom + ')';
    }

    #setBothTiltStyle(){
        this.subject.style.transform = 'perspective(120vw) rotateX(' + this.#calcTilDegX() + 'deg) rotateY(' + this.#calcTilDegY() + 'deg) scale(' + this.zoom + ')';
    }

    #setGlareStyle(){

        if(this.direction === "horizontal"){
            this.#setHorizontalGlareStyle();
        }else if(this.direction === "vertical"){
            this.#setVerticalGlareStyle();
        }else if(this.direction === "both"){
            this.#setBothGlareStyle();
        }
    }

    #setHorizontalGlareStyle(){
        const bottomGlareTransform = this.percentageDisX * 25;
        const bottomGlareOpacity = Math.sqrt(0.5);
        const rightGlareOpacity = Math.sqrt((this.percentageDisX + 1) * this.glare / 2);
        this.bottomGlare.style.transform = 'translateX(' + bottomGlareTransform + '%)';
        this.bottomGlare.style.opacity = bottomGlareOpacity;
        this.rightGlare.style.opacity = rightGlareOpacity;
    }

    #setVerticalGlareStyle(){
        const rightGlareTransform = - this.percentageDisY * 25;
        const bottomGlareOpacity = Math.sqrt((1 - this.percentageDisY) * this.glare / 2);
        const rightGlareOpacity = Math.sqrt(0.5);
        this.rightGlare.style.transform = 'translateY(' + rightGlareTransform + '%)';
        this.bottomGlare.style.opacity = bottomGlareOpacity;
        this.rightGlare.style.opacity = rightGlareOpacity;
    }

    #setBothGlareStyle(){
        const bottomGlareTransform = this.percentageDisX * 25;
        const rightGlareTransform = - this.percentageDisY * 25;
        const bottomGlareOpacity = Math.sqrt((1 - this.percentageDisY) * this.glare / 2);
        const rightGlareOpacity = Math.sqrt((this.percentageDisX + 1) * this.glare / 2);

        this.bottomGlare.style.transform = 'translateX(' + bottomGlareTransform + '%)';
        this.rightGlare.style.transform = 'translateY(' + rightGlareTransform + '%)';
        this.bottomGlare.style.opacity = bottomGlareOpacity;
        this.rightGlare.style.opacity = rightGlareOpacity;
    }


    #resetTiltStyle(){
        this.subject.style.transform = 'none';
        this.subject.style.boxShadow = '0 0 0 0 #00000000';
    }

    #resetGlareStyle(){
        this.bottomGlare.style.transform = 'none';
        this.rightGlare.style.transform = 'none';
        this.bottomGlare.style.opacity = 0;
        this.rightGlare.style.opacity = 0;
    }
    
}