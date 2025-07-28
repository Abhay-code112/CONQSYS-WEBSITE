from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy
from flask_moment import Moment
from werkzeug.security import generate_password_hash, check_password_hash
import os
import secrets # Used for generating a strong random password

app = Flask(__name__, instance_relative_config=True)

# ### FIXED 1: SECRET_KEY
# The secret key is now loaded from an environment variable.
# For development, it falls back to a default key, but a warning is printed.
# In production, you MUST set the SECRET_KEY environment variable.
SECRET = os.environ.get('SECRET_KEY', 'dev-key-for-local-use-only')
if SECRET == 'dev-key-for-local-use-only':
    print("--- WARNING: USING DEFAULT SECRET KEY. SET A REAL ONE FOR PRODUCTION. ---")
app.secret_key = SECRET

# Database configuration remains the same - this part was done well.
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(app.instance_path, 'website.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Ensure the instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass

# Initialize Flask-Moment and SQLAlchemy
moment = Moment(app)
db = SQLAlchemy(app)


# --- Database Models (No changes needed here) ---
class Queries(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)


# --- Routes ---
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/submit", methods=["POST"])
def submit():
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    message = request.form.get("message", "").strip()

    if not name or not email:
        flash("Name and email are required!", "error")
        return redirect(url_for("home"))

    try:
        query = Queries(name=name, email=email, message=message)
        db.session.add(query)
        db.session.commit()
        return redirect(url_for("success"))
    except Exception as e:
        # It's good practice to log the actual error for debugging
        print(f"--- DATABASE SUBMISSION FAILED ---")
        print(f"ERROR: {e}")
        print(f"------------------------------------")
        db.session.rollback()
        flash("An error occurred while submitting your message. Please try again.", "error")
        return redirect(url_for("home"))
    
    # ### FIXED 4: Removed the nested success() function from here.

# This is the correct success route
@app.route("/success")
def success():
    return render_template("success.html")


# --- Admin Routes (No changes needed, logic is sound) ---
@app.route("/admin", methods=["GET", "POST"])
def admin_login():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")
        
        admin = Admin.query.filter_by(username=username).first()
        if admin and check_password_hash(admin.password_hash, password):
            session["admin"] = True
            session["admin_username"] = username
            flash("Login successful!", "success")
            return redirect(url_for("view_messages"))
        else:
            flash("Invalid credentials!", "error")
    
    return render_template("admin_login.html")

@app.route("/messages")
def view_messages():
    if not session.get("admin"):
        flash("Please login to access admin panel.", "error")
        return redirect(url_for("admin_login"))
    
    queries = Queries.query.order_by(Queries.created_at.desc()).all()
    return render_template("messages.html", queries=queries)

@app.route("/delete_message/<int:message_id>", methods=["POST"])
def delete_message(message_id):
    if not session.get("admin"):
        flash("Unauthorized access!", "error")
        return redirect(url_for("admin_login"))
    
    query = Queries.query.get_or_404(message_id)
    db.session.delete(query)
    db.session.commit()
    flash("Message deleted successfully!", "success")
    return redirect(url_for("view_messages"))

@app.route("/logout")
def logout():
    session.clear()
    flash("Logged out successfully!", "success")
    return redirect(url_for("home"))


# --- Initialize Database and Create Default Admin ---
def init_db():
    with app.app_context():
        db.create_all()
        
        if not Admin.query.filter_by(username='admin').first():
            # ### FIXED 3: Default password is now strong and random.
            # This password will be printed to the console ONCE when the app is first run.
            # You must save this password.
            default_password = secrets.token_hex(8)
            admin = Admin(
                username='admin',
                password_hash=generate_password_hash(default_password)
            )
            db.session.add(admin)
            db.session.commit()
            print("--- DEFAULT ADMIN CREATED ---")
            print(f"Username: admin")
            print(f"Password: {default_password}  <-- SAVE THIS PASSWORD!")
            print("-----------------------------")


if __name__ == "__main__":
    init_db()
    # ### FIXED 2: Debug mode is now controlled by an environment variable.
    # It defaults to False (safe for production).
    # To run in debug mode locally, set FLASK_DEBUG=true in your environment.
    is_debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(debug=is_debug_mode, host='0.0.0.0', port=5000)