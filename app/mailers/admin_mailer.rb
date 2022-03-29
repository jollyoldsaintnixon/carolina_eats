class AdminMailer < ApplicationMailer
    default to: "tlmcmerty@gmail.com"
    default from: "tlmcmerty@gmail.com"

    def reminder_email_creation_errors
        @errors = params[:errors]
        mail(to: "tlmcmerty@gmail.com", subject: "Reminder Email Creation Errors")
    end
end
