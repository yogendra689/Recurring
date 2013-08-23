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
    @event.repeat_on = params[:repeat_on]
    @event.schedule = @event.schedule_it(@event.repeats, @event.startdate, @event.repeats_every.to_i,
                      @event.repeat_by, @event.repeat_on, @event.ends_on,@event.occur.to_i,@event.until_date)
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
  def show
    
  end
  def getval
    cnt = ((Date.today - Date.today.beginning_of_month).to_i/7)+1
    case cnt
      when 1
        @str = "first " +  Date.today.strftime("%A")
      when 2
        @str = "second "+  Date.today.strftime("%A")  
      when 3
        @str = "third "+  Date.today.strftime("%A")  
      when 4
        @str = "fourth "+  Date.today.strftime("%A") 
      when 5
        @str = "fifth "+  Date.today.strftime("%A")  
    end
    respond_to do |format|
      format.json { render json: @str.to_json }
    end
  end

  def weeklyrule
    #debugger
    aa = params[:selected].split("");

    if params[:selected].empty?
      @wr =Date.today.strftime("%A")+"s"
    else
      as= []
      aa.each{|c| as<<c.to_i};
      @wr = Rule.weekly.day(as).to_s
      @wr.slice! "Weekly on"
    end
    respond_to do |format|
      format.json { render json: @wr.to_json }
    end
  end


  def getrule
  end
end