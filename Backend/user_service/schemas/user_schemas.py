from datetime import date
from Database import Postgresql
from pydantic import BaseModel

class User(BaseModel):
    username: str
    fullname: str = None
    avatar: str = None
    birthday: str = None
    gender: str = None
    phonenumber: str = None
    location: str = None
    state: str = None

    def update_user_info(self) -> bool:
        db = Postgresql()
        try:
            fields = {
                "fullname": self.fullname,
                "birthday": self.birthday,
                "gender": self.gender,
                "phonenumber": self.phonenumber,
                "location": self.location,
                "state": self.state,
            }
            set_clauses = [f"{key} = '{value}'" for key, value in fields.items() if value is not None]

            if not set_clauses:
                print("No fields to update.")
                return False

            set_clause = ", ".join(set_clauses)

            db.update(
                '"user"',
                set_clause,
                f"user_id = (SELECT id FROM account WHERE username = '{self.username}')"
            )
            db.commit()
            return True
        except Exception as e:
            print(f"Error updating user info: {e}")
            return False
        finally:
            db.close()

    def get_profile(self) -> dict:
        db = Postgresql()
        try:
            user_result = db.select(
                '"user"',
                'user_id, fullname, birthday, gender, phonenumber, location, state',
                f"user_id = (SELECT id FROM account WHERE username = '{self.username}')"
            )

            account_result = db.select(
                '"account"',
                'email, created',
                f"username = '{self.username}'"
            )

            if user_result:
                birthday = user_result[2].strftime('%Y-%m-%d') if isinstance(user_result[2], date) else user_result[2]

                profile_data = {
                    "user_id": user_result[0],
                    "fullname": user_result[1],
                    "birthday": birthday,
                    "gender": user_result[3],
                    "phonenumber": user_result[4],
                    "location": user_result[5],
                    "state": user_result[6],
                }

                if account_result:
                    profile_data.update({
                        "email": account_result[0],
                        "created": account_result[1].strftime('%Y-%m-%d %H:%M:%S') if isinstance(account_result[1], date) else account_result[1]
                    })

                return profile_data
            return {}

        except Exception as e:
            print(f"Error getting profile: {e}")
            return {}
        finally:
            db.close()

    def update_avatar(self, avatar_path: str) -> bool:
        db = Postgresql()
        try:
            db.update(
                '"user"',
                f"avatar = '{avatar_path}'",
                f"user_id = (SELECT id FROM account WHERE username = '{self.username}')"
            )
            db.commit()
            return True
        except Exception as e:
            print(f"Error updating avatar: {e}")
            return False
        finally:
            db.close()

    def get_avatar(self) -> str:
        db = Postgresql()
        try:
            result = db.select(
                '"user"',
                'avatar',
                f"user_id = (SELECT id FROM account WHERE username = '{self.username}')"
            )
            if result and result[0]:
                return result[0]
            return None
        except Exception as e:
            print(f"Error getting avatar: {e}")
            return None
        finally:
            db.close()