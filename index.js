require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('./db');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const PORT = process.env.PORT || 5432;
const app = express();

app.use(express.json());
app.use(cors());

/* QUERY FOR USERS */
/* CREATE USER */
app.post('/user-register', async(req, res) => {
    try {
        const { UserName, UserPassword, UserEmail, UserRole } = req.body;
        const hashPaswword = bcrypt.hashSync(UserPassword, saltRounds);

        const users = await pool.query("SELECT * FROM Users");
        for(let i = 0; i < users.rowCount; i++) {
            if(users.rows[i].useremail === UserEmail || users.rows[i].username === UserName) {
                return res.status(400).json({ status: false, message: 'Email or username is already used!' });
            }
        }

        const newUser = await pool.query("INSERT INTO Users (username, userpassword, useremail, userrole) VALUES ($1, $2, $3, $4)", [UserName, hashPaswword, UserEmail, UserRole]);
        const userData = newUser;
        return res.status(200).json({status: true, user: userData});


    } catch (error) {
        console.error(error.message);
    }
});

app.post('/user-login', async(req, res) => {
    try {
        const { UserEmail, UserPassword } = req.body;
        const logUser = await pool.query("SELECT * FROM Users WHERE useremail = $1", [UserEmail]);

        if(logUser.rowCount === 0) {
            return res.status(400).json({message: 'I cant find account which use this email!'})
        } else {
            const validPassword = bcrypt.compareSync(UserPassword, logUser.rows[0].userpassword);
            if(validPassword) {
                const userData = logUser.rows[0];
                const acsessToken = jwt.sign({ id: logUser.rows[0].userid, role: logUser.rows[0].userrole}, "mySecretKey", { expiresIn: "20m" });
                res.json({ auth: true, user: userData, acsessToken });
            } else {
                res.status(400).json({ auth: false, message: 'Wrong password or email!'})
            }
        }
    } catch (error) {
        console.error(error.message);
    }
});

/* GET ALL USERS */
app.get('/get-users', async(req, res) => {
    try {
        const allUsers = await pool.query('SELECT * FROM Users');
        res.status(200).json({users: allUsers.rows});
    } catch (error) {
        console.error(error.message);
    }
});

/* GET USER[ID] */
app.get('/get-users/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query('SELECT * FROM Users WHERE UserId = $1', [id]);
        
        if(user.rowCount === 0) {
            return res.status(400).json({message: 'I cant find user.'}); 
        }

        return res.status(200).json({successMsg: 'I can find user by id. Output info this user.', user: user.rows[0]});
    } catch (error) {
        console.error(error.message);
    }
});

/* UPDATE USER */
app.put('/up-user/:id', async(req, res) => {
    try {
        const { UserId, UserName, UserRole, UserEmail } = req.body;
        const updateUser = await pool.query('UPDATE users SET UserName = $1, UserRole = $2, UserEmail = $3 WHERE UserId = $4', [UserName, UserRole, UserEmail, UserId]);

        if(updateUser.rowCount === 0) {
            return res.status(400).json({message: `I cant find user, where userid = ${UserId}`});
        }

        return res.status(200).json({successMsg: `User where UserId = ${UserId} has been update`});
    } catch (error) {
        
    }
});

/* DELETE USER */
app.delete('/del-user/:id', async(req, res) => {
    try {
        const { UserId } = req.body;
        const deletedUser = await pool.query('DELETE FROM Users WHERE UserId = $1', [UserId]);

        if(deletedUser.rowCount === 0) {
            return res.status(400).json({message: `I cant find user, where userid = ${UserId}`});
        }

        return res.status(200).json({successMsg: `User where UserId = ${UserId} has been deleted`});
    } catch (error) {
        console.log(error.message);
    }
});





/* QUERY FOR PROFILES */
app.post('/profile-create', async(req, res) => {
    try {
        const { ProfileUserId, ProfileName , ProfileSurname, ProfileGender, ProfileBd, ProfileCity } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE UserId = $1", [ProfileUserId]);

        if(user.rowCount === 0) {
            return res.status(400).json({message: 'Profile success create.'});
        }

        const newProfile = await pool.query("INSERT INTO userprofiles (profileuserid, profilename, profilesurname, profilegender, profilebd, profilecity) VALUES ($1, $2, $3, $4, $5, $6)", [ProfileUserId, ProfileName, ProfileSurname, ProfileGender, ProfileBd, ProfileCity]);
        return res.status(200).json({successMsg: 'Profile success create.', profile: newProfile.rows[0]});
    } catch (error) {
        console.log(error.message);
    }
});

app.get('/get-profiles', async(req, res) => {
    try {
        const allProfiles = await pool.query("SELECT * FROM userprofiles");
        return res.status(200).json({profiles: allProfiles.rows});
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/get-profile/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const profile = await pool.query('SELECT * FROM userprofiles WHERE ProfileID = $1', [id]);

        if(profile.rowCount === 0) {
            return res.status(400).json({message: 'I cant find profile.'});
        }

        return res.status(200).json({successMsg: 'I can find profile by id. Output info this user.', profile: profile.rows[0]});
    } catch (error) {
        console.error(error.message);
    }
});

app.put('/up-profile/:id', async(req, res) => {
    try {
        const { ProfileId, ProfileName , ProfileSurname, ProfileGender, ProfileBd, ProfileCity } = req.body;
        const updateProfile = await pool.query('UPDATE userprofiles SET ProfileName = $1, ProfileSurname = $2, ProfileGender = $3, ProfileBd = $4, ProfileCity = $5 WHERE ProfileID = $6', [ProfileName, ProfileSurname, ProfileGender, ProfileBd, ProfileCity, ProfileId]);
        
        if(updateProfile.rowCount === 0) {
            return res.status(400).json({message: `I cant find profile, where profileid = ${ProfileId}`});
        }

        return res.status(200).json({successMsg: 'I update profile.'})
    } catch (error) {
        
    }
});

app.delete('/del-profile/:id', async(req, res) => {
    try {
        const { ProfileId } = req.body;
        const deletedProfile = await pool.query('DELETE FROM userprofiles WHERE profileid = $1', [ProfileId]);

        if(deletedProfile.rowCount === 0) {
            return res.status(400).json({message: `I cant find profile, where profileid = ${ProfileId}`})
        }

        return res.status(200).json({successMsg: `Profile where ProfileId = ${ProfileId} has been deleted`});
    } catch (error) {
        console.log(error.message);
    }
});

/* START */

const start = async() => {
    try {
        if (process.env.NODE_ENV !== "test") {
            app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));       
          }
    } catch (e) {
        console.error(e);
    }
}

start();

module.exports = app;