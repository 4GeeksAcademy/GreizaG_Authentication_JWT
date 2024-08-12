from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32))
    last_name = db.Column(db.String(32))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    user_favorite_spare_parts = db.relationship("FavoriteSpareParts", back_populates="user_id_relationship")

    def __repr__(self):
        return f"User name: {self.name} with email: {self.email}"
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "email": self.email
        }

class SpareParts(db.Model):
    __tablename__ = 'spare_parts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(200))
    favorite_spare_parts = db.relationship("FavoriteSpareParts", back_populates="spare_part_id_relationship")

    def __repr__(self):
        return f"Spare part name: {self.name}"
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description
        }
    
class FavoriteSpareParts(db.Model):
    __tablename__ = 'favorite_spare_parts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user_id_relationship = db.relationship("User", back_populates="user_favorite_spare_parts")
    spare_part_id = db.Column(db.Integer, db.ForeignKey('spare_parts.id'))
    spare_part_id_relationship = db.relationship("SpareParts", back_populates="favorite_spare_parts")

    def __repr__(self):
        return f"User: {self.user_id} -> likes spare part {self.spare_part_id}"
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "spare_part_id": self.spare_part_id
        }