$(document).ready(function(){
	$("#event_repeats").on("change", function(){
		var opt = $("#event_repeats").val();
    if(opt == "Daily"){
    	$("#repeat_every").show();
    	$("#repeat_on").hide();
    	$("#repeat_by").hide();
    	$("#every").text("days");
    	$("#summary").text("daily");
    }
    else if (opt == "weekly"){
    	$("#repeat_every").show();
    	$("#repeat_on").show();
    	$("#repeat_by").hide();
    	$("#every").text("weeks");
    	$("#summary").text("weekly");
    }
    else if(opt == "monthly"){
    	$("#repeat_every").hide();
    	$("#repeat_on").hide();
    	$("#repeat_by").show();
    	$("#summary").text("monthly");
    }  
    else if(opt == "yearly"){
    	$("#repeat_every").show();
    	$("#repeat_on").hide();
    	$("#repeat_by").hide();
      $("#every").text("years");
    	$("#summary").text("anually");
    }
    else{
    	$("#repeat_every").hide();
    	$("#repeat_on").hide();
    	$("#repeat_by").hide();
    }
	});
	$("#event_ends_on_after").on("change", function(){
		$("#event_occur").prop("disabled",false);
        $("#event_until_date").prop("disabled",true);
  });
  $("#event_ends_on_never").on("change", function(){
		$("#event_occur").prop("disabled",true);
        $("#event_until_date").prop("disabled",true);
  });
  $("#event_ends_on_on").on("change", function(){
		$("#event_occur").prop("disabled",true);
        $("#event_until_date").prop("disabled",false);
  });
});

