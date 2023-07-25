// Adjust the position of the content based on the size of the nav bar
const adjustContentPosition = () => {
  const navbarHeight = $(".navbar").height();
  $(".content-container").css("margin-top", navbarHeight + 30 + "px");
};
$(".navbar-toggler").on("click", () => {
  setTimeout(adjustContentPosition, 400);
});
$(document).ready(() => {
  adjustContentPosition();

  $(window).on("resize", () => {
    adjustContentPosition();
  });
});
