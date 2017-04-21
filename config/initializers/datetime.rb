class ActiveSupport::TimeWithZone
    def as_json(options = {})
        strftime('%A, %b %e, at %l:%M %p')
    end
end
