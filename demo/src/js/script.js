document.addEventListener("DOMContentLoaded", e => {
    const showBtn1 = document.querySelector("#show_flyout_1");
    const showBtn2 = document.querySelector("#show_flyout_2");
    const showBtn3 = document.querySelector("#show_flyout_3");
    const flyoutContainer1 = document.querySelector("#flyout_1");
    const flyoutContainer2 = document.querySelector("#flyout_2");
    const flyoutContainer3 = document.querySelector("#flyout_3");
    const flyout1 = new Flyout(flyoutContainer1, showBtn1);
    const flyout2 = new Flyout(flyoutContainer2, showBtn2);
    const flyout3 = new Flyout(flyoutContainer3, showBtn3);

    showBtn1.addEventListener("click", e => {
        flyout1.show();
    });

    showBtn2.addEventListener("click", e => {
        flyout2.show();
    });

    showBtn3.addEventListener("click", e => {
        flyout3.show();
    });
});