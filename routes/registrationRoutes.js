const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  studentInfo,
  hackMatrix,
  datathon,
  amongUs,
  houdiniHeist,
  promptReady,
  pixelPerfect
} = require('../models/schema');

// Configure multer for file upload (in memory storage)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// ===================== STUDENT INFO ROUTES =====================

// Register student info
router.post('/student-info', async (req, res) => {
  try {
    const { email, firstName, lastName, phoneNumber, collegeName } = req.body;

    // Validate required fields
    if (!email || !firstName || !lastName || !phoneNumber || !collegeName) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Check if student already registered
    const existingStudent = await studentInfo.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered' 
      });
    }

    const newStudent = new studentInfo({
      email,
      firstName,
      lastName,
      phoneNumber,
      collegeName
    });

    await newStudent.save();

    res.status(201).json({ 
      success: true, 
      message: 'Student registered successfully',
      data: newStudent
    });
  } catch (error) {
    console.error('Student Info Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error registering student', 
      error: error.message 
    });
  }
});

// Get all students
router.get('/student-info', async (req, res) => {
  try {
    const students = await studentInfo.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      count: students.length,
      data: students 
    });
  } catch (error) {
    console.error('Get Students Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching students', 
      error: error.message 
    });
  }
});

// ===================== HACK MATRIX ROUTES =====================

// Register HackMatrix team
router.post('/hackmatrix', upload.single('screenshot'), async (req, res) => {
  try {
    const {
      teamName,
      leaderEmail,
      leaderName,
      leaderPhone,
      leaderCollege,
      leaderYear,
      leaderBranch,
      member2Email,
      member2Name,
      member2Phone,
      member2College,
      member2Year,
      member2Branch,
      member3Email,
      member3Name,
      member3Phone,
      member3College,
      member3Year,
      member3Branch,
      member4Email,
      member4Name,
      member4Phone,
      member4College,
      member4Year,
      member4Branch,
      participantCount,
      isPccoe
    } = req.body;

    // Validate required fields
    if (!teamName || !leaderEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'Team name and leader email are required' 
      });
    }

    // Check if team already registered
    const existingTeam = await hackMatrix.findOne({ 
      $or: [{ teamName }, { leaderEmail }] 
    });
    if (existingTeam) {
      return res.status(400).json({ 
        success: false, 
        message: 'Team name or leader email already registered' 
      });
    }

    const teamData = {
      teamId: `HM-${Date.now()}`,
      teamName,
      leaderEmail,
      leaderName,
      leaderPhone,
      leaderCollege,
      leaderYear,
      leaderBranch,
      isPccoe: isPccoe === 'true' || isPccoe === true,
      participantCount: parseInt(participantCount) || 3
    };

    // Add member data if provided
    if (member2Email) {
      teamData.member2Email = member2Email;
      teamData.member2Name = member2Name;
      teamData.member2Phone = member2Phone;
      teamData.member2College = member2College;
      teamData.member2Year = member2Year;
      teamData.member2Branch = member2Branch;
    }

    if (member3Email) {
      teamData.member3Email = member3Email;
      teamData.member3Name = member3Name;
      teamData.member3Phone = member3Phone;
      teamData.member3College = member3College;
      teamData.member3Year = member3Year;
      teamData.member3Branch = member3Branch;
    }

    if (member4Email) {
      teamData.member4Email = member4Email;
      teamData.member4Name = member4Name;
      teamData.member4Phone = member4Phone;
      teamData.member4College = member4College;
      teamData.member4Year = member4Year;
      teamData.member4Branch = member4Branch;
    }

    // Add screenshot if uploaded
    if (req.file) {
      teamData.screenshot = req.file.buffer;
    }

    const newTeam = new hackMatrix(teamData);
    await newTeam.save();

    res.status(201).json({ 
      success: true, 
      message: 'HackMatrix team registered successfully',
      data: { 
        teamId: newTeam.teamId,
        teamName: newTeam.teamName,
        leaderEmail: newTeam.leaderEmail
      }
    });
  } catch (error) {
    console.error('HackMatrix Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error registering HackMatrix team', 
      error: error.message 
    });
  }
});

// Get all HackMatrix teams
router.get('/hackmatrix', async (req, res) => {
  try {
    const teams = await hackMatrix.find().sort({ createdAt: -1 });
    const teamsWithScreenshots = teams.map(team => {
      const teamObj = team.toObject();
      if (teamObj.screenshot) {
        teamObj.screenshot = `data:image/jpeg;base64,${team.screenshot.toString('base64')}`;
      }
      return teamObj;
    });
    res.status(200).json({ 
      success: true, 
      count: teamsWithScreenshots.length,
      data: teamsWithScreenshots 
    });
  } catch (error) {
    console.error('Get HackMatrix Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching HackMatrix teams', 
      error: error.message 
    });
  }
});

// ===================== DATATHON ROUTES =====================

// Register Datathon team
router.post('/datathon', upload.single('screenshot'), async (req, res) => {
  try {
    const {
      teamName,
      leaderEmail,
      leaderName,
      leaderPhone,
      leaderCollege,
      leaderYear,
      memberEmail,
      memberName,
      memberPhone,
      memberCollege,
      memberYear,
      participantCount,
      isPccoe
    } = req.body;

    // Validate required fields
    if (!teamName || !leaderEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'Team name and leader email are required' 
      });
    }

    // Check if team already registered
    const existingTeam = await datathon.findOne({ 
      $or: [{ teamName }, { leaderEmail }] 
    });
    if (existingTeam) {
      return res.status(400).json({ 
        success: false, 
        message: 'Team name or leader email already registered' 
      });
    }

    const teamData = {
      teamId: `DT-${Date.now()}`,
      teamName,
      leaderEmail,
      leaderName,
      leaderPhone,
      leaderCollege,
      leaderYear,
      isPccoe: isPccoe === 'true' || isPccoe === true,
      participantCount: parseInt(participantCount) || 1
    };

    // Add member data if provided (for 2-member teams)
    if (memberEmail) {
      teamData.member1Email = memberEmail;
      teamData.memberName = memberName;
      teamData.memberPhone = memberPhone;
      teamData.memberCollege = memberCollege;
      teamData.memberYear = memberYear;
    }

    // Add screenshot if uploaded
    if (req.file) {
      teamData.screenshot = req.file.buffer;
    }

    const newTeam = new datathon(teamData);
    await newTeam.save();

    res.status(201).json({ 
      success: true, 
      message: 'Datathon team registered successfully',
      data: { 
        teamId: newTeam.teamId,
        teamName: newTeam.teamName,
        leaderEmail: newTeam.leaderEmail
      }
    });
  } catch (error) {
    console.error('Datathon Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error registering Datathon team', 
      error: error.message 
    });
  }
});

// Get all Datathon teams
router.get('/datathon', async (req, res) => {
  try {
    const teams = await datathon.find().sort({ createdAt: -1 });
    const teamsWithScreenshots = teams.map(team => {
      const teamObj = team.toObject();
      if (teamObj.screenshot) {
        teamObj.screenshot = `data:image/jpeg;base64,${team.screenshot.toString('base64')}`;
      }
      return teamObj;
    });
    res.status(200).json({ 
      success: true, 
      count: teamsWithScreenshots.length,
      data: teamsWithScreenshots 
    });
  } catch (error) {
    console.error('Get Datathon Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching Datathon teams', 
      error: error.message 
    });
  }
});

// ===================== AMONG US ROUTES =====================

// Register Among Us participant
router.post('/amongus', upload.single('screenshot'), async (req, res) => {
  try {
    const {
      leaderEmail,
      leaderName,
      leaderPhone,
      leaderCollege,
      leaderYear,
      leaderBranch,
      isPccoe
    } = req.body;

    // Validate required fields
    if (!leaderEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // Check if already registered
    const existing = await amongUs.findOne({ leaderEmail });
    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered' 
      });
    }

    const participantData = {
      leaderEmail,
      leaderName,
      leaderPhone,
      leaderCollege,
      leaderYear,
      leaderBranch,
      isPccoe: isPccoe === 'true' || isPccoe === true
    };

    // Add screenshot if uploaded
    if (req.file) {
      participantData.screenshot = req.file.buffer;
    }

    const newParticipant = new amongUs(participantData);
    await newParticipant.save();

    res.status(201).json({ 
      success: true, 
      message: 'Among Us participant registered successfully',
      data: { 
        leaderEmail: newParticipant.leaderEmail
      }
    });
  } catch (error) {
    console.error('Among Us Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error registering Among Us participant', 
      error: error.message 
    });
  }
});

// Get all Among Us participants
router.get('/amongus', async (req, res) => {
  try {
    const participants = await amongUs.find().sort({ createdAt: -1 });
    const participantsWithScreenshots = participants.map(participant => {
      const participantObj = participant.toObject();
      if (participantObj.screenshot) {
        participantObj.screenshot = `data:image/jpeg;base64,${participant.screenshot.toString('base64')}`;
      }
      return participantObj;
    });
    res.status(200).json({ 
      success: true, 
      count: participantsWithScreenshots.length,
      data: participantsWithScreenshots 
    });
  } catch (error) {
    console.error('Get Among Us Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching Among Us participants', 
      error: error.message 
    });
  }
});

// ===================== HOUDINI HEIST ROUTES =====================

// Register Houdini Heist team
router.post('/houdiniheist', upload.single('screenshot'), async (req, res) => {
  try {
    const {
      teamName,
      leaderEmail,
      leaderName,
      leaderPhone,
      leaderCollege,
      leaderYear,
      member1Email,
      member1Name,
      member1Phone,
      member1College,
      member1Year,
      member2Email,
      member2Name,
      member2Phone,
      member2College,
      member2Year,
      participantCount,
      isPccoe
    } = req.body;

    // Validate required fields
    if (!teamName || !leaderEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'Team name and leader email are required' 
      });
    }

    // Check if team already registered
    const existingTeam = await houdiniHeist.findOne({ 
      $or: [{ teamName }, { leaderEmail }] 
    });
    if (existingTeam) {
      return res.status(400).json({ 
        success: false, 
        message: 'Team name or leader email already registered' 
      });
    }

    const teamData = {
      teamId: `HH-${Date.now()}`,
      teamName,
      leaderEmail,
      leaderName,
      leaderPhone,
      leaderCollege,
      leaderYear,
      isPccoe: isPccoe === 'true' || isPccoe === true,
      participantCount: parseInt(participantCount) || 2
    };

    // Add member data
    if (member1Email) {
      teamData.member1Email = member1Email;
      teamData.member1Name = member1Name;
      teamData.member1Phone = member1Phone;
      teamData.member1College = member1College;
      teamData.member1Year = member1Year;
    }

    if (member2Email) {
      teamData.member2Email = member2Email;
      teamData.member2Name = member2Name;
      teamData.member2Phone = member2Phone;
      teamData.member2College = member2College;
      teamData.member2Year = member2Year;
    }

    // Add screenshot if uploaded
    if (req.file) {
      teamData.screenshot = req.file.buffer;
    }

    const newTeam = new houdiniHeist(teamData);
    await newTeam.save();

    res.status(201).json({ 
      success: true, 
      message: 'Houdini Heist team registered successfully',
      data: { 
        teamId: newTeam.teamId,
        teamName: newTeam.teamName,
        leaderEmail: newTeam.leaderEmail
      }
    });
  } catch (error) {
    console.error('Houdini Heist Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error registering Houdini Heist team', 
      error: error.message 
    });
  }
});

// Get all Houdini Heist teams
router.get('/houdiniheist', async (req, res) => {
  try {
    const teams = await houdiniHeist.find().sort({ createdAt: -1 });
    const teamsWithScreenshots = teams.map(team => {
      const teamObj = team.toObject();
      if (teamObj.screenshot) {
        teamObj.screenshot = `data:image/jpeg;base64,${team.screenshot.toString('base64')}`;
      }
      return teamObj;
    });
    res.status(200).json({ 
      success: true, 
      count: teamsWithScreenshots.length,
      data: teamsWithScreenshots 
    });
  } catch (error) {
    console.error('Get Houdini Heist Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching Houdini Heist teams', 
      error: error.message 
    });
  }
});

// ===================== PROMPT READY ROUTES =====================

// Register Prompt Ready team
router.post('/promptready', upload.single('screenshot'), async (req, res) => {
  try {
    const {
      teamName,
      leaderEmail,
      leaderName,
      leaderPhone,
      leaderCollege,
      leaderYear,
      leaderBranch,
      member1Email,
      member1Name,
      member1Phone,
      member1College,
      member1Year,
      member1Branch,
      member2Email,
      member2Name,
      member2Phone,
      member2College,
      member2Year,
      member2Branch,
      participantCount,
      isPccoe
    } = req.body;

    // Validate required fields
    if (!teamName || !leaderEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'Team name and leader email are required' 
      });
    }

    // Check if team already registered
    const existingTeam = await promptReady.findOne({ 
      $or: [{ teamName }, { leaderEmail }] 
    });
    if (existingTeam) {
      return res.status(400).json({ 
        success: false, 
        message: 'Team name or leader email already registered' 
      });
    }

    const teamData = {
      teamId: `PR-${Date.now()}`,
      teamName,
      leaderEmail,
      leaderName,
      leaderPhone,
      leaderCollege,
      leaderYear,
      leaderBranch,
      isPccoe: isPccoe === 'true' || isPccoe === true,
      participantCount: parseInt(participantCount) || 3
    };

    // Add member1 data
    if (member1Email) {
      teamData.member1Email = member1Email;
      teamData.member1Name = member1Name;
      teamData.member1Phone = member1Phone;
      teamData.member1College = member1College;
      teamData.member1Year = member1Year;
      teamData.member1Branch = member1Branch;
    }

    // Add member2 data
    if (member2Email) {
      teamData.member2Email = member2Email;
      teamData.member2Name = member2Name;
      teamData.member2Phone = member2Phone;
      teamData.member2College = member2College;
      teamData.member2Year = member2Year;
      teamData.member2Branch = member2Branch;
    }

    // Add screenshot if uploaded
    if (req.file) {
      teamData.screenshot = req.file.buffer;
    }

    const newTeam = new promptReady(teamData);
    await newTeam.save();

    res.status(201).json({ 
      success: true, 
      message: 'Prompt Relay team registered successfully',
      data: { 
        teamId: newTeam.teamId,
        teamName: newTeam.teamName,
        leaderEmail: newTeam.leaderEmail
      }
    });
  } catch (error) {
    console.error('Prompt Relay Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error registering Prompt Relay team', 
      error: error.message 
    });
  }
});

// Get all Prompt Relay teams
router.get('/promptready', async (req, res) => {
  try {
    const teams = await promptReady.find().sort({ createdAt: -1 });
    const teamsWithScreenshots = teams.map(team => {
      const teamObj = team.toObject();
      if (teamObj.screenshot) {
        teamObj.screenshot = `data:image/jpeg;base64,${team.screenshot.toString('base64')}`;
      }
      return teamObj;
    });
    res.status(200).json({ 
      success: true, 
      count: teamsWithScreenshots.length,
      data: teamsWithScreenshots 
    });
  } catch (error) {
    console.error('Get Prompt Relay Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching Prompt Relay teams', 
      error: error.message 
    });
  }
});

// ===================== PIXEL PERFECT ROUTES =====================

// Register Pixel Perfect participant
router.post('/pixelperfect', upload.single('screenshot'), async (req, res) => {
  try {
    const {
      leaderEmail,
      leaderName,
      leaderPhone,
      leaderCollege,
      leaderYear,
      leaderBranch,
      isPccoe
    } = req.body;

    // Validate required fields
    if (!leaderEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // Check if already registered
    const existing = await pixelPerfect.findOne({ leaderEmail });
    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered' 
      });
    }

    const participantData = {
      leaderEmail,
      leaderName,
      leaderPhone,
      leaderCollege,
      leaderYear,
      leaderBranch,
      isPccoe: isPccoe === 'true' || isPccoe === true
    };

    // Add screenshot if uploaded
    if (req.file) {
      participantData.screenshot = req.file.buffer;
    }

    const newParticipant = new pixelPerfect(participantData);
    await newParticipant.save();

    res.status(201).json({ 
      success: true, 
      message: 'Pixel Perfect participant registered successfully',
      data: { 
        leaderEmail: newParticipant.leaderEmail
      }
    });
  } catch (error) {
    console.error('Pixel Perfect Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error registering Pixel Perfect participant', 
      error: error.message 
    });
  }
});

// Get all Pixel Perfect participants
router.get('/pixelperfect', async (req, res) => {
  try {
    const participants = await pixelPerfect.find().sort({ createdAt: -1 });
    const participantsWithScreenshots = participants.map(participant => {
      const participantObj = participant.toObject();
      if (participantObj.screenshot) {
        participantObj.screenshot = `data:image/jpeg;base64,${participant.screenshot.toString('base64')}`;
      }
      return participantObj;
    });
    res.status(200).json({ 
      success: true, 
      count: participantsWithScreenshots.length,
      data: participantsWithScreenshots 
    });
  } catch (error) {
    console.error('Get Pixel Perfect Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching Pixel Perfect participants', 
      error: error.message 
    });
  }
});

// ===================== UTILITY ROUTES =====================

// Get all registrations count
router.get('/stats', async (req, res) => {
  try {
    const stats = {
      studentInfo: await studentInfo.countDocuments(),
      hackMatrix: await hackMatrix.countDocuments(),
      datathon: await datathon.countDocuments(),
      amongUs: await amongUs.countDocuments(),
      houdiniHeist: await houdiniHeist.countDocuments(),
      promptReady: await promptReady.countDocuments(),
      pixelPerfect: await pixelPerfect.countDocuments()
    };

    const total = Object.values(stats).reduce((sum, count) => sum + count, 0);

    res.status(200).json({ 
      success: true, 
      total,
      stats 
    });
  } catch (error) {
    console.error('Stats Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching statistics', 
      error: error.message 
    });
  }
});

// Get statistics (alias for /stats)
router.get('/statistics', async (req, res) => {
  try {
    const hackmatrix = await hackMatrix.countDocuments();
    const datathonCount = await datathon.countDocuments();
    const amongus = await amongUs.countDocuments();
    const houdiniheist = await houdiniHeist.countDocuments();
    const promptready = await promptReady.countDocuments();
    const pixelperfect = await pixelPerfect.countDocuments();

    const totalParticipants = hackmatrix + datathonCount + amongus + houdiniheist + promptready + pixelperfect;

    res.status(200).json({ 
      success: true, 
      data: {
        totalParticipants,
        hackmatrix,
        datathon: datathonCount,
        amongus,
        houdiniheist,
        promptready,
        pixelperfect
      }
    });
  } catch (error) {
    console.error('Statistics Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching statistics', 
      error: error.message 
    });
  }
});

module.exports = router;
