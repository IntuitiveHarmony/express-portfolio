const getProjectId = () => {};

$(() => {
  // listen for all the detail links on click
  // Cannot be arrow function because it uses 'this' keyword
  $(".detail-link").on("click", function () {
    // hide the other details
    $(".details-container").addClass("hide");

    // Close the Details if clicked again
    // Check if the clicked link already has the "select-project" class
    if ($(this).hasClass("select-project")) {
      // If it does, hide it and remove the "select-project" class
      $(".select-project").removeClass("select-project");
    } else {
      // If it doesn't, add the "select-project" class to this link and show the details
      $(".detail-link").removeClass("select-project");
      $(this).addClass("select-project");

      // Show specific Project by grabbing id from DOM
      const projectId = $(this).attr("link-id");
      $(`[detail-id="${projectId}"]`).removeClass("hide");
    }
  });
});
