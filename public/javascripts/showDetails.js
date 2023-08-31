const getProjectId = () => {};

$(() => {
  // listen for all the detail links on click
  // Cannot be arrow function because it uses 'this' keyword
  $(".detail-link").on("click", function () {
    // hide the other details
    $(".details-container").addClass("hide");

    // Show specific Project by grabbing id from DOM
    const projectId = $(this).attr("link-id");
    $(`[detail-id="${projectId}"]`).removeClass("hide");
  });
});
