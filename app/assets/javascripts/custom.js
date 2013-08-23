$(document).ready(function(){
	$("#event_repeats").on("change", function(){
		opt = $("#event_repeats").val();
    rval = $("select#event_repeats_every :selected").val();
    if(opt == "Daily"){
    	$("#repeat_every").show();
    	$("#repeat_on").hide();
    	$("#repeat_by").hide();
    	$("#every").text("days");
      $("#event_occur").val("5");
      $("#event_until_date").val("2/8/2014");
      every = $("#every").text();
      on=""
      sumstring(opt,rval,every,on)
    }
    else if (opt == "weekly"){
    	$("#repeat_every").show();
    	$("#repeat_on").show();
    	$("#repeat_by").hide();
    	$("#every").text("weeks");
      $("#event_occur").val("35");
      $("#event_until_date").val("2/8/2014");
      every = $("#every").text();
      weeklyfeature();
    }
    else if(opt == "monthly"){
    	$("#repeat_every").show();
    	$("#repeat_on").hide();
    	$("#repeat_by").show();
      $("#repeat_by :checked").val("day_of_the_month");
      $("#every").text("months");
      $("#event_occur").val("5");
      $("#event_until_date").val("2/8/2014");
    	every = $("#every").text();
      on = " on day "+$("#event_startdate_3i").val();
      sumstring(opt,rval,every,on)
    }  
    else if(opt == "yearly"){
    	$("#repeat_every").show();
    	$("#repeat_on").hide();
    	$("#repeat_by").hide();
      $("#every").text("years");
      $("#event_occur").val("5");
      $("#event_until_date").val("2/8/2014");
      every = $("#every").text();
      on = " on "+$("#event_startdate_2i").val()+" "+$("#event_startdate_3i").val();
      sumstring("annually",rval,every,on)
    }
    else{
    	$("#repeat_every").hide();
    	$("#repeat_on").hide();
    	$("#repeat_by").hide();
      $("#event_occur").val("5");
      $("#event_until_date").val("2/8/2014");
      weekdays_n_year(opt,rval);
    }
	});
	$("#event_ends_on_after").on("change", function(){
		$("#event_occur").prop("disabled",false);
    $("#event_until_date").prop("disabled",true);
    every_week_option(opt);
  });
  $("#event_ends_on_never").on("change", function(){
		$("#event_occur").prop("disabled",true);
    $("#event_until_date").prop("disabled",true);
    every_week_option(opt);
  });
  $("#event_ends_on_on").on("change", function(){
		$("#event_occur").prop("disabled",true);
    $("#event_until_date").prop("disabled",false);
    every_week_option(opt);
  });

  $("#event_repeats_every").change(function() {
    rval = $("select#event_repeats_every :selected").val();
    every = $("#every").text();
    if (opt == "yearly")
      opt = "annually"
    sumstring(opt,rval,every,on);
  });

  $("#repeat_by").change(function(){
    if ($("#event_repeat_by_day_of_the_month").is(':checked')){
      on = " on day "+$("#event_startdate_3i").val();
      sumstring(opt,rval,every,on);
    }  
    else if ($("#event_repeat_by_day_of_the_week").is(':checked'))
      monthly_day_of_week();
  })

  function sumstring(option,rval,every,on){
    if (rval != "1")
      $("#summary").text("Every "+rval+" "+every+on+ends_on_string())
    else
      $("#summary").text(option+on+ends_on_string())
  }
  function ends_on_string(){

    if (!$("#event_occur").prop("disabled"))
      return ", "+$("#event_occur").val()+" times";
    else if (!$("#event_until_date").prop("disabled"))
      return ", until " + $("#event_until_date").val();
    else
      return ""
  }
  function weekdays_n_year(opt, rval){
    rval=1;
    if (opt == "Every weekday(Monday to Friday)")
      opt = "Weekly on weekdays"
    if (opt == "Every Monday,Wednesday, and Friday")
      opt = "Weekly on Monday, Wednesday, Friday" 
    if (opt == "Every Tuesday and Thursday")
      opt = "Weekly on Tuesday, Thursday"
    if (opt == "yearly"){
      opt = "annually"
      rval = rval;
    }  
    sumstring(opt,rval,"","");
  }

  function every_week_option(opt){
    if (opt == "Daily" || opt == "monthly" || opt == "weekly")
      sumstring(opt,rval,every,on)
    else 
      weekdays_n_year(opt,rval)
  }
  function selectedweeks(){
    warr = [];
    warr[0] = $('#repeat_on_sunday').is(':checked')? 0:"";
    warr[1] = $('#repeat_on_monday').is(':checked')? 1:"";
    warr[2] = $('#repeat_on_tuesday').is(':checked')? 2:"";
    warr[3] = $('#repeat_on_wednesday').is(':checked')? 3:"";
    warr[4] = $('#repeat_on_thursday').is(':checked')? 4:"";
    warr[5] = $('#repeat_on_friday').is(':checked')? 5:"";
    warr[6] = $('#repeat_on_saturday').is(':checked')? 6:"";
    week = warr.join("");
    return week;
  }
  $("#repeat_on").click(function(){
    weeklyfeature();
  });

  function monthly_day_of_week(){
    $.ajax({
    type: "GET",
    datatype: 'JSON',
    url: '/events/getval',
    success: function(data){
      on = " on "+data;
      sumstring(opt,rval,every,on);
    }
  });
  }

  function weeklyfeature(){
    se = selectedweeks();
    on =" on ";
    $.ajax({
    type: "GET",
    datatype: 'JSON',
    url: '/events/weeklyrule',
    data: {selected: se, option: opt, rval: rval, every: every},
    success: function(data){  
       $("#summary").text(data);
       // on =" on "+ data;
       // sumstring(opt,rval,every,on);
    }
    });
    } 
});