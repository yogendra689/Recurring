class EventsController < ApplicationController
  include IceCube
  def new
    @event = Event.new
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @event }
    end
  end

  def create
  	@event = Event.new(params[:event])
    @event.schedule = @event.schedule_it($rule,@event.startdate)
    @event.save
    redirect_to events_path
  end

  def index
  	@events = Event.all
  	respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @events }
    end
  end

  def ruleoptions
    rule = params[:option].to_i
    selected = params[:selected]
    revery = params[:rval].to_i    
    occur = params[:count].to_i
    until_date= params[:until]
    ends_on = params[:ends_on]
    repeat_by = params[:repeat_by]
    start = "26/08/2013"
    if rule == 0
      case ends_on
      when "never"
      r = Rule.daily(revery)
      when  "after"
      r = Rule.daily(revery).count(occur)
      when  "on"
      r = Rule.daily(revery).until(until_date.to_date)
      end
    elsif [1,2,3,4].include? rule
      weekdays = []
      if selected.empty?
        weekdays =[Date.today.wday]
      else
        days = selected.split("").each{|c| weekdays<<c.to_i}
      end   
      case ends_on
      when "never"
      r =Rule.weekly(revery).day(weekdays)
      when  "after"
      r =Rule.weekly(revery).day(weekdays).count(occur)
      when  "on"
      r =Rule.weekly(revery).day(weekdays).until(until_date.to_date)
      end
    elsif rule == 5
      if repeat_by ==  "day_of_the_month"
        case ends_on
        when "never"
        r =Rule.monthly(revery)
        when  "after"
        r =Rule.monthly(revery).count(occur)
        when  "on"
        r =Rule.monthly(revery).until(until_date.to_date)
        end
      elsif repeat_by == "day_of_the_week"
        cnt = ((start.to_date.end_of_month - start.to_date).to_i/7)+1
        if(cnt == 1) then cnt = -1  else cnt = ((start.to_date - start.to_date.beginning_of_month).to_i/7)+1 end
        weekday = start.to_date.strftime("%A").downcase.to_sym
        case ends_on
        when "never"
        r =Rule.monthly(revery).day_of_week( weekday => [cnt])
        when  "after"
        r =Rule.monthly(revery).day_of_week( weekday => [cnt]).count(occur)
        when  "on"
        r =Rule.monthly(revery).day_of_week( weekday => [cnt]).until(until_date.to_date)
        end
      end  
    elsif rule == 6
      case ends_on
      when "never"
      r =Rule.yearly(revery)
      when  "after"
      r =Rule.yearly(revery).count(occur)
      when  "on"
      r =Rule.yearly(revery).until(until_date.to_date)
      end
    end
    $rule = r
    respond_to do |format|
      format.json { render json: r.to_s.to_json }
    end
  end
end