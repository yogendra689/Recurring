$(document).ready(function(){
	$("#event_repeats").on("change", function(){
		opt = $("#event_repeats").get(0).selectedIndex;
    rval = $("select#event_repeats_every :selected").val();
    occur = $("#event_occur").val();
    repeat_by = "day_of_the_month"
    if(opt == 0){
    	$("#repeat_every").show();
    	$("#repeat_on").hide();
    	$("#repeat_by").hide();
    	$("#every").text("days");
      $("#event_occur").text("5");
      $("#event_until_date").text("2/8/2014");
      every = $("#every").text();
    }
    else if (opt == 4){
    	$("#repeat_every").show();
    	$("#repeat_on").show();
    	$("#repeat_by").hide();
    	$("#every").text("weeks");
      $("#event_occur").text("5");
      $("#event_until_date").text("2/8/2014");
      every = $("#every").text();
    }
    else if(opt == 5){
    	$("#repeat_every").show();
    	$("#repeat_on").hide();
    	$("#repeat_by").show();
      $("#repeat_by :checked").val("day_of_the_month");
      $("#every").text("months");
      $("#event_occur").text("5");
      $("#event_until_date").text("2/8/2014");
      repeat_by_month();
    	every = $("#every").text();
    }  
    else if(opt == 6){
    	$("#repeat_every").show();
    	$("#repeat_on").hide();
    	$("#repeat_by").hide();
      $("#every").text("years");
      $("#event_occur").text("5");
      $("#event_until_date").text("2/8/2014");
      every = $("#every").text();
    }
    else{
    	$("#repeat_every").hide();
    	$("#repeat_on").hide();
    	$("#repeat_by").hide();
      $("#event_occur").text("5");
      $("#event_until_date").text("2/8/2014");
    }
    until_date =  $("#event_until_date").val();
    ruleoptions();
	});
	$("#event_ends_on_after").on("change", function(){
		$("#event_occur").prop("disabled",false);
    $("#event_until_date").prop("disabled",true);
    ruleoptions();
  });
  $("#event_ends_on_never").on("change", function(){
		$("#event_occur").prop("disabled",true);
    $("#event_until_date").prop("disabled",true);
    ruleoptions();
  });
  $("#event_ends_on_on").on("change", function(){
		$("#event_occur").prop("disabled",true);
    $("#event_until_date").prop("disabled",false);
    ruleoptions();
  });

  $("#event_repeats_every").change(function() {
    rval = $("select#event_repeats_every :selected").val();
    ruleoptions();
  });

  $("#repeat_by").change(function(){
    repeat_by_month();
    ruleoptions();
  })
  function repeat_by_month(){
    if ($("#event_repeat_by_day_of_the_month").is(':checked'))
      repeat_by = "day_of_the_month"
    else if ($("#event_repeat_by_day_of_the_week").is(':checked'))
      repeat_by = "day_of_the_week"
  }
  function ends_on_option(){
    if ($("#event_ends_on_on").is(':checked'))
      ends_on = "on"
    else if ($("#event_ends_on_after").is(':checked'))
      ends_on = "after"
    else
      ends_on = "never"
  }

  function selectedweeks(){
    week = "";
    if (opt == 1){
      week = "12345"
      rval = 1;}
    if (opt == 2){
      week = "135"
      rval = 1;}
    if (opt == 3){
      week = "24"
      rval = 1;}
    if (opt == 4){
    warr = [];
    warr[0] = $('#repeat_on_sunday').is(':checked')? 0:"";
    warr[1] = $('#repeat_on_monday').is(':checked')? 1:"";
    warr[2] = $('#repeat_on_tuesday').is(':checked')? 2:"";
    warr[3] = $('#repeat_on_wednesday').is(':checked')? 3:"";
    warr[4] = $('#repeat_on_thursday').is(':checked')? 4:"";
    warr[5] = $('#repeat_on_friday').is(':checked')? 5:"";
    warr[6] = $('#repeat_on_saturday').is(':checked')? 6:"";
    week = warr.join("");
    } 
    return week;
  }
  $("#repeat_on").click(function(){
    ruleoptions();
  });

  function ruleoptions(){
    se = selectedweeks();
    ends_on_option();
    $.ajax({
      type: "GET",
      datatype: "JSON",
      url: "/events/ruleoptions",
      data: {selected: se, option: opt, rval: rval, count: occur, until: until_date,
             ends_on: ends_on, repeat_by: repeat_by},
      success: function(data){
        $("#summary").text(data);
      }
    })
  }
});