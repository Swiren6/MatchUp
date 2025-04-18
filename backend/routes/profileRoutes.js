const express = require("express");
const Profile = require("../models/profile");
const router = express.Router();

// 🔹 Ajouter un profil
router.post("/add", async (req, res) => {
  try {
    const newProfile = new Profile(req.body);
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔹 Récupérer tous les profils
router.get("/findall", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("userId");
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Mettre à jour un profil
router.put("/update/:id", async (req, res) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔹 Supprimer un profil
router.delete("/delete/:id", async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.json({ message: "Profil supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//liker un profil
router.put('/like/:id', async (req, res) => {
 
    try {
        const likeExist = await ProfileModel.find({
            $and: [
                {
                    likes: {
                        $elemMatch: {
                            userId: req.params.id,
                        },
                    },
                },
                {
                    likes: {
                        $elemMatch: {
                            liker: req.user.id,
                        },
                    },
                },
            ],
        });
        
        if (likeExist.length > 0) {
          await ProfileModel.findOneAndUpdate(
              { _id: req.params.id },
          ),
          {
              $pull: {
                  likes: {
                      userId: req.params.id,
                      liker: req.user.id,
                  },
              },
          }
      } else {
          await ProfileModel.findOneAndUpdate(
              { _id: req.params.id },
              {
                  $pull: {
                      likes: {
                          userId: req.params.id,
                          liker: req.user.id,
                      },
                  },
              }
          )
      }res.status(200).json({message:"succes"});
    } catch (error) {
        res.status(500).json(error);
    }
;
});


//liker un profil
router.get('/search', async (req, res) => {

  try {
    const query = req.query.skills;
    const data = await ProfileModel.find({
        skills: {
            $elemMatch: {
                $regex: query,
                $options: "i",
            },
        },
    });
    res.status(200).json(data);
} catch (error) {
    res.status(500).json(error);
}
});









module.exports = router;


