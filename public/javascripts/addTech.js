// jQuery ready function to ensure the DOM is fully loaded before manipulating it
$(() => {
  // Event listener for the button click
  $("#addTechButton").on("click", addTechPoint);

  function addTechPoint() {
    const li = $("<li></li>"); // Create a new li element using jQuery
    const textarea = $("<input>").attr({
      // Create a new textarea element with attributes using jQuery
      name: "techUsed",
      class: "form-control",
    });
    const deleteButton = $("<button>")
      .text("Delete")
      .addClass("delete-button")
      .on("click", () => {
        if (window.confirm("Are you sure you want to delete this tech?")) {
          li.remove(); // Remove the li element when the user confirms
        }
      });
    li.append(textarea, deleteButton); // Append the textarea and delete button to the li element
    $("#techUsedList").append(li); // Append the li element to the techUsedList using jQuery
  }
  // Event listener for delete buttons of existing techs
  $("#techUsedList").on("click", "button.deleteTech", function () {
    if (window.confirm("Are you sure you want to delete this tech?")) {
      $(this).parent().remove(); // Remove the parent li element when the user confirms
    }
  });
});
