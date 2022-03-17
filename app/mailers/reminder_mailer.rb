class ReminderMailer < ApplicationMailer
    default from: "tlmcmerty@gmail.com"

    def welcome_email
        @user = params[:user]
        subject = "Welcome to carolinaEats"
        @url  = 'http://127.0.0.1:3000/'
        mail(to: @user.email, subject: subject)
    end

    def first_add_email # TODO
        @user = param[:user]
        subject = params[:subject]
        @message = params[:message]
        mail(to: @user.email, subject: @subject)
    end

    def reminder_email # TODO
        @user = params[:user]
        subject = "CarolinaEats Reminders"
        @messages = params[:messages]
        mail(to: @user.email, subject: subject)
    end
end
