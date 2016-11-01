function ShowHideContent() {
  var self = this;

  self.escapeElementName = function(str) {
    result = str.replace('[', '\\[').replace(']', '\\]')
    return(result);
  };

  self.showHideRadioToggledContent = function () {
    $(".block-label input[type='radio']").each(function () {

      var $radio = $(this);
      var $radioGroupName = $radio.attr('name');
      var $radioLabel = $radio.parent('label');

      var dataTarget = $radioLabel.attr('data-target');

      // Add ARIA attributes

      // If the data-target attribute is defined
      if (dataTarget) {

        // Set aria-controls
        $radio.attr('aria-controls', dataTarget);

        $radio.on('click', function () {

          // Select radio buttons in the same group
          $radio.closest('form').find(".block-label input[name=" + self.escapeElementName($radioGroupName) + "]").each(function () {
            var $this = $(this);

            var groupDataTarget = $this.parent('label').attr('data-target');
            var $groupDataTarget = $('#' + groupDataTarget);

            // Hide toggled content
            $groupDataTarget.hide();
            // Set aria-expanded and aria-hidden for hidden content
            $this.attr('aria-expanded', 'false');
            $groupDataTarget.attr('aria-hidden', 'true');
          });

          var $dataTarget = $('#' + dataTarget);
          $dataTarget.show();
          // Set aria-expanded and aria-hidden for clicked radio
          $radio.attr('aria-expanded', 'true');
          $dataTarget.attr('aria-hidden', 'false');

        });

      } else {
        // If the data-target attribute is undefined for a radio button,
        // hide visible data-target content for radio buttons in the same group

        $radio.on('click', function () {

          // Select radio buttons in the same group
          $(".block-label input[name=" + self.escapeElementName($radioGroupName) + "]").each(function () {

            var groupDataTarget = $(this).parent('label').attr('data-target');
            var $groupDataTarget = $('#' + groupDataTarget);

            // Hide toggled content
            $groupDataTarget.hide();
            // Set aria-expanded and aria-hidden for hidden content
            $(this).attr('aria-expanded', 'false');
            $groupDataTarget.attr('aria-hidden', 'true');
          });

        });
      }

    });
  }
  self.showHideCheckboxToggledContent = function () {

    $(".block-label input[type='checkbox']").each(function() {

      var $checkbox = $(this);
      var $checkboxLabel = $(this).parent();

      var $dataTarget = $checkboxLabel.attr('data-target');

      // Add ARIA attributes

      // If the data-target attribute is defined
      if (typeof $dataTarget !== 'undefined' && $dataTarget !== false) {

        // Set aria-controls
        $checkbox.attr('aria-controls', $dataTarget);

        // Set aria-expanded and aria-hidden
        $checkbox.attr('aria-expanded', 'false');
        $('#'+$dataTarget).attr('aria-hidden', 'true');

        // For checkboxes revealing hidden content
        $checkbox.on('click', function() {

          var state = $(this).attr('aria-expanded') === 'false' ? true : false;

          // Toggle hidden content
          $('#'+$dataTarget).toggle();

          // Update aria-expanded and aria-hidden attributes
          $(this).attr('aria-expanded', state);
          $('#'+$dataTarget).attr('aria-hidden', !state);

        });
      }

    });
  }
}

$(document).ready(function() {

  // Use GOV.UK selection-buttons.js to set selected
  // and focused states for block labels
  var $blockLabels = $(".block-label input[type='radio'], .block-label input[type='checkbox']");
  new GOVUK.SelectionButtons($blockLabels);

  // Show and hide toggled content
  // Where .block-label uses the data-target attribute
  var toggleContent = new ShowHideContent();
  toggleContent.showHideRadioToggledContent();
  toggleContent.showHideCheckboxToggledContent();

});



// Searchable tables

$(document).ready(function() {

  // DataTable
  var table = $('#searchable-table').DataTable({
    "paging":       false,
    "ordering":     false,
    "info":         false,
    // "pageLength":   200,
    "lengthChange": false,
    // "pagingType":  'simple_numbers'
  });

  $("#searchable-table_filter").find('input').attr("placeholder", "Type to filter");

});


// Sortable tables

$(document).ready(function() {

  // DataTable
  var table = $('.sortable').DataTable({
    "paging":       false,
    "info":         false,
    "lengthChange": false,
    "searching":    false,
  }); 

});


// Chosen select

$(document).ready(function() {
  var config = {
    '.chosen-select' : {},
  }
  for (var selector in config) {
    $(selector).chosen(config[selector]);
  }

});

// Calendar event pop-ups

$(document).ready(function() {

  var $allVisits = $(".event.visit");

  $allVisits.click(function() {
    $allVisits.not(this).removeClass("pop-up");
    $(this).toggleClass("pop-up");
    return false;
  });

});

// Own functionality

$(document).ready(function() {
  
  $("tr").each(function() {
    var $name = $(this).find('.col-heading').text();
    $(this).before( "<tr class='done' style='display:none'><td colspan='5'>" + $name + " added to &lsquo;my referrals&rsquo;&nbsp;&nbsp;<a href='#' class='undo'>Undo</a></td></tr>" );
  });
  
  var $ownButtons = $(".add a");
  var $undoButtons = $(".undo");

  $ownButtons.click(function() {

    var $row = $(this).parent().parent();
    var $rowBefore = $row.prev();
    var $name = $(this).parent().parent().find('.col-heading').text();

    $rowBefore.css('display', 'table-row');
    $row.css('display', 'none');

    // Updates totals

    $availableTotal = parseInt($("#available-refs-total").text()) - 1;
    $("#available-refs-total").html($availableTotal);

    $teamTotal = parseInt($("#team-refs-total").text()) + 1;
    $("#team-refs-total").html($teamTotal);

    $myTotal = parseInt($("#my-refs-total").text()) + 1;
    $("#my-refs-total").html($myTotal);

    return false;

  });

  $undoButtons.click(function() {

    var $row = $(this).parent().parent();
    var $rowAfter = $row.next();
    var $name = $(this).parent().parent().find('.col-heading').text();

    $rowAfter.css('display', 'table-row');
    $row.css('display', 'none');

    // Updates totals

    $availableTotal = parseInt($("#available-refs-total").text()) + 1;
    $("#available-refs-total").html($availableTotal);

    $teamTotal = parseInt($("#team-refs-total").text()) - 1;
    $("#team-refs-total").html($teamTotal);

    $myTotal = parseInt($("#my-refs-total").text()) - 1;
    $("#my-refs-total").html($myTotal);

    return false;

  });

});