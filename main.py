from flask import Flask, render_template, request
import os
from flask_mail import Mail
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

my_email = os.getenv("EMAIL")

# configuring values
app.config.update(
    MAIL_SERVER="smtp.gmail.com",
    MAIL_PORT="465",
    MAIL_USE_SSL=True,
    MAIL_USERNAME=my_email,
    MAIL_PASSWORD=os.getenv("EMAIL_PASSWORD"),
)

# instance of mail
mail = Mail(app)


# App route
@app.route("/", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        subject = request.form.get("subject")
        message = request.form.get("message")

        if name == "" or email == "" or subject == "" or message == "":
            return render_template(
                "index.html", message="Please fill the required fields"
            )
        elif email.find("@") == -1:
            return render_template("index.html", message="Please enter a valid email")

        mail.send_message(
            subject + " (" + name + ")",
            sender=email,
            recipients=[my_email],
            body=message,
        )

    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
