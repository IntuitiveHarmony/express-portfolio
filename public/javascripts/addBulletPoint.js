// jQuery ready function to ensure the DOM is fully loaded before manipulating it
$(() => {
  // Event listener for the button click
  $("#addBulletButton").on("click", addBulletPoint);

  function addBulletPoint() {
    const li = $("<li></li>"); // Create a new li element using jQuery
    const textarea = $("<textarea>").attr({
      // Create a new textarea element with attributes using jQuery
      name: "bulletPoints",
      class: "form-control",
    });
    const deleteButton = $("<button>")
      .text("Delete")
      .addClass("delete-button")
      .on("click", () => {
        if (
          window.confirm("Are you sure you want to delete this bullet point?")
        ) {
          li.remove(); // Remove the li element when the user confirms
        }
      });
    li.append(textarea, deleteButton); // Append the textarea and delete button to the li element
    $("#bulletPointsList").append(li); // Append the li element to the bulletPointsList using jQuery
  }
  // Event listener for delete buttons of existing bullet points
  $("#bulletPointsList").on("click", "button.deleteBullet", function () {
    if (window.confirm("Are you sure you want to delete this bullet point?")) {
      $(this).parent().remove(); // Remove the parent li element when the user confirms
    }
  });
});
