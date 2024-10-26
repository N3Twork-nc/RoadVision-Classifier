import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

class Mail():

    def __init__(self,smtp_host= 'smtp.gmail.com',smtp_port = 587,smpt_username = 'cloudkeeper4@gmail.com',smtp_password = 'pygr pjpa cxht wgel'):
        self.smpt_host=smtp_host
        self.smtp_port=smtp_port
        self.smpt_username=smpt_username
        self.smtp_password=smtp_password
        self.server=smtplib.SMTP(smtp_host, smtp_port)
   
    def sendOTP(self,MailTo,OTP):
        #Create MIMEMuiltipart object
        message= MIMEMultipart()
        message['From'] = self.smpt_username
        message['To'] = MailTo
        message['Subject'] = 'OTP'
        body = f'OTP: {OTP}'
        message.attach(MIMEText(body, 'plain'))
        # Send the email
        try:
            self.server.starttls()
            self.server.login(self.smpt_username,self.smtp_password)
            self.server.send_message(message)
            self.server.quit()
        except Exception as ex:
            print('Error sending OTP mail: ', str(ex))

    def sendNotification(self,MailTo,Content):
         #Create MIMEMuiltipart object
        message= MIMEMultipart()
        message['From'] = self.smpt_username
        message['To'] = MailTo
        message['Subject'] = 'Bạn có một lời nhắc từ Plantaholic!'
        body = f'Nhắc nhở: {Content}'
        message.attach(MIMEText(body, 'plain'))
        # Send the email
        try:
            self.server.starttls()
            self.server.login(self.smpt_username,self.smtp_password)
            self.server.send_message(message)
            self.server.quit()
        except Exception as ex:
            print('Error sending notification mail: ', str(ex))