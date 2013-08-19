class EventsController < ApplicationController
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
end