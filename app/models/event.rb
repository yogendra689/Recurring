class Event < ActiveRecord::Base
  include IceCube

  attr_accessor :repeats, :repeats_every, :repeat_by, :repeat_on, :ends_on, :occur, :until_date
  attr_accessible :description, :enddate, :schedule, :startdate, :repeats, :repeat_by, :repeat_on,
                  :repeats_every, :ends_on, :occur, :until_date
 
  def schedule_it(rule= "Daily",start, revery, repeat_by, repeat_on, ends_on,occur,until_date)
    new_schedule = Schedule.new(start: start)
    if rule == "Daily"
      case ends_on
      when "never"
      new_schedule.add_recurrence_rule(Rule.daily(revery))
      when  "after"
      new_schedule.add_recurrence_rule(Rule.daily(revery).count(occur))
      when  "on"
      new_schedule.add_recurrence_rule(Rule.daily(revery).until(until_date.to_date))
      end
    elsif rule == "weekly"
      vals =repeat_on.values
      weekdays = vals.each_index.select{|i| vals[i] == "1"}
      case ends_on
      when "never"
      new_schedule.add_recurrence_rule(Rule.weekly(revery).day(weekdays))
      when  "after"
      new_schedule.add_recurrence_rule(Rule.weekly(revery).day(weekdays).count(occur))
      when  "on"
      new_schedule.add_recurrence_rule(Rule.weekly(revery).day(weekdays).until(until_date.to_date))
      end
    elsif rule == "monthly"
      if repeat_by ==  "day_of_the_month"
        case ends_on
        when "never"
        new_schedule.add_recurrence_rule(Rule.monthly(revery))
        when  "after"
        new_schedule.add_recurrence_rule(Rule.monthly(revery).count(occur))
        when  "on"
        new_schedule.add_recurrence_rule(Rule.monthly(revery).until(until_date.to_date))
        end
      elsif repeat_by == "day_of_the_week"
        cnt = ((start.to_date.end_of_month - start.to_date).to_i/7)+1
        if(cnt == 1) then cnt = -1  else cnt = ((start.to_date - start.to_date.beginning_of_month).to_i/7)+1 end
        weekday = start.strftime("%A").downcase.to_sym
        case ends_on
        when "never"
        new_schedule.add_recurrence_rule(Rule.monthly(revery).day_of_week( weekday => [cnt]))
        when  "after"
        new_schedule.add_recurrence_rule(Rule.monthly(revery).day_of_week( weekday => [cnt]).count(occur))
        when  "on"
        new_schedule.add_recurrence_rule(Rule.monthly(revery).day_of_week( weekday => [cnt]).until(until_date.to_date))
        end
      end  
    elsif rule == "yearly"
      case ends_on
      when "never"
      new_schedule.add_recurrence_rule(Rule.yearly(revery))
      when  "after"
      new_schedule.add_recurrence_rule(Rule.yearly(revery).count(occur))
      when  "on"
      new_schedule.add_recurrence_rule(Rule.yearly(revery).until(until_date.to_date))
      end
    elsif rule == 'Every weekday(Monday to Friday)'
      case ends_on
      when "never"
      new_schedule.add_recurrence_rule(Rule.weekly.day(1,2,3,4,5))
      when  "after"
      new_schedule.add_recurrence_rule(Rule.weekly.day(1,2,3,4,5).count(occur))
      when  "on"
      new_schedule.add_recurrence_rule(Rule.weekly.day(1,2,3,4,5).until(until_date.to_date))
      end
     elsif rule == 'Every Monday,Wednesday, and Friday'
      case ends_on
      when "never"
      new_schedule.add_recurrence_rule(Rule.weekly.day(1,3,5))
      when  "after"
      new_schedule.add_recurrence_rule(Rule.weekly.day(1,3,5).count(occur))
      when  "on"
      new_schedule.add_recurrence_rule(Rule.weekly.day(1,3,5).until(until_date.to_date))
      end
     elsif rule == 'Every Tuesday and Thursday'
      case ends_on
      when "never"
      new_schedule.add_recurrence_rule(Rule.weekly.day(2,4))
      when  "after"
      new_schedule.add_recurrence_rule(Rule.weekly.day(2,4).count(occur))
      when  "on"
      new_schedule.add_recurrence_rule(Rule.weekly.day(2,4).until(until_date.to_date))
      end  
    end
    new_schedule
  end


  def schedule=(value)
  	write_attribute(:schedule, value.to_yaml)
  end

  def schedule
  	read_attribute(:schedule) && Schedule.from_yaml(read_attribute(:schedule))
  end
end
