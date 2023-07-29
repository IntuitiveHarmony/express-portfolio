let numTriangles;

const dropTriangles = () => {
  const container = $(".triangle-container");
  container.children(".triangle").remove();

  for (let i = 0; i < numTriangles; i++) {
    container.append(`<div class="triangle" id=${i + 1}>`);
  }
};

const checkScreenWidth = () => {
  let screenWidth = $(window).width();
  // console.log("Screen Width: " + screenWidth + "px");

  if (screenWidth <= 768) {
    numTriangles = 7;
  } else if (screenWidth <= 1024) {
    numTriangles = 10;
  } else {
    numTriangles = 17;
  }
};

$(() => {
  checkScreenWidth();
  dropTriangles();
  $(window).resize(function () {
    checkScreenWidth();
    dropTriangles();
  });
});
